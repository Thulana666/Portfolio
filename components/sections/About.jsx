import Image from 'next/image';
import { Compass, GraduationCap, Building2, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './About.module.css';

const factIcons = [GraduationCap, Compass, Building2];

export default function About({ site, about, photo }) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="01" eyebrow="About me" title="Data-curious. Intelligence-driven." id="about-title" />

        <div className={styles.layout}>
          <Reveal className={styles.aside}>
            <div className={`glass ${styles.photoCard}`}>
              <div className={styles.photoFrame}>
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="(max-width: 860px) 80vw, 360px"
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.monogram} aria-hidden="true">
                    {site.initials}
                  </div>
                )}
              </div>
              <div className={styles.photoMeta}>
                <span className={styles.metaName}>{site.name}</span>
                <span className={styles.metaPlace}>{site.location}</span>
              </div>
            </div>
          </Reveal>

          <div className={styles.body}>
            <Reveal as="p" className={styles.statement}>
              {about.statement}
            </Reveal>

            <Reveal className={styles.copy} delay={0.1}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal as="ul" className={styles.facts} delay={0.15}>
              {about.facts.map((fact, index) => {
                const Icon = factIcons[index % factIcons.length];
                return (
                  <li key={fact.label} className={`glass ${styles.fact}`} data-glow>
                    <span className={styles.factIcon}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <span className={styles.factValue}>{fact.value}</span>
                    <span className={styles.factDetail}>{fact.detail}</span>
                  </li>
                );
              })}
            </Reveal>

            <Reveal className={styles.interests} delay={0.2}>
              <div className={styles.interestGroup}>
                <h3 className={styles.interestTitle}>
                  <Sparkles size={15} aria-hidden="true" /> Currently exploring
                </h3>
                <ul className="tag-list">
                  {about.focus.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {about.personalInterests.length > 0 && (
                <div className={styles.interestGroup}>
                  <h3 className={styles.interestTitle}>Beyond the screen</h3>
                  <ul className="tag-list">
                    {about.personalInterests.map((item) => (
                      <li key={item.label ?? item} className="tag">
                        {item.label ?? item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
