'use client';

import { useEffect } from 'react';

/**
 * One delegated listener that feeds the pointer position into any
 * `[data-glow]` element as --mx / --my, powering the glass light reflection.
 */
export default function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last = null;

    const onMove = (event) => {
      last = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = last.target instanceof Element ? last.target.closest('[data-glow]') : null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${last.clientX - rect.left}px`);
        target.style.setProperty('--my', `${last.clientY - rect.top}px`);
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
