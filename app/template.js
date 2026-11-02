'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// The first page load is covered by the brand intro and section reveals;
// only later client-side navigations get the page transition.
let hasNavigated = false;

export default function Template({ children }) {
  const [isFirstLoad] = useState(() => !hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  // No `filter` here: a filtered ancestor would become the backdrop root and
  // stop every glass panel from blurring the ambient background.
  return (
    <motion.div
      initial={isFirstLoad ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
