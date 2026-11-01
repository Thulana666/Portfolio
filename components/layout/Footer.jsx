import Link from 'next/link';
import { ArrowUp, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import styles from './Footer.module.css';

export default function Footer({ site, links }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.intro}>
            <p className={styles.tagline}>{site.headline}</p>
            <p className={styles.sub}>
              {site.role} · {site.location}
            </p>
          </div>

          <nav aria-label="Footer" className={styles.nav}>
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={`/#${link.id}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.social}>
            {site.email && (
              <a href={`mailto:${site.email}`} className="icon-btn" aria-label="Email">
                <Mail size={18} />
              </a>
            )}
            {site.socials.linkedin && (
              <a href={site.socials.linkedin} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <LinkedInIcon />
              </a>
            )}
            {site.socials.github && (
              <a href={site.socials.github} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>

        {/* SVG text with textLength always fits the container width exactly. */}
        <svg className={styles.wordmark} viewBox="0 0 1000 132" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--text)" stopOpacity="0.09" />
              <stop offset="100%" stopColor="var(--text)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="0" y="124" textLength="1000" lengthAdjust="spacingAndGlyphs">
            {site.brand}
          </text>
        </svg>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. Designed &amp; built with Next.js.
          </p>
          <Link href="/#home" className={styles.backTop}>
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
