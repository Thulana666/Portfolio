'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import styles from './HeroVisual.module.css';

const PALETTES = {
  dark: { line: '170, 185, 255', nodes: ['#B9F36A', '#8B9CFF', '#A78BFA'], neutral: 'rgba(235, 240, 255, 0.75)', pointer: '185, 243, 106' },
  light: { line: '40, 55, 130', nodes: ['#5E9E12', '#4655D4', '#6D48D6'], neutral: 'rgba(30, 41, 59, 0.6)', pointer: '70, 120, 10' },
};

const LINK_DISTANCE = 128;
const POINTER_DISTANCE = 170;

/** Animated node network drawn on canvas; pauses when off-screen. */
function useNetwork(canvasRef, wrapRef, pointerRef, reduceMotion) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;
    let visible = true;
    let palette = PALETTES.dark;

    const readTheme = () => {
      palette = document.documentElement.dataset.theme === 'light' ? PALETTES.light : PALETTES.dark;
    };

    const seed = () => {
      const count = Math.max(18, Math.min(56, Math.round((width * height) / 9500)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 1,
        accent: i % 5 === 0 ? i % 3 : -1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      const pointer = pointerRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${palette.line}, ${(1 - dist / LINK_DISTANCE) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < POINTER_DISTANCE) {
          ctx.strokeStyle = `rgba(${palette.pointer}, ${(1 - pd / POINTER_DISTANCE) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        if (node.accent >= 0) {
          const pulse = 0.5 + 0.5 * Math.sin(time / 900 + node.phase);
          ctx.fillStyle = palette.nodes[node.accent];
          ctx.globalAlpha = 0.18 + pulse * 0.18;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 5 + pulse * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = palette.neutral;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = (time) => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(step) : 0;
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (!frame) frame = requestAnimationFrame(step);
    };

    readTheme();
    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(wrap);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [canvasRef, wrapRef, pointerRef, reduceMotion]);
}

const pipeline = ['Ingest', 'Clean', 'Model', 'Insight'];
const bars = [0.42, 0.68, 0.5, 0.86, 0.62, 0.94, 0.74];

// Illustrative series — not real data.
const actual = 'M0 62 L18 56 L36 60 L54 44 L72 48 L90 34 L108 38 L126 24';
const forecast = 'M126 24 L144 20 L162 14 L180 8';

export default function HeroVisual({ photo, name, initials, location }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -10000, y: -10000 });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  useNetwork(canvasRef, wrapRef, pointerRef, reduceMotion);

  // Cycle the pipeline indicator.
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setStage((s) => (s + 1) % pipeline.length), 1800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Pointer parallax for the floating panels.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });
  const layer1 = { x: useTransform(sx, (v) => v * 10), y: useTransform(sy, (v) => v * 10) };
  const layer2 = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 22) };
  const layer3 = { x: useTransform(sx, (v) => v * 34), y: useTransform(sy, (v) => v * 34) };
  // The whole panel stack tilts a few degrees towards the cursor for spatial depth.
  const tiltX = useTransform(sy, (v) => v * -7);
  const tiltY = useTransform(sx, (v) => v * 7);

  const onPointerMove = (event) => {
    const rect = wrapRef.current.getBoundingClientRect();
    pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (event.pointerType === 'mouse' && !reduceMotion) {
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const onPointerLeave = () => {
    pointerRef.current = { x: -10000, y: -10000 };
    px.set(0);
    py.set(0);
  };

  const activeStage = reduceMotion ? pipeline.length - 1 : stage;

  return (
    <div ref={wrapRef} className={styles.visual} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />
      <div className={`${styles.orbit} ${styles.orbitInner}`} aria-hidden="true" />

      <motion.div className={styles.tilt} style={{ rotateX: tiltX, rotateY: tiltY }}>
      {/* Portrait */}
      <motion.figure className={`glass glass-thick ${styles.portrait}`} style={layer1}>
        <div className={styles.portraitMedia}>
          {photo ? (
            <Image
              src={photo}
              alt={`Portrait of ${name}`}
              fill
              preload
              sizes="(max-width: 980px) 60vw, 300px"
              className={styles.photo}
            />
          ) : (
            <div className={styles.monogram} aria-hidden="true">
              <span>{initials}</span>
            </div>
          )}
          <div className={styles.scanline} aria-hidden="true" />
        </div>
        <figcaption className={styles.portraitCaption}>
          <span className={styles.captionName}>{name}</span>
          <span className={styles.captionRole}>Data · AI · Software</span>
        </figcaption>
      </motion.figure>

      {/* Forecast panel */}
      <motion.div className={`glass glass-thick ${styles.panel} ${styles.panelChart}`} style={layer3} aria-hidden="true">
        <div className={styles.panelHead}>
          <span className={styles.panelLabel}>Signal → Insight</span>
          <span className={styles.panelChip}>Forecast</span>
        </div>
        <svg viewBox="0 0 180 72" className={styles.spark} preserveAspectRatio="none">
          <defs>
            <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[18, 36, 54].map((y) => (
            <line key={y} x1="0" x2="180" y1={y} y2={y} className={styles.gridLine} />
          ))}
          <path d={`${actual} L126 72 L0 72 Z`} fill="url(#hv-area)" />
          <motion.path
            d={actual}
            className={styles.sparkLine}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.path
            d={forecast}
            className={styles.sparkForecast}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.3 }}
          />
          <circle cx="126" cy="24" r="3.5" className={styles.sparkDot} />
        </svg>
        <div className={styles.legend}>
          <span>
            <i className={styles.legendActual} /> Observed
          </span>
          <span>
            <i className={styles.legendForecast} /> Predicted
          </span>
        </div>
      </motion.div>

      {/* Pipeline panel */}
      <motion.div className={`glass ${styles.panel} ${styles.panelPipeline}`} style={layer2} aria-hidden="true">
        <div className={styles.panelHead}>
          <span className={styles.panelLabel}>Data pipeline</span>
          <span className={styles.panelStatus}>
            <span className={styles.statusDot} /> live
          </span>
        </div>
        <ol className={styles.pipeline}>
          {pipeline.map((label, index) => (
            <li key={label} data-state={index < activeStage ? 'done' : index === activeStage ? 'active' : 'idle'}>
              <span className={styles.pipeDot} />
              {label}
            </li>
          ))}
        </ol>
        <div className={styles.pipeTrack}>
          <motion.span
            className={styles.pipeFill}
            animate={{ width: `${((activeStage + 1) / pipeline.length) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* Patterns panel */}
      <motion.div className={`glass ${styles.panel} ${styles.panelBars}`} style={layer3} aria-hidden="true">
        <span className={styles.panelLabel}>Patterns</span>
        <div className={styles.bars}>
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={styles.bar}
              data-hot={i === 5 || undefined}
              initial={{ scaleY: 0.15 }}
              animate={reduceMotion ? { scaleY: h } : { scaleY: [h, h * 0.62, h] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }
              }
            />
          ))}
        </div>
      </motion.div>

      {/* Location chip */}
      <motion.div className={`glass ${styles.chip}`} style={layer2} aria-hidden="true">
        <MapPin size={13} />
        {location}
      </motion.div>
      </motion.div>
    </div>
  );
}
