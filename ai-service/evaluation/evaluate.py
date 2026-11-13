import os
import json
import time
import numpy as np
import tensorflow as tf
from PIL import Image
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support, accuracy_score
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from app.config import Config
from app.model import load_heritage_model

def evaluate_model(model_path: str = Config.MODEL_PATH, test_dir: str = os.path.join(Config.DATASET_DIR, "test")):
    """
    Evaluates the trained CNN model on the test dataset.
    Computes overall accuracy, macro precision, recall, F1, per-class metrics, confusion matrix,
    and average inference latency.
    """
    if not os.path.exists(model_path):
        print(f"[Evaluation Error] Model file not found at {model_path}. Train the model first.")
        return None
        
    model = load_heritage_model(model_path)
    if model is None:
        print("[Evaluation Error] Failed to load model.")
        return None

    y_true = []
    y_pred = []
    latencies = []
    
    for label_idx, class_name in enumerate(Config.CLASS_NAMES):
        cls_dir = os.path.join(test_dir, class_name)
        if not os.path.exists(cls_dir):
            continue
            
        for fname in os.listdir(cls_dir):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                fpath = os.path.join(cls_dir, fname)
                img = Image.open(fpath).convert("RGB")
                img_np = np.array(img.resize((Config.INPUT_WIDTH, Config.INPUT_HEIGHT), Image.BILINEAR)).astype(np.float32) / 255.0
                batch_img = np.expand_dims(img_np, axis=0)
                
                t0 = time.time()
                preds = model.predict(batch_img, verbose=0)
                t1 = time.time()
                
                pred_idx = int(np.argmax(preds[0]))
                y_true.append(label_idx)
                y_pred.append(pred_idx)
                latencies.append(t1 - t0)
                
    if not y_true:
        print("[Evaluation Error] No test images found.")
        return None
        
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    
    accuracy = float(accuracy_score(y_true, y_pred))
    precision, recall, f1, support = precision_recall_fscore_support(y_true, y_pred, labels=[0, 1, 2], zero_division=0)
    
    macro_precision, macro_recall, macro_f1, _ = precision_recall_fscore_support(y_true, y_pred, average="macro", zero_division=0)
    
    cm = confusion_matrix(y_true, y_pred, labels=[0, 1, 2])
    avg_latency = float(np.mean(latencies)) if latencies else 0.0
    
    per_class_results = {}
    for idx, cls_name in enumerate(Config.CLASS_NAMES):
        per_class_results[cls_name] = {
            "display_name": Config.CLASS_DISPLAY_NAMES[cls_name],
            "precision": float(precision[idx]),
            "recall": float(recall[idx]),
            "f1_score": float(f1[idx]),
            "support": int(support[idx])
        }
        
    report_dict = {
        "evaluation_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "model_version": Config.MODEL_VERSION,
        "dataset_split": "test",
        "total_test_samples": len(y_true),
        "overall_accuracy": round(accuracy, 4),
        "macro_precision": round(float(macro_precision), 4),
        "macro_recall": round(float(macro_recall), 4),
        "macro_f1": round(float(macro_f1), 4),
        "avg_inference_latency_sec": round(avg_latency, 4),
        "confusion_matrix": cm.tolist(),
        "class_labels": Config.CLASS_NAMES,
        "class_display_names": list(Config.CLASS_DISPLAY_NAMES.values()),
        "per_class_metrics": per_class_results,
        "paper_baseline_comparison": Config.PAPER_RESULTS
    }
    
    os.makedirs(Config.ARTIFACTS_DIR, exist_ok=True)
    report_path = os.path.join(Config.ARTIFACTS_DIR, "evaluation_report.json")
    with open(report_path, "w") as f:
        json.dump(report_dict, f, indent=2)
        
    # Plot & Save Confusion Matrix Image
    plt.figure(figsize=(7, 6))
    plt.imshow(cm, interpolation="nearest", cmap=plt.cm.Blues)
    plt.title(f"Confusion Matrix ({Config.MODEL_VERSION})")
    plt.colorbar()
    tick_marks = np.arange(len(Config.CLASS_NAMES))
    display_names = [Config.CLASS_DISPLAY_NAMES[c] for c in Config.CLASS_NAMES]
    plt.xticks(tick_marks, display_names, rotation=20, ha="right")
    plt.yticks(tick_marks, display_names)
    
    thresh = cm.max() / 2.
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            plt.text(j, i, format(cm[i, j], "d"),
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")
                     
    plt.ylabel("True Class")
    plt.xlabel("Predicted Class")
    plt.tight_layout()
    cm_plot_path = os.path.join(Config.ARTIFACTS_DIR, "confusion_matrix.png")
    plt.savefig(cm_plot_path, dpi=300)
    plt.close()
    
    print(f"[Evaluation] Evaluation completed! Report saved to {report_path}")
    return report_dict

if __name__ == "__main__":
    evaluate_model()
