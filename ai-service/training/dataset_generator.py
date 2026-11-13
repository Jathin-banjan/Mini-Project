import os
import cv2
import numpy as np
from PIL import Image, ImageDraw
from app.config import Config

def create_warli_sample(size=(224, 224)) -> np.ndarray:
    """Generates synthetic Warli art style pattern: earthy background with white geometric stick motifs."""
    # Earthy terracotta background
    bg_color = (165, 60, 35) # BGR
    img = np.full((size[1], size[0], 3), bg_color, dtype=np.uint8)
    
    # White pigment drawings
    white = (245, 245, 240)
    
    # Draw central circle (Sun/Tarpa dance center)
    center = (size[0] // 2, size[1] // 2)
    cv2.circle(img, center, 25, white, 2)
    
    # Draw Warli stick figures around circle (two triangles facing each other)
    for angle in np.linspace(0, 2*np.pi, 8, endpoint=False):
        radius = 55
        fx = int(center[0] + radius * np.cos(angle))
        fy = int(center[1] + radius * np.sin(angle))
        
        # Head
        cv2.circle(img, (fx, fy - 12), 4, white, -1)
        # Upper torso triangle
        pts1 = np.array([[fx, fy - 8], [fx - 6, fy], [fx + 6, fy]], np.int32)
        cv2.fillPoly(img, [pts1], white)
        # Lower torso triangle
        pts2 = np.array([[fx, fy + 8], [fx - 6, fy], [fx + 6, fy]], np.int32)
        cv2.fillPoly(img, [pts2], white)
        # Legs
        cv2.line(img, (fx, fy + 8), (fx - 5, fy + 18), white, 2)
        cv2.line(img, (fx, fy + 8), (fx + 5, fy + 18), white, 2)
        
    # Triangular geometric border
    for x in range(0, size[0], 16):
        pts = np.array([[x, size[1]], [x+8, size[1]-15], [x+16, size[1]]], np.int32)
        cv2.polylines(img, [pts], True, white, 1)
        
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def create_madhubani_sample(size=(224, 224)) -> np.ndarray:
    """Generates synthetic Madhubani art style pattern: double outlines, fish/floral motifs, vibrant colors."""
    bg_color = (250, 243, 224) # Off-white / paper background
    img = np.full((size[1], size[0], 3), bg_color, dtype=np.uint8)
    
    black = (20, 20, 20)
    bright_red = (200, 30, 40)
    bright_yellow = (240, 200, 40)
    bright_green = (30, 160, 60)
    
    # Draw double-bordered frame
    cv2.rectangle(img, (10, 10), (size[0]-10, size[1]-10), black, 2)
    cv2.rectangle(img, (14, 14), (size[0]-14, size[1]-14), black, 1)
    
    # Draw central Madhubani fish motif with double outline and fine lines
    center = (size[0] // 2, size[1] // 2)
    
    # Fish body shape (ellipse)
    cv2.ellipse(img, center, (60, 30), 0, 0, 360, bright_yellow, -1)
    cv2.ellipse(img, center, (60, 30), 0, 0, 360, black, 2)
    cv2.ellipse(img, center, (56, 27), 0, 0, 360, black, 1) # Double outline
    
    # Fish tail
    tail_pts = np.array([[center[0]-55, center[1]], [center[0]-85, center[1]-25], [center[0]-85, center[1]+25]], np.int32)
    cv2.fillPoly(img, [tail_pts], bright_red)
    cv2.polylines(img, [tail_pts], True, black, 2)
    
    # Fish eye
    cv2.circle(img, (center[0] + 35, center[1] - 5), 6, (255, 255, 255), -1)
    cv2.circle(img, (center[0] + 35, center[1] - 5), 6, black, 1)
    cv2.circle(img, (center[0] + 36, center[1] - 5), 2, black, -1)
    
    # Fine hatching lines on fish body (characteristic of Madhubani)
    for x_off in range(-30, 30, 8):
        cv2.line(img, (center[0]+x_off, center[1]-15), (center[0]+x_off, center[1]+15), black, 1)
        
    # Floral motifs in corners
    for cx, cy in [(35, 35), (size[0]-35, 35), (35, size[1]-35), (size[0]-35, size[1]-35)]:
        cv2.circle(img, (cx, cy), 14, bright_green, -1)
        cv2.circle(img, (cx, cy), 14, black, 2)
        cv2.circle(img, (cx, cy), 6, bright_red, -1)
        
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def create_textile_sample(size=(224, 224)) -> np.ndarray:
    """Generates synthetic Indian Textile pattern: Paisley/Kalka motifs and Bandhani tie-dye grid dots."""
    # Indigo or deep crimson fabric background
    bg_color = (25, 20, 80) # Dark navy / indigo
    img = np.full((size[1], size[0], 3), bg_color, dtype=np.uint8)
    
    gold = (212, 175, 55)
    cream = (245, 240, 230)
    maroon = (120, 20, 40)
    
    # Bandhani tie-dye dot grid
    for y in range(20, size[1]-15, 25):
        for x in range(20, size[0]-15, 25):
            cv2.circle(img, (x, y), 3, maroon, -1)
            cv2.circle(img, (x, y), 2, cream, -1)
            
    # Central Paisley / Kalka motif outline
    center = (size[0] // 2, size[1] // 2)
    # Tear drop body
    cv2.ellipse(img, center, (40, 60), 20, 0, 360, gold, 3)
    cv2.ellipse(img, (center[0]+15, center[1]-35), (20, 35), -40, 0, 360, gold, 3)
    
    # Internal fill decorative dots
    for r in range(10, 30, 8):
        cv2.circle(img, center, r, gold, 1)
        
    # Decorative border lines
    cv2.line(img, (0, 8), (size[0], 8), gold, 2)
    cv2.line(img, (0, size[1]-8), (size[0], size[1]-8), gold, 2)
    
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def generate_sample_dataset(dataset_root: str = Config.DATASET_DIR, count_per_class={"train": 100, "validation": 25, "test": 25}):
    """
    Generates a sample dataset with distinct geometric cultural motifs for demo, training, and testing.
    """
    print(f"[Dataset Generator] Generating sample dataset in: {dataset_root}")
    classes = ["warli", "madhubani", "textile"]
    generators = {
        "warli": create_warli_sample,
        "madhubani": create_madhubani_sample,
        "textile": create_textile_sample
    }
    
    for split, count in count_per_class.items():
        for cls in classes:
            split_cls_dir = os.path.join(dataset_root, split, cls)
            os.makedirs(split_cls_dir, exist_ok=True)
            
            gen_func = generators[cls]
            for i in range(count):
                img_rgb = gen_func()
                
                # Add slight random variation to each sample (rotation, noise, brightness)
                angle = np.random.uniform(-10, 10)
                h, w = img_rgb.shape[:2]
                M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1.0)
                var_img = cv2.warpAffine(img_rgb, M, (w, h), borderMode=cv2.BORDER_REFLECT)
                
                # Brightness jitter
                brightness = np.random.uniform(0.9, 1.1)
                var_img = np.clip(var_img.astype(np.float32) * brightness, 0, 255).astype(np.uint8)
                
                filepath = os.path.join(split_cls_dir, f"{cls}_sample_{i+1:03d}.png")
                Image.fromarray(var_img).save(filepath)
                
    print("[Dataset Generator] Dataset generation complete!")

if __name__ == "__main__":
    generate_sample_dataset()
