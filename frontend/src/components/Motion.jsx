/* Entrance animation and the credential ticker.
 *
 * The design calls for content to fade up 20px as it scrolls into view, with a
 * 100ms stagger by index. An IntersectionObserver does that without touching
 * the scroll event, so it costs nothing while scrolling.
 */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';

/** Wrap anything that should fade up on entry. `index` drives the stagger. */
export function Reveal({ children, index = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Someone who asked for less motion should get the content, not the effect.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

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

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: visible ? `${Math.min(index, 6) * 100}ms` : '0ms' }}
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
    <div className="ticker">
      <div className="ticker-inner">
        {t.tickerLabel && <span className="ticker-label">{t.tickerLabel}</span>}
        <div className="ticker-viewport" aria-hidden="true">
          <div className="ticker-track">
            {loop.map((name, index) => (
              <span className="ticker-item" key={`${name}-${index}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
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
  const chairman = t.leadership.leaders?.[0];
  if (!t.leadership.quote || !chairman) return null;

  const portrait = chairman.photo || images.chairman;

  return (
    <section className="chairman">
      <div className="container">
        <div className="chairman-grid">
          {portrait && (
            <img className="chairman-photo" src={portrait} alt={chairman.name} loading="lazy" />
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
