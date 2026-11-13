import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("backend/uploads", exist_ok=True)

def generate_yakshagana():
    img = Image.new("RGB", (400, 400), color=(26, 11, 2))
    draw = ImageDraw.Draw(img)
    center = (200, 200)
    
    # Outer halo / headdress rays
    for angle in range(0, 360, 15):
        rad = math.radians(angle)
        x1 = center[0] + int(110 * math.cos(rad))
        y1 = center[1] + int(110 * math.sin(rad))
        x2 = center[0] + int(185 * math.cos(rad))
        y2 = center[1] + int(185 * math.sin(rad))
        draw.line([x1, y1, x2, y2], fill=(245, 158, 11), width=5)
        draw.ellipse([x2-8, y2-8, x2+8, y2+8], fill=(220, 38, 38))
        
    # Concentric ornaments
    draw.ellipse([50, 50, 350, 350], outline=(234, 179, 8), width=6)
    draw.ellipse([80, 80, 320, 320], outline=(185, 28, 28), width=5)
    draw.ellipse([110, 110, 290, 290], fill=(13, 148, 136), outline=(245, 158, 11), width=4)
    draw.ellipse([140, 140, 260, 260], fill=(180, 83, 9), outline=(254, 240, 138), width=3)
    
    # Facial Tilaka / Chutti mask emblem
    draw.polygon([(200, 155), (175, 210), (225, 210)], fill=(255, 255, 255))
    draw.ellipse([192, 185, 208, 201], fill=(220, 38, 38))
    draw.arc([170, 220, 230, 250], 0, 180, fill=(254, 240, 138), width=4)
    
    img.save("backend/uploads/sample_yakshagana.png")

def generate_temple():
    img = Image.new("RGB", (400, 400), color=(68, 64, 60))
    draw = ImageDraw.Draw(img)
    
    # Horizontal stone friezes
    for y in [40, 100, 170, 250, 330]:
        draw.rectangle([20, y, 380, y+8], fill=(214, 211, 209))
        
    # Carved vertical temple pillar relief
    for x in range(40, 380, 60):
        draw.rectangle([x, 55, x+40, 95], fill=(120, 113, 108), outline=(28, 25, 23), width=2)
        draw.ellipse([x+5, 60, x+35, 90], fill=(87, 83, 78), outline=(245, 245, 244), width=1)
        
    # Star-shaped Vimana shikhara base
    draw.polygon([(200, 180), (260, 210), (300, 270), (260, 320), (140, 320), (100, 270), (140, 210)],
                 fill=(100, 95, 90), outline=(231, 229, 228), width=3)
    draw.ellipse([180, 230, 220, 270], fill=(68, 64, 60), outline=(245, 158, 11), width=3)
    
    img.save("backend/uploads/sample_temple.png")

def generate_bidriware():
    img = Image.new("RGB", (400, 400), color=(18, 18, 22))
    draw = ImageDraw.Draw(img)
    
    # Fine silver inlay floral creepers
    for r in range(40, 180, 35):
        draw.ellipse([200-r, 200-r, 200+r, 200+r], outline=(226, 232, 240), width=2)
        
    for angle in range(0, 360, 30):
        rad = math.radians(angle)
        x = 200 + int(120 * math.cos(rad))
        y = 200 + int(120 * math.sin(rad))
        draw.ellipse([x-10, y-10, x+10, y+10], fill=(241, 245, 249), outline=(148, 163, 184), width=1)
        
    draw.polygon([(200, 160), (215, 190), (245, 200), (215, 210), (200, 240), (185, 210), (155, 200), (185, 190)],
                 fill=(255, 255, 255))
    img.save("backend/uploads/sample_bidriware.png")

def generate_kasuti():
    img = Image.new("RGB", (400, 400), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    # Kasuti cross-stitch grid
    colors = [(185, 28, 28), (217, 119, 6), (13, 148, 136), (67, 56, 202)]
    for step in range(20, 380, 20):
        draw.line([step, 20, step, 380], fill=(226, 232, 240), width=1)
        draw.line([20, step, 380, step], fill=(226, 232, 240), width=1)
        
    # Gopura / temple chariot motif in cross-stitch
    c = (194, 65, 12)
    def stitch(x, y, color=c):
        draw.line([x-6, y-6, x+6, y+6], fill=color, width=2)
        draw.line([x+6, y-6, x-6, y+6], fill=color, width=2)
        
    for i in range(10):
        stitch(200 - i*15, 100 + i*20, (185, 28, 28))
        stitch(200 + i*15, 100 + i*20, (185, 28, 28))
        stitch(200 - i*15, 300, (13, 148, 136))
        stitch(200 + i*15, 300, (13, 148, 136))
        stitch(200, 100 + i*20, (217, 119, 6))

    img.save("backend/uploads/sample_kasuti.png")

def generate_channapatna():
    img = Image.new("RGB", (400, 400), color=(254, 243, 199))
    draw = ImageDraw.Draw(img)
    
    # Turned lacquerware toy rings
    rings = [
        (40, (220, 38, 38)),
        (80, (234, 179, 8)),
        (120, (22, 163, 74)),
        (160, (234, 88, 12)),
        (200, (14, 165, 233))
    ]
    for r, col in reversed(rings):
        draw.ellipse([200-r, 200-r, 200+r, 200+r], fill=col, outline=(120, 53, 15), width=3)
        
    draw.ellipse([185, 185, 215, 215], fill=(255, 255, 255))
    img.save("backend/uploads/sample_channapatna.png")

if __name__ == "__main__":
    generate_yakshagana()
    generate_temple()
    generate_bidriware()
    generate_kasuti()
    generate_channapatna()
    print("Sample cultural pattern images successfully generated.")
