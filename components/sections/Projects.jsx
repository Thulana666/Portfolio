'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/BrandIcons';
import ProjectCover from '@/components/projects/ProjectCover';
import styles from './Projects.module.css';

const toneByDomain = { 'data-ai': 'lime', software: 'blue', automation: 'violet' };

// Editorial rhythm for the grid when showing everything.
const allSpans = [7, 5, 4, 4, 4];

function ProjectLinks({ project }) {
  const { github, demo } = project.links;
  if (!github && !demo) return null;
  return (
    <div className={styles.extLinks}>
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${project.title} on GitHub (opens in a new tab)`}>
          <GitHubIcon size={17} />
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${project.title} live demo (opens in a new tab)`}>
          <ExternalLink size={17} />
        </a>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === 'in-progress') return <span className="badge badge-progress">In progress</span>;
  if (status === 'completed') return <span className="badge badge-neutral">Completed</span>;
  return null;
}

const pad = (n) => String(n).padStart(2, '0');

function Peek() {
  return (
    <span className={`glass glass-thin ${styles.peek}`} aria-hidden="true">
      View case study <ArrowUpRight size={15} />
    </span>
  );
}

function FeaturedCard({ project, number, tilt }) {
  return (
    <article className={`glass glass-thick ${styles.featured}`} data-tone={toneByDomain[project.domain]} data-glow {...tilt}>
      <div className={styles.featuredMedia}>
        <ProjectCover project={project} sizes="(max-width: 980px) 100vw, 640px" className={styles.cover} />
        <span className={`numeral ${styles.featuredNumber}`} aria-hidden="true">
          {pad(number)}
        </span>
        <Peek />
        {project.status === 'in-progress' && (
          <div className={`glass glass-thick ${styles.statusPanel}`} aria-hidden="true">
            <span className={styles.statusKey}>Status</span>
            <span className={styles.statusValue}>
              <span className={styles.statusPulse} /> In progress
            </span>
            <span className={styles.statusNote}>Final-year research</span>
          </div>
        )}
      </div>
      <div className={styles.featuredBody}>
        <div className={styles.metaRow}>
          <span className={`label ${styles.categoryLabel}`}>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className={styles.featuredTitle}>
          <Link href={`/projects/${project.slug}`} className={styles.stretched}>
            {project.title}
          </Link>
        </h3>
        {project.codename && <p className={styles.codename}>{project.codename} · {project.context}</p>}
        <p className={styles.summary}>{project.summary}</p>
        {project.components && (
          <ol className={styles.components}>
            {project.components.map((component, index) => (
              <li key={component}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {component}
              </li>
            ))}
          </ol>
        )}
        <div className={styles.footer}>
          <span className={styles.cta}>
            Read case study <ArrowUpRight size={17} aria-hidden="true" />
          </span>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, span, number, tilt }) {
  const visibleTags = project.tech.slice(0, 4);
  const extra = project.tech.length - visibleTags.length;
  return (
    <article className={`glass ${styles.card}`} data-tone={toneByDomain[project.domain]} data-span={span} data-glow {...tilt}>
      <div className={styles.media}>
        <ProjectCover project={project} sizes="(max-width: 760px) 100vw, 50vw" className={styles.cover} />
        <span className={`label ${styles.mediaLabel}`}>{project.category}</span>
        <Peek />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTop}>
          <p className={styles.context}>{project.context}</p>
          <span className={`numeral ${styles.number}`} aria-hidden="true">
            {pad(number)}
          </span>
        </div>
        <h3 className={styles.title}>
          <Link href={`/projects/${project.slug}`} className={styles.stretched}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies">
          {visibleTags.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
          {extra > 0 && <li className="tag">+{extra}</li>}
        </ul>
        <div className={styles.footer}>
          <span className={styles.cta}>
            Case study <ArrowUpRight size={16} aria-hidden="true" />
          </span>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

// Gentle 3D tilt towards the cursor (mouse only). Values go into CSS
// variables so moving the pointer never re-renders React.
function makeTilt(strength, reduceMotion) {
  if (reduceMotion) return {};
  return {
    onPointerMove(event) {
      if (event.pointerType !== 'mouse') return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--ry', `${(x * strength).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * strength).toFixed(2)}deg`);
    },
    onPointerLeave(event) {
      event.currentTarget.style.setProperty('--rx', '0deg');
      event.currentTarget.style.setProperty('--ry', '0deg');
    },
  };
}

export default function Projects({ projects, filters }) {
  const [filter, setFilter] = useState('all');
  const reduceMotion = useReducedMotion();
  const cardTilt = makeTilt(7, reduceMotion);
  const featuredTilt = makeTilt(2.5, reduceMotion);
  const numberOf = (project) => projects.indexOf(project) + 1;

  const visible = filter === 'all' ? projects : projects.filter((p) => p.domain === filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  const spanFor = (index) => {
    if (filter === 'all') return allSpans[index] ?? 4;
    if (rest.length === 2) return index === 0 ? 7 : 5;
    return 6;
  };

  return (
    <>
      <div className={styles.toolbar}>
        <LayoutGroup id="project-filters">
          <div className={`glass ${styles.filters}`} role="group" aria-label="Filter projects">
            {filters.map((f) => {
              const active = f.id === filter;
              const count = f.id === 'all' ? projects.length : projects.filter((p) => p.domain === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  className={styles.filter}
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className={styles.filterPill}
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={styles.filterLabel}>
                    {f.label}
                    <span className={styles.filterCount}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className={styles.note} aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'} · ordered by relevance to Data &amp; AI
        </p>
      </div>

      <motion.ul layout className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {featured && (
            <motion.li
              key={featured.slug}
              layout
              className={styles.featuredItem}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeaturedCard project={featured} number={numberOf(featured)} tilt={featuredTilt} />
            </motion.li>
          )}
          {rest.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              className={styles.item}
              data-span={spanFor(index)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} span={spanFor(index)} number={numberOf(project)} tilt={cardTilt} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
