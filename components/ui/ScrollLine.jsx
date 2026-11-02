'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** A vertical line that fills from top to bottom as its area scrolls through view. */
export default function ScrollLine({ className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  return <motion.span ref={ref} className={className} style={{ scaleY }} aria-hidden="true" />;
}
