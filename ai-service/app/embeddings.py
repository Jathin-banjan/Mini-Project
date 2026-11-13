import numpy as np
import tensorflow as tf

def extract_embedding(model: tf.keras.Model, img_array: np.ndarray, layer_name: str = "dense_fc1") -> np.ndarray:
    """
    Extracts a feature vector embedding from a intermediate dense layer.
    Returns: 1D numpy array normalized to unit L2 norm.
    """
    try:
        embedding_model = tf.keras.models.Model(
            inputs=model.inputs,
            outputs=model.get_layer(layer_name).output
        )
        features = embedding_model.predict(img_array, verbose=0)[0]
        norm = np.linalg.norm(features)
        if norm > 0:
            features = features / norm
        return features
    except Exception as e:
        print(f"[Embedding Error] Could not extract embedding: {e}")
        return np.zeros((256,), dtype=np.float32)

def calculate_cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    dot_product = np.dot(vec_a, vec_b)
    norm_a = np.linalg.norm(vec_a)
    norm_b = np.linalg.norm(vec_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(dot_product / (norm_a * norm_b))
