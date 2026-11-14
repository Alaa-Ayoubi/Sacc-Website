/* The line drawing on the approvals band: a street taken apart in three
 * layers, the way the company builds it. Road surface with kerbs, lighting
 * and covers; below it the cable ducts and the storm drain; at the bottom the
 * water main, the sewer and its manhole. Drawn in isometric projection from
 * coordinates, so every line is where the geometry puts it. */
const U = 40;
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const W = 9;
const D = 4.6;
const Z = { a: 8.4, b: 4.2, c: 0 };
const T = 0.42;

const P = (x, y, z) => [(x - y) * C * U, ((x + y) * S - z) * U];
const pt = (p) => P(...p).map((n) => n.toFixed(1)).join(',');
const poly = (pts, cls) => `<polygon class="${cls}" points="${pts.map(pt).join(' ')}"/>`;
const path = (pts, cls = 'l') => `<polyline class="${cls}" points="${pts.map(pt).join(' ')}"/>`;
const seg = (a, b, cls = 'l') => path([a, b], cls);
const rad = (deg) => (deg * Math.PI) / 180;
const arc = (fn, from, to, n = 24) => Array.from({ length: n + 1 }, (_, i) => fn(rad(from + ((to - from) * i) / n)));

function slab(z) {
  const top = [[0, 0, z], [W, 0, z], [W, D, z], [0, D, z]];
  const left = [[0, D, z], [W, D, z], [W, D, z - T], [0, D, z - T]];
  const right = [[W, 0, z], [W, D, z], [W, D, z - T], [W, 0, z - T]];
  return [left, right, top].map((f, i) => poly(f, 'base') + poly(f, i === 2 ? 'top' : 'side')).join('');
}

/** A pipe lying along x on a layer. */
function pipe(y, r, z, x0 = 0, x1 = W) {
  const at = (x) => (t) => [x, y + r * Math.cos(t), z + r + r * Math.sin(t)];
  const a = rad(135), b = rad(-45);
  const body = [at(x0)(a), at(x1)(a), at(x1)(b), at(x0)(b)];
  return poly(body, 'base') + poly(body, 'side')
    + seg(at(x0)(a), at(x1)(a)) + seg(at(x0)(b), at(x1)(b))
    + path(arc(at(x0), -45, 135))
    + poly(arc(at(x1), 0, 360, 36), 'base') + poly(arc(at(x1), 0, 360, 36), 'top');
}

const ring = (cx, cy, r, z) => arc((t) => [cx + r * Math.cos(t), cy + r * Math.sin(t), z], 0, 360, 36);

/** An upright cylinder: a manhole chamber, a valve stem. */
function shaft(cx, cy, r, z0, z1) {
  const at = (z) => (t) => [cx + r * Math.cos(t), cy + r * Math.sin(t), z];
  const a = rad(-45), b = rad(135);
  const body = [at(z0)(a), at(z1)(a), at(z1)(b), at(z0)(b)];
  return poly(body, 'base') + poly(body, 'side')
    + seg(at(z0)(a), at(z1)(a)) + seg(at(z0)(b), at(z1)(b))
    + path(arc(at(z0), -45, 135))
    + poly(ring(cx, cy, r, z1), 'base') + poly(ring(cx, cy, r, z1), 'top');
}

/** Dashed verticals that tie a part on one layer to its place on the next. */
function ties(cx, cy, r, z0, z1) {
  const k = r / Math.SQRT2;
  return seg([cx + k, cy - k, z0], [cx + k, cy - k, z1], 'd') + seg([cx - k, cy + k, z0], [cx - k, cy + k, z1], 'd');
}

const corners = (z0, z1) => [[W, 0], [W, D], [0, D]].map(([x, y]) => seg([x, y, z0], [x, y, z1], 'd')).join('');

