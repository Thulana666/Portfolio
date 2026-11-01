'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/**
 * Fades and lifts its children into view once. Reduced-motion users get an
 * opacity-only fade via the global <MotionConfig reducedMotion="user">.
 */
export default function Reveal({ as = 'div', delay = 0, y = 24, amount = 0.2, className, children, ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
