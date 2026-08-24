/* An image that removes itself when its source fails.
 *
 * Several image URLs in the content still point at the client's old CDN, which
 * does not always serve them. A broken image icon in the middle of a leadership
 * card looks like a bug; showing nothing looks deliberate. Swap those URLs for
 * owned assets and this simply stops mattering.
 */
import { useState } from 'react';

export default function SafeImage({ src, alt, fallback = null, onFail, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => {
        setFailed(true);
        // Lets a parent reflow — a two-column panel becomes one, for instance.
        onFail?.();
      }}
      {...rest}
    />
  );
}
