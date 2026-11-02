'use client';

import { MotionConfig } from 'framer-motion';
import HashScroll from './HashScroll';
import PointerGlow from './PointerGlow';

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <PointerGlow />
      <HashScroll />
      {children}
    </MotionConfig>
  );
}
