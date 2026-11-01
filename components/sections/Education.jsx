import Image from 'next/image';
import { CalendarDays, MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Education.module.css';

function DetailList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className={styles.detail}>
      <h4 className={styles.detailTitle}>{title}</h4>
      <ul className="tag-list">
        {items.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education({ items }) {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeader index="06" eyebrow="Education" title="Foundations that shaped the path." id="education-title" />

        <ol className={styles.timeline}>
          {items.map((entry, index) => (
            <Reveal as="li" key={entry.institution} className={styles.item} delay={index * 0.08}>
              <span className={styles.node} aria-hidden="true" data-current={index === 0 || undefined} />
              <article className={`glass ${styles.card}`} data-glow data-current={index === 0 || undefined}>
                <span className={styles.watermark} aria-hidden="true">
                  {entry.monogram}
                </span>

                <div className={styles.head}>
                  <div className={styles.emblem}>
                    {entry.logo ? (
                      <Image src={entry.logo} alt={`${entry.shortName} logo`} width={56} height={56} className={styles.logo} />
                    ) : (
                      <span aria-hidden="true">{entry.monogram}</span>
                    )}
                  </div>
                  {entry.status && <span className="badge badge-progress">{entry.status}</span>}
                </div>

                <h3 className={styles.institution}>{entry.institution}</h3>
                <p className={styles.qualification}>{entry.qualification}</p>

                <ul className={styles.meta}>
                  <li>
                    <MapPin size={15} aria-hidden="true" />
                    {entry.location}
                  </li>
                  {entry.period && (
                    <li>
                      <CalendarDays size={15} aria-hidden="true" />
                      {entry.period}
                    </li>
                  )}
                </ul>

                <DetailList title="Relevant coursework" items={entry.coursework} />
                <DetailList title="Examinations" items={entry.examinations} />
                <DetailList title="Achievements" items={entry.achievements} />
                <DetailList title="Activities" items={entry.activities} />
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
