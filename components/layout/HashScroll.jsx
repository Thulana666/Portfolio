'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  // Move focus for keyboard and screen-reader users without a second jump.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  return true;
}

/**
 * Reliable in-page navigation for "/#section" links. Handles same-page
 * clicks itself (deferring a frame so the mobile menu's scroll lock is
 * released first) and scrolls to the hash after arriving from another page.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest('a[href^="/#"], a[href^="#"]') : null;
      if (!link || link.target === '_blank') return;
      const id = link.getAttribute('href').split('#')[1];
      if (!id || !document.getElementById(id)) return;

      // Stop Next's router from handling it; we scroll and update the URL ourselves.
      // The short delay lets the mobile menu close and release its scroll lock first.
      event.preventDefault();
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
      setTimeout(() => scrollToSection(id), 40);
    };

    // Capture phase so this runs before React's handlers on <Link>.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // Arriving at "/#section" from another page.
  useEffect(() => {
    if (pathname !== '/' || !window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const timer = setTimeout(() => scrollToSection(id), 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
