/**
 * Full-bleed scrolling band of focus areas. Decorative: the same topics are
 * covered in readable form in Expertise and About, so it is hidden from
 * assistive technology. Pauses on hover; static with reduced motion.
 */
export default function Ticker({ items }) {
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
