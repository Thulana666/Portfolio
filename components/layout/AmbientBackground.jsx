import styles from './AmbientBackground.module.css';

export default function AmbientBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.blue}`} />
      <div className={`${styles.orb} ${styles.violet}`} />
      <div className={`${styles.orb} ${styles.lime}`} />
      <div className={styles.noise} />
    </div>
  );
}
