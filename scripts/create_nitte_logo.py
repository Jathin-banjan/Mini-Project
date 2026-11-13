import os
from PIL import Image, ImageDraw, ImageFont

def generate_nitte_logo():
    # Width x Height at high resolution (300 DPI)
    width, height = 1800, 380
    img = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    # Blue color palette
    nitte_blue = (27, 53, 138, 255) # #1B358A
    gray_line = (180, 185, 195, 255)

    # Fonts
    font_paths = [
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "C:\\Windows\\Fonts\\segoeuib.ttf",
        "C:\\Windows\\Fonts\\calibrib.ttf"
    ]
    font_bold_large = None
    font_bold_medium = None
    font_regular_small = None

    for p in font_paths:
        if os.path.exists(p):
            try:
                font_bold_large = ImageFont.truetype(p, 90)
                font_bold_medium = ImageFont.truetype(p, 62)
                font_regular_small = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf" if os.path.exists("C:\\Windows\\Fonts\\arial.ttf") else p, 32)
                font_shield_n = ImageFont.truetype(p, 140)
                break
            except Exception:
                pass

    if font_bold_large is None:
        font_bold_large = ImageFont.load_default()
        font_bold_medium = font_bold_large
        font_regular_small = font_bold_large
        font_shield_n = font_bold_large

    # 1. Draw rounded shield/square with letter 'N'
    # Shield coordinates
    sx, sy, sw, sh = 30, 40, 200, 260
    # Outer blue rounded rectangle
    draw.rounded_rectangle([sx, sy, sx + sw, sy + sh], radius=45, fill=nitte_blue)
    # Inner border line
    draw.rounded_rectangle([sx + 10, sy + 10, sx + sw - 10, sy + sh - 10], radius=35, outline=(255, 255, 255, 255), width=6)
    
    # Draw 'N' inside shield
    # Center text
    draw.text((sx + 45, sy + 40), "N", font=font_shield_n, fill=(255, 255, 255, 255))

    # 2. Draw 'NITTE'
    nx = sx + sw + 50
    draw.text((nx, 70), "NITTE", font=font_bold_large, fill=nitte_blue)
    
    # 3. Draw '(Deemed to be University)' under NITTE
    draw.text((nx + 5, 180), "(Deemed to be University)", font=font_regular_small, fill=nitte_blue)

    # 4. Vertical divider bar
    div_x = nx + 440
    draw.line([div_x, 50, div_x, 280], fill=gray_line, width=5)

    # 5. Draw 'NMAM INSTITUTE OF TECHNOLOGY' in two lines
    tx = div_x + 60
    draw.text((tx, 75), "NMAM INSTITUTE", font=font_bold_medium, fill=nitte_blue)
    draw.text((tx, 155), "OF TECHNOLOGY", font=font_bold_medium, fill=nitte_blue)

    # Crop whitespace around logo
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop((max(0, bbox[0] - 15), max(0, bbox[1] - 15), min(width, bbox[2] + 15), min(height, bbox[3] + 15)))
    else:
        cropped = img

    os.makedirs("docs", exist_ok=True)
    cropped.save("docs/nitte_nmam_logo.png")
    print("Generated docs/nitte_nmam_logo.png")

    # Generate pure SVG as well
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 220" width="100%" height="auto">
  <defs>
    <style>
      .blue-text {{ fill: #1B358A; font-family: 'Arial', 'Helvetica', sans-serif; font-weight: bold; }}
      .sub-text {{ fill: #1B358A; font-family: 'Arial', 'Helvetica', sans-serif; font-weight: normal; font-size: 20px; }}
    </style>
  </defs>
  <!-- Shield with N -->
  <rect x="15" y="20" width="130" height="170" rx="30" fill="#1B358A" />
  <rect x="22" y="27" width="116" height="156" rx="24" fill="none" stroke="#FFFFFF" stroke-width="4" />
  <text x="47" y="148" font-family="'Arial', 'Helvetica', sans-serif" font-size="105" font-weight="bold" fill="#FFFFFF">N</text>

  <!-- NITTE Text -->
  <text x="180" y="105" class="blue-text" font-size="68" letter-spacing="1">NITTE</text>
  <text x="182" y="145" class="sub-text">(Deemed to be University)</text>

  <!-- Divider -->
  <line x1="475" y1="30" x2="475" y2="185" stroke="#B0B5C0" stroke-width="3" />

  <!-- NMAM INSTITUTE OF TECHNOLOGY -->
  <text x="510" y="95" class="blue-text" font-size="46" letter-spacing="0.5">NMAM INSTITUTE</text>
  <text x="510" y="150" class="blue-text" font-size="46" letter-spacing="0.5">OF TECHNOLOGY</text>
</svg>"""

    with open("docs/nitte_nmam_logo.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Generated docs/nitte_nmam_logo.svg")

if __name__ == "__main__":
    generate_nitte_logo()
