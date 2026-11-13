import os
import json
import time
import numpy as np
import tensorflow as tf
from PIL import Image
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from app.config import Config
from app.model import build_heritage_cnn
from app.preprocessing import apply_training_augmentation
from training.dataset_generator import generate_sample_dataset

# Set reproducible random seeds
def set_seeds(seed=42):
    np.random.seed(seed)
    tf.random.set_seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)

class HeritageDataSequence(tf.keras.utils.Sequence):
    """Custom Data Sequence to load images, apply augmentation for training, and normalize to [0, 1]."""
    def __init__(self, data_dir, batch_size=Config.BATCH_SIZE, is_training=True, target_size=(224, 224)):
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.is_training = is_training
        self.target_size = target_size
        self.image_paths = []
        self.labels = []
        
        for label_idx, class_name in enumerate(Config.CLASS_NAMES):
            cls_dir = os.path.join(data_dir, class_name)
            if not os.path.exists(cls_dir):
                continue
            for fname in os.listdir(cls_dir):
                if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    self.image_paths.append(os.path.join(cls_dir, fname))
                    self.labels.append(label_idx)
                    
        self.indexes = np.arange(len(self.image_paths))
        self.on_epoch_end()

    def __len__(self):
        return int(np.ceil(len(self.image_paths) / float(self.batch_size)))

    def __getitem__(self, idx):
        batch_indexes = self.indexes[idx * self.batch_size:(idx + 1) * self.batch_size]
        batch_paths = [self.image_paths[i] for i in batch_indexes]
        batch_labels = [self.labels[i] for i in batch_indexes]
        
        batch_images = []
        for path in batch_paths:
            img = Image.open(path).convert("RGB")
            img_np = np.array(img.resize(self.target_size, Image.BILINEAR)).astype(np.float32) / 255.0
            
            if self.is_training:
                img_np = apply_training_augmentation(img_np)
                
            batch_images.append(img_np)
            
        return np.array(batch_images, dtype=np.float32), np.array(batch_labels, dtype=np.int32)

    def on_epoch_end(self):
        if self.is_training:
            np.random.shuffle(self.indexes)

def train_model(epochs=Config.DEFAULT_EPOCHS, batch_size=Config.BATCH_SIZE):
    set_seeds(42)
    
    os.makedirs(Config.MODEL_DIR, exist_ok=True)
    os.makedirs(Config.ARTIFACTS_DIR, exist_ok=True)
    
    train_dir = os.path.join(Config.DATASET_DIR, "train")
    val_dir = os.path.join(Config.DATASET_DIR, "validation")
    
    # Check if dataset exists; if not, generate sample dataset
    if not os.path.exists(train_dir) or len(os.listdir(os.path.join(train_dir, Config.CLASS_NAMES[0]))) == 0:
        print("[Training] Dataset not found. Generating sample dataset...")
        generate_sample_dataset()
        
    train_seq = HeritageDataSequence(train_dir, batch_size=batch_size, is_training=True)
    val_seq = HeritageDataSequence(val_dir, batch_size=batch_size, is_training=False)
    
    print(f"[Training] Loaded {len(train_seq.image_paths)} training images, {len(val_seq.image_paths)} validation images.")
    
    model = build_heritage_cnn()
    model.summary()
    
    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=Config.EARLY_STOPPING_PATIENCE,
            restore_best_weights=True,
            verbose=1
        ),
        tf.keras.callbacks.ModelCheckpoint(
            filepath=Config.MODEL_PATH,
            monitor="val_accuracy",
            save_best_only=True,
            verbose=1
        )
    ]
    
    start_time = time.time()
    history = model.fit(
        train_seq,
        validation_data=val_seq,
        epochs=epochs,
        callbacks=callbacks
    )
    training_time = time.time() - start_time
    
    # Save training history JSON
    history_dict = {
        "loss": [float(x) for x in history.history["loss"]],
        "accuracy": [float(x) for x in history.history["accuracy"]],
        "val_loss": [float(x) for x in history.history.get("val_loss", [])],
        "val_accuracy": [float(x) for x in history.history.get("val_accuracy", [])],
        "epochs_trained": len(history.history["loss"]),
        "training_time_seconds": round(training_time, 2)
    }
    
    history_file = os.path.join(Config.ARTIFACTS_DIR, "training_history.json")
    with open(history_file, "w") as f:
        json.dump(history_dict, f, indent=2)
        
    # Generate Accuracy & Loss plot
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    plt.plot(history.history["accuracy"], label="Train Accuracy", color="#B85C38", linewidth=2)
    plt.plot(history.history["val_accuracy"], label="Val Accuracy", color="#171C3A", linewidth=2)
    plt.title("Model Accuracy Curve")
    plt.xlabel("Epoch")
    plt.ylabel("Accuracy")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history["loss"], label="Train Loss", color="#B85C38", linewidth=2)
    plt.plot(history.history["val_loss"], label="Val Loss", color="#171C3A", linewidth=2)
    plt.title("Model Loss Curve")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plot_file = os.path.join(Config.ARTIFACTS_DIR, "training_curves.png")
    plt.savefig(plot_file, dpi=300)
    plt.close()
    
    # Save Model Metadata
    metadata = {
        "model_version": Config.MODEL_VERSION,
        "input_shape": list(Config.INPUT_SHAPE),
        "class_mapping": Config.CLASS_NAMES,
        "class_display_names": Config.CLASS_DISPLAY_NAMES,
        "learning_rate": Config.LEARNING_RATE,
        "batch_size": batch_size,
        "dropout_rate": Config.DROPOUT_RATE,
        "epochs_trained": len(history.history["loss"]),
        "final_train_accuracy": round(history_dict["accuracy"][-1], 4),
        "final_val_accuracy": round(history_dict["val_accuracy"][-1], 4) if history_dict["val_accuracy"] else None,
        "trained_at_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    with open(Config.MODEL_METADATA_PATH, "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"[Training] Model training completed successfully! Saved to {Config.MODEL_PATH}")
    return metadata

if __name__ == "__main__":
    train_model()
