import { BarChart3, BrainCircuit, Code2, Database, Workflow, Wrench } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import styles from './SkillsBento.module.css';

const icons = { chart: BarChart3, brain: BrainCircuit, code: Code2, database: Database, workflow: Workflow, wrench: Wrench };

// Tile sizes follow priority order: the two primary groups get feature tiles,
// supporting groups get compact tiles, and the toolkit becomes a strip.
const layout = ['xl', 'lg', 'md', 'sm', 'sm', 'strip'];

export default function SkillsBento({ groups }) {
  return (
    <div className={styles.bento}>
      {groups.map((group, index) => {
        const Icon = icons[group.icon] ?? Code2;
        const size = layout[index] ?? 'sm';
        const feature = size === 'xl' || size === 'lg';
        return (
          <Reveal
            key={group.id}
            as="article"
            className={`${feature ? 'glass glass-thick' : 'surface'} ${styles.tile}`}
            data-size={size}
            data-tone={group.tone}
            data-glow={feature ? '' : undefined}
            delay={index * 0.05}
            aria-labelledby={`skills-${group.id}`}
          >
            <header className={styles.head}>
              <span className={styles.icon}>
                <Icon size={feature ? 22 : 18} aria-hidden="true" />
              </span>
              <div className={styles.titles}>
                <h3 id={`skills-${group.id}`} className={styles.title}>
                  {group.title}
                </h3>
                <span className={`label ${styles.tier}`}>{group.tier}</span>
              </div>
              <span className={`numeral ${styles.count}`} aria-hidden="true">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </header>

            {feature && <p className={styles.blurb}>{group.blurb}</p>}

            {feature ? (
              <ul className={styles.rows}>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className={styles.rowName}>{skill.name}</span>
                    <span className={styles.rowNote}>{skill.note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.chips}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.chip} title={skill.note}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
