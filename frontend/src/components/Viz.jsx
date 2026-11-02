/* Thin engineering line drawings for the discipline tiles.
 *
 * Drawn in a W×200 box whose aspect ratio is also the element's, so the photo
 * window (HTML, with real alt text) lines up exactly with its drawn frame.
 * The markup is built from numbers only, never from content. */
import { useSite } from '../SiteContext.jsx';
import { src, svcOf } from '../lib/site.js';
import { Img } from './ui.jsx';

const H = 200;
const node = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5"/>`;
const r1 = (n) => Math.round(n * 10) / 10;

function drawing(kind, W) {
  const cx = W / 2, k = W / 640;
  if (kind === 'culvert') {
    const w = r1(230 * k + 40);
    const wave = (x, y) => `<path d="M${r1(x)} ${y}q${r1(w / 8)} -12 ${r1(w / 4)} 0t${r1(w / 4)} 0t${r1(w / 4)} 0"/>`;
    return `<path d="M6 52H${W - 6}"/>${node(6, 52)}${node(W - 6, 52)}
      <rect x="${r1(cx - w)}" y="70" width="${w}" height="96" rx="3"/><rect x="${cx}" y="70" width="${w}" height="96" rx="3"/>
      <rect x="${r1(cx - w - 10)}" y="60" width="${r1(2 * w + 20)}" height="116" rx="5"/>
      ${wave(cx - w + 14, 140)}${wave(cx + 14, 140)}${wave(cx - w + 14, 154)}${wave(cx + 14, 154)}
      <path d="M6 188H${W - 6}"/>${node(6, 188)}${node(W - 6, 188)}`;
  }
  if (kind === 'road') {
    const a = r1(300 * k + 40), b = r1(190 * k + 30);
    return `<path d="M6 176H${W - 6}"/>${node(6, 176)}${node(W - 6, 176)}
      <path d="M${r1(cx - a)} 176L${r1(cx - b)} 92H${r1(cx + b)}L${r1(cx + a)} 176"/>
      <path d="M${r1(cx - b + 6)} 104H${r1(cx + b - 6)}M${r1(cx - b + 12)} 116H${r1(cx + b - 12)}"/>
      <path d="M${r1(cx - b + 20)} 80H${cx - 20}M${cx + 20} 80H${r1(cx + b - 20)}" stroke-dasharray="14 10"/>
      <path d="M${r1(cx - b)} 92V40M${r1(cx + b)} 92V40M${r1(cx - b)} 40H${r1(cx + b)}"/>${node(r1(cx - b), 40)}${node(r1(cx + b), 40)}${node(cx, 40)}`;
  }
  if (kind === 'bridge') {
    const a = r1(170 * k + 40);
    const hangers = [-0.6, -0.3, 0, 0.3, 0.6].map((f) => `<path d="M${r1(cx + f * a)} 86V${r1(176 - (1 - f * f) * 85)}"/>`).join('');
    return `<path d="M6 86H${W - 6}"/>${node(6, 86)}${node(W - 6, 86)}
      <path d="M${r1(cx - a)} 176Q${cx} 6 ${r1(cx + a)} 176"/>
      <path d="M${r1(cx - a)} 86V186M${r1(cx + a)} 86V186"/>${hangers}
      <path d="M6 186H${W - 6}"/>${node(r1(cx - a), 186)}${node(r1(cx + a), 186)}`;
  }
  if (kind === 'lab') {
    const c = 46, g = r1(22 + 10 * k), half = r1(1.5 * c + g);
    const cubes = [-1, 0, 1].map((i) => {
      const x = r1(cx + i * (c + g) - c / 2);
      return `<rect x="${x}" y="${160 - c}" width="${c}" height="${c}" rx="2"/><path d="M${r1(x + 10)} ${160 - c - 10}H${r1(x + c + 10)}V150"/>`;
    }).join('');
    return `<path d="M6 160H${W - 6}"/>${node(6, 160)}${node(W - 6, 160)}${cubes}
      <path d="M${r1(cx - half - 20)} 34H${r1(cx + half + 20)}M${r1(cx - half - 20)} 34V160M${r1(cx + half + 20)} 34V160"/>
      <path d="M${cx} 34V${160 - c - 18}"/>${node(cx, 160 - c - 18)}
      <path d="M${r1(cx - half)} 182H${r1(cx + half)}"/><path d="M${r1(cx - half)} 176V188M${r1(cx + half)} 176V188"/>`;
  }
  // cycle: operation and maintenance
  const r = 62;
  const pts = [0, 60, 120, 180, 240, 300].map((d) => node(r1(cx + r * Math.cos((d * Math.PI) / 180)), r1(100 + r * Math.sin((d * Math.PI) / 180)))).join('');
  return `<circle class="ring" cx="${cx}" cy="100" r="${r}"/><circle class="ring" cx="${cx}" cy="100" r="${r - 18}"/>
    <path d="M6 100H${cx - r}M${cx + r} 100H${W - 6}"/>${node(6, 100)}${node(W - 6, 100)}
    <path d="M${cx} 100V${100 - r + 22}M${cx} 100H${cx + 26}"/>${pts}`;
}

function photoFrame(W) {
  const cx = W / 2, k = W / 640;
  const fw = Math.round(W * (W > 500 ? 0.38 : 0.5)), fx = cx - fw / 2, fy = 30, fh = 140;
  const sw = Math.round(W * 0.13), gap = Math.round(14 * k + 6);
  const svg = `<rect x="${fx - 8}" y="${fy - 8}" width="${fw + 16}" height="${fh + 16}" rx="6"/>
    <rect x="${fx - gap - sw}" y="62" width="${sw}" height="76" rx="4"/><rect x="${fx + fw + gap}" y="62" width="${sw}" height="76" rx="4"/>
    <path d="M${fx - gap} 100H${fx - 8}M${fx + fw + 8} 100H${fx + fw + gap}"/>
    <path d="M6 100H${fx - gap - sw}M${fx + fw + gap + sw} 100H${W - 6}"/>
    ${node(6, 100)}${node(W - 6, 100)}${node(fx - 8, 100)}${node(fx + fw + 8, 100)}`;
  const box = { left: `${(fx / W) * 100}%`, top: `${(fy / H) * 100}%`, width: `${(fw / W) * 100}%`, height: `${(fh / H) * 100}%` };
  return { svg, box };
}

export default function Viz({ service, W = 640 }) {
  const { images, ui } = useSite();
  const d = svcOf(service);
  const photo = d.photo || (d.photoKey && src(images?.[d.photoKey]));
  const frame = photo ? photoFrame(W) : null;
  return (
    <div className="viz" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: frame ? frame.svg : drawing(d.draw, W) }} />
      {frame && <div className="ph" style={frame.box}><Img src={photo} alt={`${ui.photoOf}: ${service.title}`} /></div>}
    </div>
  );
}
