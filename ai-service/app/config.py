import os

class Config:
    INPUT_HEIGHT = 224
    INPUT_WIDTH = 224
    INPUT_CHANNELS = 3
    INPUT_SHAPE = (INPUT_HEIGHT, INPUT_WIDTH, INPUT_CHANNELS)
    
    CLASS_NAMES = ["warli", "madhubani", "textile"]
    
    CLASS_DISPLAY_NAMES = {
        "warli": "Warli Art Motifs",
        "madhubani": "Madhubani Paintings",
        "textile": "Indian Textile Patterns"
    }
    
    # Model Hyperparameters
    LEARNING_RATE = 0.0001
    BATCH_SIZE = 32
    DROPOUT_RATE = 0.45
    DEFAULT_EPOCHS = 65
    EARLY_STOPPING_PATIENCE = 8
    
    # Confidence threshold for human review warning
    LOW_CONFIDENCE_THRESHOLD = 0.60
    
    # Paths
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_DIR = os.path.join(BASE_DIR, "models")
    MODEL_PATH = os.path.join(MODEL_DIR, "heritage_cnn_v1.h5")
    MODEL_METADATA_PATH = os.path.join(MODEL_DIR, "heritage_cnn_v1_metadata.json")
    ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")
    DATASET_DIR = os.path.join(BASE_DIR, "datasets", "cultural_patterns")
    
    MODEL_VERSION = "HeritageCNN-v1.0.0"
    
    # Paper baseline comparison metrics
    PAPER_RESULTS = {
        "proposed_cnn": {
            "name": "Proposed HeritageCNN",
            "mean_accuracy": 0.962,
            "macro_precision": 0.958,
            "macro_recall": 0.946,
            "macro_f1": 0.952,
            "latency_sec": 0.22,
            "is_paper_baseline": True
        },
        "alexnet": {
            "name": "AlexNet Baseline",
            "mean_accuracy": 0.795,
            "macro_precision": 0.781,
            "macro_recall": 0.764,
            "macro_f1": 0.772,
            "latency_sec": 0.12,
            "is_paper_baseline": True
        },
        "resnet50": {
            "name": "ResNet-50 Baseline",
            "mean_accuracy": 0.868,
            "macro_precision": 0.865,
            "macro_recall": 0.851,
            "macro_f1": 0.858,
            "latency_sec": 0.45,
            "is_paper_baseline": True
        }
    }
