import io
import cv2
import numpy as np
from PIL import Image, ImageOps
from app.config import Config

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def validate_image_file(file_bytes: bytes, filename: str) -> None:
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise ValueError(f"File size exceeds maximum limit of 10MB ({len(file_bytes)} bytes)")
    
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Unsupported file format '.{ext}'. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}")
        
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
    except Exception as e:
        raise ValueError(f"Invalid or corrupted image file: {str(e)}")

def preprocess_image(image_bytes: bytes, target_size=(Config.INPUT_WIDTH, Config.INPUT_HEIGHT)) -> np.ndarray:
    """
    Preprocesses raw image bytes for CNN inference:
    1. Corrects EXIF orientation.
    2. Converts to RGB.
    3. Resizes preserving aspect ratio with black letterbox padding.
    4. Scales pixel values [0, 255] -> [0.0, 1.0].
    Returns shape: (1, 224, 224, 3) float32 numpy array.
    """
    img = Image.open(io.BytesIO(image_bytes))
    
    # EXIF orientation correction
    img = ImageOps.exif_transpose(img)
    
    if img.mode != "RGB":
        img = img.convert("RGB")
        
    np_img = np.array(img)
    
    # Aspect-ratio preserving resize with padding
    h, w = np_img.shape[:2]
    target_w, target_h = target_size
    
    scale = min(target_w / w, target_h / h)
    nw = int(round(w * scale))
    nh = int(round(h * scale))
    
    resized = cv2.resize(np_img, (nw, nh), interpolation=cv2.INTER_AREA if scale < 1 else cv2.INTER_CUBIC)
    
    # Create target canvas with zero padding
    canvas = np.zeros((target_h, target_w, 3), dtype=np.uint8)
    
    top = (target_h - nh) // 2
    left = (target_w - nw) // 2
    canvas[top:top+nh, left:left+nw] = resized
    
    # Normalize to [0.0, 1.0]
    normalized = canvas.astype(np.float32) / 255.0
    
    # Expand dims for batch: (1, 224, 224, 3)
    batch_img = np.expand_dims(normalized, axis=0)
    return batch_img

def apply_training_augmentation(image: np.ndarray) -> np.ndarray:
    """
    Applies paper-specified training data augmentation:
    - Random rotation up to ±15 degrees.
    - Controlled shearing.
    - Controlled Gaussian blur.
    Expects single normalized RGB image (224, 224, 3) or uint8 image.
    """
    h, w = image.shape[:2]
    
    # Convert to uint8 for OpenCV transformations if float
    is_float = image.dtype == np.float32 or image.dtype == np.float64
    img_uint8 = (image * 255.0).astype(np.uint8) if is_float else image.copy()
    
    # 1. Random rotation ±15 deg
    angle = np.random.uniform(-15.0, 15.0)
    center = (w // 2, h // 2)
    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    augmented = cv2.warpAffine(img_uint8, rot_mat, (w, h), borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0))
    
    # 2. Shear transformation
    if np.random.rand() > 0.5:
        shear_factor = np.random.uniform(-0.1, 0.1)
        shear_mat = np.float32([[1, shear_factor, 0], [0, 1, 0]])
        augmented = cv2.warpAffine(augmented, shear_mat, (w, h), borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0))
        
    # 3. Controlled Gaussian blur
    if np.random.rand() > 0.6:
        kernel_size = np.random.choice([3, 5])
        augmented = cv2.GaussianBlur(augmented, (kernel_size, kernel_size), 0)
        
    if is_float:
        return augmented.astype(np.float32) / 255.0
    return augmented