export function drawing() {
  const mh = [6.6, 3.1];      // sewer manhole
  const valve = [2.6, 1.7];   // valve on the water main
  const basin = [4.55, 3.66]; // kerb inlet to the storm drain
  const pole = [7.5, 0.45];

  const layerC = slab(Z.c)
    + pipe(1.7, 0.3, Z.c)
    + pipe(3.1, 0.42, Z.c)
    + shaft(mh[0], mh[1], 0.52, Z.c, Z.c + 1.35)
    + shaft(valve[0], valve[1], 0.07, Z.c + 0.6, Z.c + 1.2)
    + path(ring(valve[0], valve[1], 0.24, Z.c + 1.2))
    + corners(Z.c, Z.b - T)
    + ties(mh[0], mh[1], 0.52, Z.c + 1.35, Z.b - T)
    + seg([valve[0], valve[1], Z.c + 1.2], [valve[0], valve[1], Z.b - T], 'd');

  const layerB = slab(Z.b)
    + [1.2, 1.36, 1.52].map((y) => seg([0, y, Z.b], [W, y, Z.b])).join('')
    + poly([[5.6, 1.0, Z.b + 0.16], [6.4, 1.0, Z.b + 0.16], [6.4, 1.72, Z.b + 0.16], [5.6, 1.72, Z.b + 0.16]], 'base')
    + poly([[5.6, 1.0, Z.b + 0.16], [6.4, 1.0, Z.b + 0.16], [6.4, 1.72, Z.b + 0.16], [5.6, 1.72, Z.b + 0.16]], 'top')
    + poly([[5.6, 1.72, Z.b + 0.16], [6.4, 1.72, Z.b + 0.16], [6.4, 1.72, Z.b], [5.6, 1.72, Z.b]], 'side')
    + poly([[6.4, 1.0, Z.b + 0.16], [6.4, 1.72, Z.b + 0.16], [6.4, 1.72, Z.b], [6.4, 1.0, Z.b]], 'side')
    + seg([pole[0], pole[1], Z.b], [pole[0], 1.2, Z.b])
    + pipe(3.7, 0.22, Z.b)
    + path(ring(mh[0], mh[1], 0.52, Z.b))
    + corners(Z.b, Z.a - T)
    + ties(mh[0], mh[1], 0.52, Z.b, Z.a - T)
    + seg([valve[0], valve[1], Z.b], [valve[0], valve[1], Z.a - T], 'd')
    + seg([basin[0], basin[1], Z.b + 0.44], [basin[0], basin[1], Z.a - T], 'd')
    + seg([pole[0], pole[1], Z.b], [pole[0], pole[1], Z.a - T], 'd');

  const joints = [];
  for (let x = 1; x < W; x += 1) joints.push(seg([x, 0, Z.a], [x, 0.9, Z.a], 'f'), seg([x, 3.9, Z.a], [x, D, Z.a], 'f'));
  const poles = [1.5, 4.5, 7.5].map((x) => seg([x, 0.45, Z.a], [x, 0.45, Z.a + 1.7])
    + seg([x, 0.45, Z.a + 1.7], [x, 1.1, Z.a + 1.7])
    + path(ring(x, 1.1, 0.09, Z.a + 1.7))).join('');
  const v = 0.16;
  const layerA = slab(Z.a)
    + seg([0, 0.9, Z.a], [W, 0.9, Z.a]) + seg([0, 3.9, Z.a], [W, 3.9, Z.a])
    + seg([0, 2.4, Z.a], [W, 2.4, Z.a], 'd')
    + joints.join('')
    + path(ring(mh[0], mh[1], 0.38, Z.a)) + path(ring(mh[0], mh[1], 0.26, Z.a), 'f')
    + path([[valve[0] - v, valve[1] - v, Z.a], [valve[0] + v, valve[1] - v, Z.a], [valve[0] + v, valve[1] + v, Z.a], [valve[0] - v, valve[1] + v, Z.a], [valve[0] - v, valve[1] - v, Z.a]])
    + path([[4.2, 3.5, Z.a], [4.9, 3.5, Z.a], [4.9, 3.84, Z.a], [4.2, 3.84, Z.a], [4.2, 3.5, Z.a]])
    + [4.375, 4.55, 4.725].map((x) => seg([x, 3.5, Z.a], [x, 3.84, Z.a], 'f')).join('')
    + poles;

  const minX = -D * C * U - 6, maxX = W * C * U + 6;
  const minY = (0.5 * (1.5 + 0.45) - Z.a - 1.7) * U - 10, maxY = ((W + D) * S - Z.c + T) * U + 6;
  return `<svg viewBox="${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}" fill="none" stroke-linecap="round" stroke-linejoin="round">${layerC}${layerB}${layerA}</svg>`;
}
