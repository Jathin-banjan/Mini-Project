# Model Training & Evaluation Guide

## Dataset Layout

The Python AI service expects datasets structured under `ai-service/datasets/cultural_patterns/`:

```
ai-service/datasets/cultural_patterns/
├── train/
│   ├── warli/
│   ├── madhubani/
│   └── textile/
├── validation/
│   ├── warli/
│   ├── madhubani/
│   └── textile/
└── test/
    ├── warli/
    ├── madhubani/
    └── textile/
```

---

## Running Dataset Generation & Training

### 1. Generate Demonstration Dataset
If custom dataset images are not yet provided, run the sample dataset generator script to generate synthetic geometric pattern samples:

```bash
cd ai-service
python -m training.dataset_generator
```

### 2. Train HeritageCNN Model
To train the CNN model strictly following the paper parameters (stacked Conv2D, Adam lr=0.0001, dropout 0.45, max epochs 65, early stopping patience 8):

```bash
cd ai-service
python -m training.train
```

Outputs:
- Saved Model weights: `ai-service/models/heritage_cnn_v1.h5`
- Model Metadata: `ai-service/models/heritage_cnn_v1_metadata.json`
- Training Curves Plot: `ai-service/artifacts/training_curves.png`
- Training History JSON: `ai-service/artifacts/training_history.json`

---

## Hyperparameter Optimization (Optuna)

To run Optuna hyperparameter tuning study:

```bash
cd ai-service
python -m training.optuna_tuning
```

---

## Evaluating Trained Model

To run test evaluation and compute scikit-learn metrics (Accuracy, Precision, Recall, F1, Confusion Matrix):

```bash
cd ai-service
python -m evaluation.evaluate
```

Outputs:
- Evaluation Report JSON: `ai-service/artifacts/evaluation_report.json`
- Confusion Matrix Plot: `ai-service/artifacts/confusion_matrix.png`
