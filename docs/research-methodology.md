# Research Methodology

## Theoretical Framework & Research Goals
This system implements the research paper and patent application entitled **"Artificial Intelligence System for Automatic Identification and Classification of Cultural Patterns"**.

The primary objective is to evaluate deep Convolutional Neural Networks (CNNs) for the automatic identification of indigenous Indian cultural pattern traditions across three target classes:
1. **Warli Art Motifs**
2. **Madhubani Paintings**
3. **Indian Textile Patterns**

---

## Image Preprocessing Specifications

The research paper defines strict input image preprocessing parameters:
- **Formats Supported**: JPG, JPEG, PNG, WebP.
- **Max File Size**: 10 MB.
- **Orientation**: EXIF orientation tags checked and corrected automatically.
- **Resizing & Aspect Ratio**: Images resized to **224 × 224 × 3 RGB** using zero-padding (letterboxing) to preserve original aspect ratio without distortion.
- **Pixel Scaling**: Integer pixel values $[0, 255]$ divided by $255.0$ to obtain float values $[0.0, 1.0]$.
- **Training Augmentation**: Random rotation up to $\pm 15^\circ$, controlled shearing, and Gaussian blur applied *only* during training epochs. Production inference uses strict non-augmented deterministic preprocessing.

---

## CNN Architecture Details

The proposed model follows a custom stacked Conv2D architecture:

```
Input (224, 224, 3)
  │
  ├── Conv2D(32, (3,3), relu) ── Conv2D(32, (3,3), relu) ── MaxPooling2D((2,2), stride=2)
  │
  ├── Conv2D(64, (3,3), relu) ── Conv2D(64, (3,3), relu) ── MaxPooling2D((2,2), stride=2)
  │
  ├── Conv2D(128, (3,3), relu) ── Conv2D(128, (3,3), relu) [target_conv_layer] ── MaxPooling2D((2,2), stride=2)
  │
  ├── Flatten
  │
  ├── Dense(256, relu)
  │
  ├── Dropout(rate=0.45)
  │
  └── Dense(3, activation='softmax') [Output]
```

### Hyperparameters
- **Loss Function**: Sparse Categorical Crossentropy.
- **Optimizer**: Adam ($\text{learning\_rate} = 0.0001$).
- **Batch Size**: 32.
- **Max Epochs**: Configurable (> 60) with **Early Stopping** (patience = 8 epochs monitoring `val_loss`).
- **Hyperparameter Optimization**: Optuna study supporting 50 Bayesian optimization trials over learning rate, dropout, and batch size.

---

## Historical Benchmark Results Reported in Research Paper

The research paper reports experimental evaluations on a 6,000-image dataset (4,000 train / 2,000 test):

| System / Model | Mean Accuracy | Macro Precision | Macro Recall | Macro F1-Score | Inference Latency |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Proposed HeritageCNN** | **96.2%** | **0.958** | **0.946** | **0.952** | **0.22s / image** |
| AlexNet Baseline | 79.5% | 0.781 | 0.764 | 0.772 | 0.12s / image |
| ResNet-50 Baseline | 86.8% | 0.865 | 0.851 | 0.858 | 0.45s / image |

*Note: These benchmarks represent published reference results reported in the paper. Newly trained local models display their own measured evaluation metrics under the Evaluation view.*
