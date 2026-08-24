/* The banner at the top of an inner page.
 *
 * Inner pages have no full hero photo, but they still need the navy band the
 * header sits on — without it the header's white text would land on a white
 * page. It doubles as the page title.
 */
import { useSite } from '../SiteContext.jsx';

export default function PageHero({ eyebrow, title, lead, image }) {
  const { images } = useSite();
  const background = image || images.urban || '';

  return (
    <section className="page-hero">
      {background && (
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${background})` }}
          aria-hidden="true"
        />
      )}
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="hero-lead">{lead}</p>}
      </div>
    </section>
  );
}
