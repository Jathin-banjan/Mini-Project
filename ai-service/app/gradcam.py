import base64
import io
import cv2
import numpy as np
import tensorflow as tf
from PIL import Image

def generate_gradcam(model: tf.keras.Model, 
                     img_array: np.ndarray, 
                     class_index: int = None, 
                     layer_name: str = "target_conv_layer") -> str:
    """
    Generates a Grad-CAM heatmap visualization for the input image.
    Returns: Base64-encoded PNG image string.
    """
    try:
        # Find target convolutional layer if default isn't present
        if layer_name not in [l.name for l in model.layers]:
            conv_layers = [l.name for l in model.layers if isinstance(l, tf.keras.layers.Conv2D)]
            if not conv_layers:
                return None
            layer_name = conv_layers[-1]
            
        grad_model = tf.keras.models.Model(
            inputs=[model.inputs],
            outputs=[model.get_layer(layer_name).output, model.output]
        )
        
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            if class_index is None:
                class_index = tf.argmax(predictions[0])
            loss = predictions[:, class_index]
            
        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        
        # Apply ReLU to retain positive gradients only
        heatmap = tf.maximum(heatmap, 0) / (tf.reduce_max(heatmap) + 1e-10)
        heatmap = heatmap.numpy()
        
        # Resize heatmap to 224x224
        heatmap_resized = cv2.resize(heatmap, (224, 224))
        heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
        
        # Prepare original image uint8
        orig_img = np.uint8(255 * img_array[0])
        
        # Overlay heatmap (0.6 original + 0.4 heatmap)
        superimposed = cv2.addWeighted(orig_img, 0.6, heatmap_colored, 0.4, 0)
        superimposed_rgb = cv2.cvtColor(superimposed, cv2.COLOR_BGR2RGB)
        
        # Convert to Base64 PNG
        pil_img = Image.fromarray(superimposed_rgb)
        buffered = io.BytesIO()
        pil_img.save(buffered, format="PNG")
        encoded_string = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return f"data:image/png;base64,{encoded_string}"
    except Exception as e:
        print(f"[Grad-CAM Error] Could not generate heatmap: {e}")
        return None
