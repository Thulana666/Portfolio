'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowRight, MapPin, MessageSquareText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import Magnetic from '@/components/ui/Magnetic';
import styles from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1];

// The brand intro is timed by CSS from first paint and starts fading ~1.05s
// after navigation. Hold the entrance only for whatever is left of it, so a
// slow hydration never adds a second, empty pause.
const INTRO_FADE_START = 1.05;

function getIntroDelay() {
  if (typeof document === 'undefined') return 0;
  if (document.documentElement.dataset.intro !== 'play') return 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  return Math.max(0, INTRO_FADE_START - performance.now() / 1000);
}

/**
 * Portrait-led hero: the cut-out portrait stands in front of the oversized
 * name (split so the head sits between the words), with the role and calls
 * to action on one side and the introduction on the other.
 */
export default function Hero({ site, portrait, cvHref }) {
  const [base] = useState(getIntroDelay);

  const rise = (delay, y = 18) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: base + delay },
  });

  const [firstName, ...rest] = site.name.split(' ');
  const words = [firstName, rest.join(' ')];
  const [roleLead, roleTail] = site.role.split(' & ');

  return (
    <section
      id="home"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-portrait={portrait ? '' : undefined}
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.top}`}>
        <motion.p className={styles.kicker} {...rise(0.1)}>
          <span className={styles.kickerLine} aria-hidden="true" />
          {site.headline}
        </motion.p>
        {site.availability && (
          <motion.p className={styles.availability} {...rise(0.15)}>
            <span className={styles.liveDot} aria-hidden="true" />
            {site.availability}
          </motion.p>
        )}
      </div>

      <div className={styles.stage}>
        <h1 id="hero-title" className={styles.name}>
          {words.map((word, index) => (
            <motion.span
              key={word}
              className={styles.word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: base + 0.2 + index * 0.12 }}
            >
              {word}
              {index === words.length - 1 && <span className={styles.dot}>.</span>}
            </motion.span>
          ))}
        </h1>

        {portrait && (
          <motion.div
            className={styles.portrait}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease, delay: base + 0.3 }}
          >
            <Image
              src={portrait.src}
              alt={`Portrait of ${site.name}`}
              width={portrait.width}
              height={portrait.height}
              preload
              quality={90}
              sizes="(max-width: 1099px) 70vw, 520px"
              className={styles.portraitImg}
            />
          </motion.div>
        )}
      </div>

      <div className={`container ${styles.bottom}`}>
        <motion.div className={styles.identity} {...rise(0.55)}>
          <p className={styles.role}>
            <span className={styles.roleMark} aria-hidden="true" />
            <span>
              {roleLead}
              {roleTail && (
                <>
                  <br />& {roleTail}.
                </>
              )}
            </span>
          </p>
          <div className={styles.ctas}>
            <Magnetic>
              <Link href="/#projects" className="btn btn-primary">
                Explore My Work
                <ArrowRight size={18} data-arrow aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
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
            </Magnetic>
          </div>
        </motion.div>

        <motion.div className={styles.about} {...rise(0.65)}>
          <p className={styles.intro}>{site.heroIntro}</p>
          <div className={styles.meta}>
            <span className={styles.location}>
              <MapPin size={15} aria-hidden="true" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
