/* Lucide icons, looked up by the name stored with each content row.
 *
 * The content model keeps an icon *name* ("Droplets", "Wrench") rather than
 * markup, so an editor can change which icon a service uses without touching
 * code. Only the icons the design actually calls for are imported, so the
 * bundle carries a handful of glyphs rather than the whole set.
 */
import {
  Building2,
  Clock,
  CloudRain,
  Construction,
  Droplets,
  GraduationCap,
  HardHat,
  Layers,
  Route,
  Satellite,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

const ICONS = {
  Building2,
  Clock,
  CloudRain,
  Construction,
  Droplets,
  GraduationCap,
  HardHat,
  Layers,
  Route,
  Satellite,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  Zap,
};

/** Renders the named icon inside its tinted tile. An unknown or missing name
 *  renders nothing rather than a broken placeholder. */
export default function Icon({ name, size = 22 }) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return (
    <span className="icon-tile">
      <Glyph size={size} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
