import styles from './ExpertiseVisual.module.css';

function Analytics() {
  const bars = [38, 54, 46, 70, 62, 84, 76, 96];
  return (
    <svg viewBox="0 0 320 150" className={styles.svg} aria-hidden="true">
      <defs>
        <linearGradient id="ev-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 70, 110].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} className={styles.grid} />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={14 + i * 38}
          y={140 - h}
          width="18"
          height={h}
          rx="4"
          className={styles.bar}
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      <path d="M4 112 C 40 104, 60 92, 92 96 S 150 70, 180 66 S 240 40, 270 30 L316 18 L316 150 L4 150 Z" fill="url(#ev-area)" />
      <path d="M4 112 C 40 104, 60 92, 92 96 S 150 70, 180 66 S 240 40, 270 30 L316 18" className={styles.trend} />
      <circle cx="316" cy="18" r="4" className={styles.trendDot} />
    </svg>
  );
}

function Intelligence() {
  const layers = [
    [30, 75, 120],
    [20, 56, 94, 130],
    [20, 56, 94, 130],
    [52, 98],
  ];
  const xs = [30, 120, 210, 296];
  const edges = [];
  layers.forEach((layer, li) => {
    if (li === layers.length - 1) return;
    layer.forEach((y1) => layers[li + 1].forEach((y2) => edges.push([xs[li], y1, xs[li + 1], y2])));
  });
  return (
    <svg viewBox="0 0 320 150" className={styles.svg} aria-hidden="true">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={i % 7 === 0 ? styles.edgeActive : styles.edge} />
      ))}
      {layers.map((layer, li) =>
        layer.map((y, ni) => (
          <circle
            key={`${li}-${ni}`}
            cx={xs[li]}
            cy={y}
            r={li === layers.length - 1 ? 8 : 6}
            className={li === layers.length - 1 && ni === 0 ? styles.nodeHot : styles.node}
          />
        )),
      )}
    </svg>
  );
}

function Engineering() {
  const lines = [
    [0, 64],
    [1, 120],
    [2, 90],
    [2, 140],
    [1, 70],
    [0, 40],
  ];
  return (
    <svg viewBox="0 0 320 150" className={styles.svg} aria-hidden="true">
      <rect x="1" y="1" width="318" height="148" rx="14" className={styles.window} />
      {[18, 32, 46].map((cx) => (
        <circle key={cx} cx={cx} cy="18" r="4" className={styles.windowDot} />
      ))}
      {lines.map(([indent, w], i) => (
        <g key={i}>
          <text x="14" y={52 + i * 16} className={styles.lineNo}>
            {i + 1}
          </text>
          <rect x={36 + indent * 18} y={45 + i * 16} width={w} height="7" rx="3.5" className={i === 3 ? styles.codeHot : styles.code} />
        </g>
      ))}
    </svg>
  );
}

const visuals = { analytics: Analytics, intelligence: Intelligence, engineering: Engineering };

export default function ExpertiseVisual({ type }) {
  const Visual = visuals[type] ?? Analytics;
  return <Visual />;
}
