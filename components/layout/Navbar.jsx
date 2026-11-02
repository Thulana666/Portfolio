'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDownToLine, Menu, MessageSquareText, X } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

// Sections without their own nav item highlight their closest parent.
const sectionAlias = { skills: 'expertise', certifications: 'education' };

function CvAction({ cvHref, className = '', onClick }) {
  if (cvHref) {
    return (
      <a href={cvHref} download className={`btn btn-primary btn-sm ${className}`} onClick={onClick}>
        <ArrowDownToLine size={16} aria-hidden="true" />
        Download CV
      </a>
    );
  }
  return (
    <Link href="/#contact" className={`btn btn-primary btn-sm ${className}`} onClick={onClick}>
      <MessageSquareText size={16} aria-hidden="true" />
      Request CV
    </Link>
  );
}

export default function Navbar({ brand, links, cvHref }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 26, mass: 0.3 });

  // Scroll state + active section tracking.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      if (!isHome) return;
      const marker = window.innerHeight * 0.35;
      let current = 'home';
      document.querySelectorAll('main section[id]').forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      });
      // At the very bottom, the last section wins even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(sectionAlias[current] ?? current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  // Mobile sheet: lock scroll, close on Escape, move focus into the sheet.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    sheetRef.current?.querySelector('a')?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = isHome ? active : pathname.startsWith('/projects') ? 'projects' : null;
  const close = () => setOpen(false);
  const [brandFirst, ...brandRest] = brand.split(' ');

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <nav className={`glass ${styles.bar}`} aria-label="Primary">
        <Link href="/#home" className={styles.brand} aria-label={`${brand} — home`} onClick={close}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.brandText}>
            {brandFirst}
            {brandRest.length > 0 && <span className={styles.brandRest}> {brandRest.join(' ')}</span>}
          </span>
        </Link>

        <ul className={styles.links}>
          {links.map((link) => {
            const isActive = current === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  className={styles.link}
                  data-active={isActive || undefined}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className={styles.activePill}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkLabel}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <Magnetic strength={0.25}>
            <CvAction cvHref={cvHref} className={styles.cvDesktop} />
          </Magnetic>
          <button
            ref={menuButtonRef}
            type="button"
            className={`icon-btn ${styles.menuButton}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <motion.span className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              ref={sheetRef}
              className={`glass glass-strong ${styles.sheet}`}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className={styles.sheetLinks}>
                {links.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={`/#${link.id}`}
                      className={styles.sheetLink}
                      data-active={current === link.id || undefined}
                      aria-current={current === link.id ? 'location' : undefined}
                      onClick={close}
                    >
                      <span className={styles.sheetIndex}>{String(index + 1).padStart(2, '0')}</span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <CvAction cvHref={cvHref} className={styles.sheetCv} onClick={close} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
