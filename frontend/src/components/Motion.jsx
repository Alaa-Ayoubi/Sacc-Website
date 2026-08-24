/* Entrance animation and the credential ticker.
 *
 * The design calls for content to fade up 20px as it scrolls into view, with a
 * 100ms stagger by index. An IntersectionObserver does that without touching
 * the scroll event, so it costs nothing while scrolling.
 */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import SafeImage from './SafeImage.jsx';

/** Wrap anything that should fade up on entry. `index` drives the stagger. */
export function Reveal({ children, index = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  // `armed` is what hides the content, and it is only ever set from an effect.
  // Rendering hidden-by-default would mean that a JS failure, or an observer
  // that never fires, leaves the section permanently blank — the animation
  // must not be able to cost anyone the content.
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Someone who asked for less motion should get the content, not the effect.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return undefined;
    }

    // Already on screen at mount: show it without animating in.
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      return undefined;
    }
    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        // One-shot: re-animating on the way back up is distracting.
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [armed && 'reveal', armed && visible && 'is-visible', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes || undefined}
      style={armed ? { transitionDelay: `${Math.min(index, 6) * 100}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Scrolling band of approvals and client names.
 *
 * The list is rendered twice and the track translates by half its width, so the
 * loop has no visible seam. */
export function Ticker() {
  const { t } = useSite();

  const clients = t.projects.items.map((project) => project.client);
  const names = [...t.certifications.approvals, ...new Set(clients)].filter(Boolean);
  if (!names.length) return null;

  const loop = [...names, ...names];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((name, index) => (
          <span className="ticker-item" key={`${name}-${index}`}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The chairman's pull-quote panel.
 *
 * The quote and the chairman both already exist in the leadership section, so
 * this reads them from there rather than duplicating the content — the handoff
 * explicitly asks for one shared source. */
export function ChairmanQuote() {
  const { t, images } = useSite();
  const [hasPortrait, setHasPortrait] = useState(true);
  const chairman = t.leadership.leaders?.[0];
  if (!t.leadership.quote || !chairman) return null;

  const portrait = chairman.photo || images.chairman;
  const showPortrait = Boolean(portrait) && hasPortrait;

  return (
    <section className="chairman">
      <div className="container">
        <div className={`chairman-grid${showPortrait ? '' : ' is-solo'}`}>
          {showPortrait && (
            <SafeImage
              className="chairman-photo"
              src={portrait}
              alt={chairman.name}
              onFail={() => setHasPortrait(false)}
            />
          )}
          <Reveal>
            <blockquote>{t.leadership.quote}</blockquote>
            <div className="role">{chairman.title}</div>
            <div className="who">{chairman.name}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
