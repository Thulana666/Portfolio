import { useId } from 'react';
import styles from './ProjectVisual.module.css';

/*
 * Abstract cover compositions used until real screenshots are added.
 * They are illustrative only and contain no real data.
 */

function Twin({ uid }) {
  const physical = [
    { x: 40, label: 'Supply' },
    { x: 150, label: 'Warehouse' },
    { x: 260, label: 'Transport' },
    { x: 350, label: 'Pharmacy' },
  ];
  return (
    <>
      <defs>
        {/* userSpaceOnUse: a vertical line has a zero-width bounding box */}
        <linearGradient id={`${uid}-sync`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="90" y2="168">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <text x="20" y="34" className={styles.label}>DIGITAL TWIN</text>
      <path d="M40 78 C 95 40, 120 40, 150 78 S 230 116, 260 78 S 320 52, 350 78" className={styles.twinWire} />
      {physical.map((n) => (
        <g key={`v-${n.x}`}>
          <circle cx={n.x} cy="78" r="9" className={styles.twinVirtual} />
          <line x1={n.x} x2={n.x} y1="90" y2="168" stroke={`url(#${uid}-sync)`} className={styles.twinSync} />
        </g>
      ))}
      <path d="M40 186 L150 186 L260 186 L350 186" className={styles.twinPath} />
      <path d="M40 186 L150 186 L260 186 L350 186" className={styles.twinPulse} />
      {physical.map((n, i) => (
        <g key={`p-${n.x}`}>
          <rect x={n.x - 18} y="168" width="36" height="36" rx="10" className={i === 1 ? styles.twinNodeHot : styles.twinNode} />
          <text x={n.x} y="226" textAnchor="middle" className={styles.label}>
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
      <g className={styles.twinBadge}>
        <rect x="282" y="18" width="98" height="26" rx="13" />
        <text x="331" y="35" textAnchor="middle">FORECAST</text>
      </g>
    </>
  );
}

function Dashboard({ uid }) {
  const bars = [52, 74, 60, 88, 70, 96, 82];
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-area`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 122} y="20" width="112" height="54" rx="10" className={styles.tile} />
          <rect x={32 + i * 122} y="34" width="40" height="6" rx="3" className={styles.skeleton} />
          <rect x={32 + i * 122} y="48" width={i === 0 ? 70 : i === 1 ? 54 : 62} height="12" rx="4" className={i === 0 ? styles.skeletonHot : styles.skeletonStrong} />
        </g>
      ))}
      <rect x="20" y="86" width="234" height="154" rx="12" className={styles.tile} />
      <path d="M34 210 C 70 196, 90 176, 120 182 S 170 150, 200 140 S 230 116, 240 112 L240 228 L34 228 Z" fill={`url(#${uid}-area)`} />
      <path d="M34 210 C 70 196, 90 176, 120 182 S 170 150, 200 140 S 230 116, 240 112" className={styles.line} />
      <rect x="264" y="86" width="116" height="74" rx="12" className={styles.tile} />
      <circle cx="322" cy="123" r="22" className={styles.donutTrack} />
      <circle cx="322" cy="123" r="22" className={styles.donut} pathLength="100" />
      <rect x="264" y="168" width="116" height="72" rx="12" className={styles.tile} />
      {bars.map((h, i) => (
        <rect key={i} x={276 + i * 14} y={230 - h * 0.48} width="8" height={h * 0.48} rx="2" className={i === 5 ? styles.barHot : styles.bar} />
      ))}
    </>
  );
}

// Deterministic pseudo-random points so server and client render identically.
function seeded(count, seed, cx, cy, spread) {
  const points = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    points.push([cx + (rand() - 0.5) * spread, cy + (rand() - 0.5) * spread * 0.8]);
  }
  return points;
}

const classA = seeded(18, 7, 120, 150, 150);
const classB = seeded(18, 19, 285, 95, 150);

function Ml() {
  return (
    <>
      <line x1="30" x2="30" y1="24" y2="236" className={styles.axis} />
      <line x1="30" x2="390" y1="236" y2="236" className={styles.axis} />
      <path d="M60 30 C 150 70, 190 170, 380 220" className={styles.boundaryZone} />
      <path d="M60 30 C 150 70, 190 170, 380 220" className={styles.boundary} />
      {classA.map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r="4.5" className={styles.dotA} />
      ))}
      {classB.map(([x, y], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r="4.5" className={styles.dotB} />
      ))}
      <g className={styles.matrix}>
        <rect x="318" y="150" width="30" height="30" rx="5" className={styles.cellHot} />
        <rect x="350" y="150" width="30" height="30" rx="5" className={styles.cell} />
        <rect x="318" y="182" width="30" height="30" rx="5" className={styles.cell} />
        <rect x="350" y="182" width="30" height="30" rx="5" className={styles.cellHot} />
      </g>
    </>
  );
}

function Workflow() {
  const steps = [
    { x: 60, label: 'SUBMIT' },
    { x: 200, label: 'REVIEW' },
    { x: 340, label: 'APPROVE' },
  ];
  return (
    <>
      <path d="M86 70 L174 70 M226 70 L314 70" className={styles.flow} />
      {steps.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x} cy="70" r="26" className={i === 2 ? styles.stepHot : styles.step} />
          <text x={s.x} y="118" textAnchor="middle" className={styles.label}>
            {s.label}
          </text>
        </g>
      ))}
      <path d="M332 70 l6 6 l12 -12" className={styles.check} />
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => (
          <g key={`${col}-${row}`}>
            <rect x={20 + col * 124} y={142 + row * 50} width="112" height="40" rx="10" className={styles.tile} />
            <rect x={32 + col * 124} y={154 + row * 50} width={col === 2 && row === 0 ? 70 : 52} height="6" rx="3" className={col === 2 && row === 0 ? styles.skeletonHot : styles.skeletonStrong} />
            <rect x={32 + col * 124} y={166 + row * 50} width="34" height="5" rx="2.5" className={styles.skeleton} />
          </g>
        )),
      )}
    </>
  );
}

