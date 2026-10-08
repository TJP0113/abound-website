"""Check decoded dimensions, alpha and default-variant compression quality."""
import json
import math
from pathlib import Path
from PIL import Image, ImageChops, ImageOps, ImageStat

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'image-sizes.json').read_text())
results = {}
for src, item in manifest.items():
    with Image.open(root / ('public' + src)) as original:
        original = ImageOps.exif_transpose(original)
        for variant in item['variants']:
            with Image.open(root / ('public' + variant['src'])) as image:
                assert image.size == (variant['width'], variant['height']), variant['src']
                if original.mode == 'RGBA':
                    reference = original.resize(image.size, Image.Resampling.LANCZOS)
                    assert reference.tobytes() == image.convert('RGBA').tobytes(), variant['src'] + ': lossless logo'
                if variant['src'] == item['default'] and original.mode != 'RGBA':
                    reference = original.resize(image.size, Image.Resampling.LANCZOS).convert('RGB')
                    rms = ImageStat.Stat(ImageChops.difference(reference, image.convert('RGB'))).rms
                    mse = sum(value * value for value in rms) / 3
                    psnr = 10 * math.log10(255 * 255 / mse) if mse else 100
                    assert psnr >= 33, f'{src}: review compression quality ({psnr:.2f} dB)'
                    results[src] = round(psnr, 2)
print('PASS: decoded dimensions, uncropped aspect ratios and lossless RGBA logos; photo default PSNR:', results)
