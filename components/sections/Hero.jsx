'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowRight, MapPin, MessageSquareText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import HeroVisual from './HeroVisual';
import styles from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

const titleLines = [
  { text: 'Turning', accent: false },
  { text: 'Data Into', accent: false },
  { text: 'Intelligence.', accent: true },
];

const pillars = [
  { label: 'Data', tone: 'lime' },
  { label: 'AI', tone: 'violet' },
  { label: 'Innovation', tone: 'blue' },
];

export default function Hero({ site, photo, cvHref }) {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          {site.availability && (
            <motion.p className={styles.availability} {...rise(0.05)}>
              <span className={styles.liveDot} aria-hidden="true" />
              {site.availability}
            </motion.p>
          )}

          <motion.p className={styles.kicker} {...rise(0.12)}>
            <span className={styles.kickerName}>{site.name}</span>
            <span className={styles.kickerSep} aria-hidden="true" />
            {site.role}
          </motion.p>

          <h1 id="hero-title" className={styles.title}>
            <span className="sr-only">{site.name} — </span>
            {titleLines.map((line, index) => (
              <span key={line.text} className={styles.line}>
                <motion.span
                  className={`${styles.lineInner} ${line.accent ? styles.accentLine : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease, delay: 0.2 + index * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className={styles.pillars} {...rise(0.5)} aria-label={site.subheadline}>
            {pillars.map((pillar) => (
              <span key={pillar.label} className={styles.pillar} data-tone={pillar.tone} aria-hidden="true">
                <span className={styles.pillarDot} />
                {pillar.label}.
              </span>
            ))}
          </motion.p>

          <motion.p className={styles.intro} {...rise(0.6)}>
            {site.heroIntro}
          </motion.p>

          <motion.div className={styles.ctas} {...rise(0.7)}>
            <Link href="/#projects" className="btn btn-primary">
              Explore My Work
              <ArrowRight size={18} data-arrow aria-hidden="true" />
            </Link>
            {cvHref ? (
              <a href={cvHref} download className="btn btn-glass">
                <ArrowDownToLine size={18} aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <Link href="/#contact" className="btn btn-glass">
                <MessageSquareText size={18} aria-hidden="true" />
                Request CV
              </Link>
            )}
          </motion.div>

          <motion.div className={styles.meta} {...rise(0.8)}>
            <span className={styles.location}>
              <MapPin size={16} aria-hidden="true" />
              {site.location}
            </span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span className={styles.socials}>
              {site.socials.linkedin && (
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                  <LinkedInIcon size={17} />
                </a>
              )}
              {site.socials.github && (
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                  <GitHubIcon size={17} />
                </a>
              )}
            </span>
          </motion.div>
        </div>

        <motion.div
          className={styles.visualWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.25 }}
        >
          <HeroVisual photo={photo} name={site.name} initials={site.initials} location={site.location} />
        </motion.div>
      </div>

      <Link href="/#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <span className={styles.mouse} aria-hidden="true">
          <span className={styles.wheel} />
        </span>
        <span className={styles.scrollLabel}>Scroll</span>
      </Link>
    </section>
  );
}
