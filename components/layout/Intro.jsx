/**
 * Brand intro shown once per browser session. Server-rendered and driven
 * entirely by CSS (see `.intro` in globals.css) so it never flashes in after
 * hydration; reduced-motion users and repeat visits skip it.
 */
export default function Intro({ brand, tagline }) {
  const [first, ...rest] = brand.toUpperCase().split(' ');
  const letters = [...`${first} `].map((ch) => ({ ch, accent: false })).concat(
    [...rest.join(' ')].map((ch) => ({ ch, accent: true })),
  );

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-word">
        {letters.map((letter, i) => (
          <span key={i} style={{ '--i': i }} className={letter.accent ? 'intro-accent' : undefined}>
            {letter.ch}
          </span>
        ))}
      </div>
      <div className="intro-bar" />
      <p className="intro-sub">{tagline}</p>
    </div>
  );
}
