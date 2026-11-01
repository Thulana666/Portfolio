'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Code2, Database, Workflow, Wrench } from 'lucide-react';
import styles from './SkillsExplorer.module.css';

const icons = { chart: BarChart3, brain: BrainCircuit, code: Code2, database: Database, workflow: Workflow, wrench: Wrench };

export default function SkillsExplorer({ groups }) {
  const [activeId, setActiveId] = useState(groups[0].id);
  const tabRefs = useRef([]);
  const active = groups.find((g) => g.id === activeId) ?? groups[0];
  const ActiveIcon = icons[active.icon] ?? Code2;

  // Roving focus for the tab list (arrow keys, Home, End).
  const onKeyDown = (event, index) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (index + keys[event.key] + groups.length) % groups.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = groups.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveId(groups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Skill categories" aria-orientation="vertical">
        {groups.map((group, index) => {
          const Icon = icons[group.icon] ?? Code2;
          const selected = group.id === activeId;
          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`skill-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`skill-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              data-tone={group.tone}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {selected && (
                <motion.span
                  layoutId="skill-tab"
                  className={styles.tabActive}
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <span className={styles.tabIcon}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className={styles.tabText}>
                <span className={styles.tabTitle}>{group.title}</span>
                <span className={styles.tabTier}>{group.tier}</span>
              </span>
              <span className={styles.tabCount}>{String(group.skills.length).padStart(2, '0')}</span>
            </button>
          );
        })}
      </div>

      <div
        className={`glass ${styles.panel}`}
        role="tabpanel"
        id={`skill-panel-${active.id}`}
        aria-labelledby={`skill-tab-${active.id}`}
        data-tone={active.tone}
        data-glow
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.panelHead}>
              <span className={styles.panelIcon}>
                <ActiveIcon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className={styles.panelTitle}>{active.title}</h3>
                <p className={styles.panelBlurb}>{active.blurb}</p>
              </div>
              <span className={styles.panelTier}>{active.tier}</span>
            </div>

            <ul className={styles.skills}>
              {active.skills.map((skill, index) => (
                <motion.li
                  key={skill.name}
                  className={styles.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.35 }}
                >
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillNote}>{skill.note}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
