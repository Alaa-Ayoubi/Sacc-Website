/* The hero's wireframe ground plane.
 *
 * A surveyed terrain grid in the brand teal that swells slowly and drifts with
 * the pointer. The geometry, the displacement formula and the camera are the
 * ones from the design prototype, reproduced here on a 2D canvas rather than
 * through three.js: it is a wireframe of straight segments, so a renderer that
 * only has to project points and stroke lines does the same job without
 * carrying a 3D engine into the bundle.
 *
 * Decorative only — it is aria-hidden, it stops when the tab is hidden, and it
 * does not draw at all for a visitor who asked for reduced motion.
 */
import { useEffect, useRef } from 'react';

// Plane: 26 x 16 units, 46 x 30 segments — from the prototype.
const SEG_X = 46;
const SEG_Y = 30;
const WIDTH = 26;
const HEIGHT = 16;

const TILT = -Math.PI / 2.32; // grid.rotation.x
const LIFT = -1.4; // grid.position.y
const FOV = 46;
const CAM_Z = 8.4;
const CAM_Y = 3.1;
const LOOK_Y = 0.2;

export default function HeroGrid() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    // Rest positions of every vertex, in plane space.
    const points = [];
    for (let iy = 0; iy <= SEG_Y; iy += 1) {
      for (let ix = 0; ix <= SEG_X; ix += 1) {
        points.push({
          x: (ix / SEG_X - 0.5) * WIDTH,
          y: (iy / SEG_Y - 0.5) * HEIGHT,
        });
      }
    }

    const pointer = { x: 0, y: 0 };
    const camera = { x: 0, y: CAM_Y };
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 1280;
      height = rect.height || 620;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const onPointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    /* Rotate the plane, then project through a perspective camera that looks
       slightly above the origin — the same transform three.js applied. */
    const project = (px, py, pz, spin) => {
      // Spin about Z, in plane space.
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const rx = px * cs - py * sn;
      const ry = px * sn + py * cs;

      // Tilt about X, and lift.
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);
      const wy = ry * ct - pz * st + LIFT;
      const wz = ry * st + pz * ct;

      // Into camera space. The camera looks at (0, LOOK_Y, 0) from (cx, cy, CAM_Z).
      const ex = rx - camera.x;
      const ey = wy - camera.y;
      const ez = wz - CAM_Z;

      // Pitch so the look-at point sits on the axis.
      const pitch = Math.atan2(camera.y - LOOK_Y, CAM_Z);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const cy2 = ey * cp - ez * sp;
      const cz2 = ey * sp + ez * cp;

      if (cz2 > -0.1) return null; // behind, or on, the camera plane
      const f = height / (2 * Math.tan((FOV * Math.PI) / 360));
      return {
        x: width / 2 + (ex * f) / -cz2,
        y: height / 2 - (cy2 * f) / -cz2,
      };
    };

    const start = performance.now();
    const draw = () => {
      const t = (performance.now() - start) / 1000;

      // Ease the camera toward the pointer, exactly as the prototype does.
      camera.x += (pointer.x * 0.7 - camera.x) * 0.04;
      camera.y += (CAM_Y - pointer.y * 0.4 - camera.y) * 0.04;
      const spin = Math.sin(t * 0.08) * 0.05 + pointer.x * 0.05;

      // Displace every vertex — the terrain swell.
      const screen = new Array(points.length);
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const z =
          Math.sin(p.x * 0.36 + t * 0.55) * 0.5 + Math.cos(p.y * 0.42 + t * 0.4) * 0.42;
        screen[i] = project(p.x, p.y, z, spin);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(98, 167, 162, 0.34)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      const at = (ix, iy) => screen[iy * (SEG_X + 1) + ix];
      for (let iy = 0; iy <= SEG_Y; iy += 1) {
        for (let ix = 0; ix <= SEG_X; ix += 1) {
          const a = at(ix, iy);
          if (!a) continue;
          const right = ix < SEG_X ? at(ix + 1, iy) : null;
          const down = iy < SEG_Y ? at(ix, iy + 1) : null;
          if (right) { ctx.moveTo(a.x, a.y); ctx.lineTo(right.x, right.y); }
          if (down) { ctx.moveTo(a.x, a.y); ctx.lineTo(down.x, down.y); }
        }
      }
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };

    // A hidden tab should not be spending frames on decoration.
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-grid" aria-hidden="true" />;
}
