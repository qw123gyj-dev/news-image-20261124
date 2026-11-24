"""Crop the AI photos for the 24 November front page.

Display slots in page.html (1024x1024 canvas):
  lead  968 x 100   satellite in orbit (Sputnik-S)
  row2  470 x  80   chip fab cleanroom, fighter jets over Ulleung
  row3  229 x  48   Pyongyang plaza, Justice Dept, phone with AI app,
                    Beijing government hall
Each crop is saved at 2x display width so the print stays sharp.
Sources are 1920x1280 PNG files generated for this entry.
The crop takes the vertical middle band of each photo, which is
where the subject sits in every shot.
"""
from PIL import Image
import os

HERE = os.path.dirname(os.path.abspath(__file__))


def middle_band(src, aspect, out, width):
    """Crop a full-width band of the given aspect from the middle."""
    im = Image.open(os.path.join(HERE, src)).convert("RGB")
    sw, sh = im.size
    h = round(sw / aspect)
    y0 = max(0, (sh - h) // 2)
    crop = im.crop((0, y0, sw, y0 + h))
    crop = crop.resize((width, round(width * h / sw)), Image.LANCZOS)
    crop.save(os.path.join(HERE, out))
    print(out, crop.size)


# Lead: 968x100 display, aspect 9.68, saved 1936 wide.
middle_band(
    "media-generation-sputnik-0-00796288-86cc-4777-a44f-a91c89907235.png",
    968 / 100,
    "sputnik-wide.png",
    1936,
)

# Row 2: aspect 470/80 = 5.875, saved 940 wide.
middle_band(
    "media-generation-nvidia-0-a9159544-c802-4ce9-8bab-940539851c6b.png",
    470 / 80,
    "nvidia-wide.png",
    940,
)
# Ulleung: the jets sit in the upper third of the frame, so take a
# band starting at y=300 instead of the vertical middle.
im = Image.open(
    os.path.join(
        HERE,
        "media-generation-ulleung-0-d8334204-9718-4cee-bf02-e0f2549a2966.png",
    )
).convert("RGB")
sw, _sh = im.size
crop = im.crop((0, 300, sw, 300 + round(sw / (470 / 80))))
crop = crop.resize((940, 160), Image.LANCZOS)
crop.save(os.path.join(HERE, "ulleung-wide.png"))
print("ulleung-wide.png", crop.size)

# Row 3: aspect 229/48 = 4.77, saved 458 wide.
for src, out in [
    (
        "media-generation-pyongyang-0-7918da7d-9905-47c5-9dc4-1c93aab607df.png",
        "pyongyang-wide.png",
    ),
    (
        "media-generation-doj-0-f9e92c9a-6a32-41d5-a67a-a16eb5c5b38f.png",
        "doj-wide.png",
    ),
    (
        "media-generation-grok-0-deef265c-fabc-4859-84f2-33859ef44ba7.png",
        "grok-wide.png",
    ),
    (
        "media-generation-china-0-e6cbb385-d819-4f10-bb13-bf1a3fc645b5.png",
        "china-wide.png",
    ),
]:
    middle_band(src, 229 / 48, out, 458)

print("all crops done")
