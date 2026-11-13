import os
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers, losses
from app.config import Config

def build_heritage_cnn(input_shape=Config.INPUT_SHAPE, 
                       num_classes=len(Config.CLASS_NAMES), 
                       learning_rate=Config.LEARNING_RATE, 
                       dropout_rate=Config.DROPOUT_RATE) -> models.Model:
    """
    Builds the CNN architecture specified in the research paper:
    - Input: 224x224x3 RGB
    - Stacked Conv2D blocks with ReLU activation
    - 2x2 Max-pooling with stride 2
    - Flatten
    - Fully connected Dense layer (256 units) + ReLU
    - Dropout 0.45
    - 3 Output units + Softmax activation
    """
    model = models.Sequential(name="HeritageCNN")
    
    # Input Layer
    model.add(layers.Input(shape=input_shape))
    
    # Conv Block 1
    model.add(layers.Conv2D(32, (3, 3), padding="same", name="conv2d_block1_1"))
    model.add(layers.Activation("relu"))
    model.add(layers.Conv2D(32, (3, 3), padding="same", name="conv2d_block1_2"))
    model.add(layers.Activation("relu"))
    model.add(layers.MaxPooling2D(pool_size=(2, 2), strides=(2, 2), name="maxpool_1"))
    
    # Conv Block 2
    model.add(layers.Conv2D(64, (3, 3), padding="same", name="conv2d_block2_1"))
    model.add(layers.Activation("relu"))
    model.add(layers.Conv2D(64, (3, 3), padding="same", name="conv2d_block2_2"))
    model.add(layers.Activation("relu"))
    model.add(layers.MaxPooling2D(pool_size=(2, 2), strides=(2, 2), name="maxpool_2"))
    
    # Conv Block 3 (Target feature layer for Grad-CAM)
    model.add(layers.Conv2D(128, (3, 3), padding="same", name="conv2d_block3_1"))
    model.add(layers.Activation("relu"))
    model.add(layers.Conv2D(128, (3, 3), padding="same", name="conv2d_block3_2"))
    model.add(layers.Activation("relu", name="target_conv_layer"))
    model.add(layers.MaxPooling2D(pool_size=(2, 2), strides=(2, 2), name="maxpool_3"))
    
    # Dense Classifier Block
    model.add(layers.Flatten(name="flatten"))
    model.add(layers.Dense(256, activation="relu", name="dense_fc1"))
    model.add(layers.Dropout(rate=dropout_rate, name="dropout"))
    model.add(layers.Dense(num_classes, activation="softmax", name="output_softmax"))
    
    # Optimizer & Compilation
    optimizer = optimizers.Adam(learning_rate=learning_rate)
    loss = losses.SparseCategoricalCrossentropy()
    
    model.compile(
        optimizer=optimizer,
        loss=loss,
        metrics=["accuracy"]
    )
    
    return model

def load_heritage_model(model_path: str = Config.MODEL_PATH):
    if not os.path.exists(model_path):
        return None
    try:
        model = tf.keras.models.load_model(model_path)
        return model
    except Exception as e:
        print(f"[Model Loader] Error loading model from {model_path}: {e}")
        return None
