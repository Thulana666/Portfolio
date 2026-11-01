import Reveal from './Reveal';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ index, eyebrow, title, intro, align = 'left', id }) {
  return (
    <Reveal className={styles.header} data-align={align}>
      <div className={styles.meta}>
        {index && <span className={styles.index}>{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
