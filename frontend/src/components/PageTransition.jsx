/* A soft cross-fade between routes.
 *
 * Chrome and friends can do this natively with the View Transitions API, which
 * animates the real old and new frames — smoother than anything done in React.
 * Where that is missing, a keyed fade on the incoming page gets most of the way
 * there. Only one of the two ever runs, so pages never animate twice.
 *
 * Either way the content is on screen at the end: the animation is layered on
 * top of a normal render, never a precondition for it.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const supportsViewTransitions =
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [phase, setPhase] = useState('in');
  const first = useRef(true);

  useEffect(() => {
    // The browser handles it, or the visitor asked for less motion.
    if (
      supportsViewTransitions ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }
    // Don't animate the very first paint — that is a load, not a navigation.
    if (first.current) {
      first.current = false;
      return undefined;
    }
    setPhase('enter');
    const id = requestAnimationFrame(() => setPhase('in'));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <div className={`page page-${phase}`}>{children}</div>;
}