function Platform() {
  return (
    <>
      <rect x="20" y="20" width="70" height="220" rx="12" className={styles.tile} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="34" y={42 + i * 26} width={i === 1 ? 42 : 34} height="8" rx="4" className={i === 1 ? styles.skeletonHot : styles.skeleton} />
      ))}
      <rect x="100" y="20" width="170" height="120" rx="12" className={styles.tile} />
      {Array.from({ length: 15 }, (_, i) => (
        <rect
          key={i}
          x={112 + (i % 5) * 31}
          y={34 + Math.floor(i / 5) * 32}
          width="25"
          height="25"
          rx="6"
          className={i === 7 ? styles.cellHot : i === 11 || i === 3 ? styles.cellViolet : styles.cell}
        />
      ))}
      <rect x="100" y="150" width="170" height="90" rx="12" className={styles.tile} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="118" cy={174 + i * 24} r="6" className={i === 0 ? styles.checkDone : styles.checkOpen} />
          <rect x="132" y={171 + i * 24} width={[96, 70, 84][i]} height="6" rx="3" className={styles.skeletonStrong} />
        </g>
      ))}
      <rect x="280" y="20" width="100" height="220" rx="12" className={styles.tile} />
      <rect x="292" y="40" width="64" height="24" rx="12" className={styles.bubble} />
      <rect x="304" y="74" width="64" height="24" rx="12" className={styles.bubbleMine} />
      <rect x="292" y="108" width="52" height="24" rx="12" className={styles.bubble} />
      <rect x="292" y="206" width="76" height="22" rx="11" className={styles.skeleton} />
    </>
  );
}

function Automation() {
  return (
    <>
      <path d="M92 92 L168 92" className={styles.flow} />
      <path d="M232 92 L308 92" className={styles.flow} />
      <g>
        <rect x="36" y="64" width="56" height="56" rx="12" className={styles.stepBox} />
        <path d="M48 82 L64 74 L80 82 L80 102 L64 110 L48 102 Z M48 82 L64 90 L80 82 M64 90 L64 110" className={styles.glyph} />
      </g>
      <g>
        <rect x="168" y="64" width="64" height="56" rx="12" className={styles.stepBox} />
        <path d="M184 92 h12 l6 -10 l8 20 l6 -10 h6" className={styles.glyph} />
      </g>
      <g>
        <rect x="308" y="64" width="56" height="56" rx="12" className={styles.stepBoxHot} />
        <path d="M326 100 h20 l-3 -4 v-8 a7 7 0 0 0 -14 0 v8 Z M332 104 a4 4 0 0 0 8 0" className={styles.glyphHot} />
      </g>
      <text x="64" y="142" textAnchor="middle" className={styles.label}>INBOUND</text>
      <text x="200" y="142" textAnchor="middle" className={styles.label}>FLOW</text>
      <text x="336" y="142" textAnchor="middle" className={styles.label}>NOTIFY</text>
      <path d="M336 160 L336 186 L200 186" className={styles.escalate} />
      <rect x="120" y="172" width="160" height="56" rx="12" className={styles.tile} />
      <rect x="134" y="186" width="70" height="6" rx="3" className={styles.skeletonViolet} />
      <rect x="134" y="200" width="110" height="6" rx="3" className={styles.skeleton} />
      <rect x="134" y="212" width="80" height="5" rx="2.5" className={styles.skeleton} />
      <text x="200" y="250" textAnchor="middle" className={styles.label}>ESCALATION</text>
    </>
  );
}

const visuals = {
  twin: Twin,
  dashboard: Dashboard,
  ml: Ml,
  workflow: Workflow,
  platform: Platform,
  automation: Automation,
};

const tones = { twin: 'lime', dashboard: 'lime', ml: 'violet', workflow: 'blue', platform: 'blue', automation: 'violet' };

export default function ProjectVisual({ type, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const Visual = visuals[type] ?? Dashboard;
  return (
    <div className={`${styles.frame} ${className}`} data-tone={tones[type] ?? 'lime'}>
      <svg viewBox="0 0 400 260" className={styles.svg} aria-hidden="true" focusable="false">
        <Visual uid={uid} />
      </svg>
    </div>
  );
}
