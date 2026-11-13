import os
import io
import pytest
import numpy as np
from PIL import Image
from fastapi.testclient import TestClient

from app.config import Config
from app.preprocessing import preprocess_image, validate_image_file
from app.model import build_heritage_cnn
from app.main import app

client = TestClient(app)

def create_dummy_png_bytes(width=300, height=200, color=(100, 150, 200)):
    img = Image.new("RGB", (width, height), color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()

def test_validate_image_file_valid():
    img_bytes = create_dummy_png_bytes()
    # Should not raise exception
    validate_image_file(img_bytes, "test.png")

def test_validate_image_file_invalid_ext():
    img_bytes = create_dummy_png_bytes()
    with pytest.raises(ValueError, match="Unsupported file format"):
        validate_image_file(img_bytes, "test.bmp")

def test_preprocessing_output_shape_and_range():
    img_bytes = create_dummy_png_bytes(100, 400)
    tensor = preprocess_image(img_bytes)
    
    assert tensor.shape == (1, 224, 224, 3)
    assert tensor.dtype == np.float32
    assert tensor.min() >= 0.0
    assert tensor.max() <= 1.0

def test_class_mapping_consistency():
    assert len(Config.CLASS_NAMES) == 3
    assert Config.CLASS_NAMES == ["warli", "madhubani", "textile"]
    assert len(Config.CLASS_DISPLAY_NAMES) == 3
    for name in Config.CLASS_NAMES:
        assert name in Config.CLASS_DISPLAY_NAMES

def test_heritage_cnn_architecture():
    model = build_heritage_cnn()
    assert model.input_shape == (None, 224, 224, 3)
    assert model.output_shape == (None, 3)
    
    # Check layer count and key activation
    layer_names = [l.name for l in model.layers]
    assert "target_conv_layer" in layer_names
    assert "dropout" in layer_names
    assert "output_softmax" in layer_names

def test_fastapi_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_fastapi_ready_endpoint():
    response = client.get("/ready")
    assert response.status_code == 200
    data = response.json()
    assert "ready" in data
    assert "model_version" in data
