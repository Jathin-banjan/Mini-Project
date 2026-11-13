# Model Limitations & Future Work

## Model Scope & Limitations

1. **Three-Class Scope Boundary**:
   - The current research model evaluates three specific Indian cultural pattern categories: **Warli Art Motifs**, **Madhubani Paintings**, and **Indian Textile Patterns**.
   - The model has not been validated to generalize to all global or South Asian cultural heritage art forms (such as Tanjore, Pattachitra, or Kalamkari).
   - Images outside the 3 target classes will produce output Softmax distributions over the 3 classes. A low-confidence warning threshold (0.60) is implemented to recommend expert human review.

2. **Single-Pattern Focus**:
   - The current CNN architecture assumes a primary dominant pattern per image crop rather than multi-label spatial segmentation of composite murals.

3. **Grad-CAM Explainability Boundary**:
   - Grad-CAM heatmaps highlight spatial regions in the final convolutional layer that strongly influence feature activations. They represent neural network attention approximations, not human symbolic interpretations of cultural iconography.

---

## Future Research & Engineering Extensions

1. **Multi-Label Object Detection & Segmentation**: Integrating YOLOv8 or Mask R-CNN for localized multi-motif detection in large composite murals.
2. **Expansion of Taxonomy**: Expanding dataset taxonomy to 15+ indigenous pattern classes across Asia.
3. **Edge Quantization**: Quantizing Keras model weights to TensorFlow Lite / ONNX for offline mobile inference by archivists in remote field sites.
