'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
const getServerSnapshot = () => 'dark';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === 'light';

  const toggle = (event) => {
    const next = isLight ? 'dark' : 'light';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // Circular reveal from the toggle, Liquid Glass style.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={toggle}
      className={`${styles.toggle} ${className}`}
      data-light={isLight || undefined}
    >
      <span className={styles.track} aria-hidden="true">
        <Moon size={14} className={styles.iconMoon} />
        <Sun size={14} className={styles.iconSun} />
      </span>
      <span className={styles.knob} aria-hidden="true">
        {isLight ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
}
