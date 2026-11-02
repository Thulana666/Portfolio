import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ExpertiseVisual from './ExpertiseVisual';
import styles from './Expertise.module.css';

export default function Expertise({ items }) {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Areas of expertise"
          title="Analytics and AI first, engineered to work."
          intro="My work is centred on data and intelligent systems. Software engineering is the supporting strength that turns those ideas into working products."
          id="expertise-title"
        />

        <div className={styles.grid}>
          {items.map((item, index) => {
            const primary = item.level === 'Primary focus';
            return (
              <Reveal
                key={item.title}
                as="article"
                delay={index * 0.08}
                className={`${primary ? `glass glass-thick ${styles.primary}` : `surface ${styles.secondary}`} ${styles.card}`}
                data-tone={item.tone}
                data-glow={primary ? '' : undefined}
              >
                <div className={styles.head}>
                  <span className={styles.priority}>{item.priority}</span>
                  <span className={`label ${styles.level}`}>{item.level}</span>
                </div>

                <div className={styles.visual}>
                  <ExpertiseVisual type={item.visual} />
                </div>

                <div className={styles.text}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <ul className={`tag-list ${styles.tags}`} aria-label={`${item.title} technologies`}>
                  {item.technologies.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
