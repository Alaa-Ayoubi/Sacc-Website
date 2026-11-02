"""Pixel comparison of verify.js screenshots: <name>-a.png (live prototype) vs <name>-b.png (snapshot).
Usage: python3 verify.py <screenshots dir>   (needs Pillow and numpy)"""
import glob, os, sys
import numpy as np
from PIL import Image
d = sys.argv[1]
for fa in sorted(glob.glob(os.path.join(d, '*-a.png'))):
    n = os.path.basename(fa)[:-6]
    a = Image.open(fa).convert('RGB'); b = Image.open(os.path.join(d, n + '-b.png')).convert('RGB')
    h = min(a.size[1], b.size[1])
    m = np.abs(np.asarray(a)[:h].astype(int) - np.asarray(b)[:h].astype(int)).max(axis=2) > 40
    ys = np.nonzero(m)[0]
    size = 'same' if a.size == b.size else f'{a.size}!={b.size}'
    print(f"{n:28s} size={size} diffpx={int(m.sum()):6d}", f"rows {ys.min()}-{ys.max()}" if m.sum() else '')
