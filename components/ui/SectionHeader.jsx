import Reveal from './Reveal';
import styles from './SectionHeader.module.css';

/**
 * Editorial section header: oversized outline numeral, hard-edged label,
 * large headline, and an intro offset into its own column.
 */
export default function SectionHeader({ index, eyebrow, title, intro, id }) {
  return (
    <Reveal className={styles.header} data-has-intro={intro ? '' : undefined}>
      {index && (
        <span className={`numeral ${styles.numeral}`} aria-hidden="true">
          {index}
        </span>
      )}
      <div className={styles.meta}>
        <span className={`label ${styles.label}`}>{eyebrow}</span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
