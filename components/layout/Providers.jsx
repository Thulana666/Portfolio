'use client';

import { MotionConfig } from 'framer-motion';
import PointerGlow from './PointerGlow';

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <PointerGlow />
      {children}
    </MotionConfig>
  );
}
