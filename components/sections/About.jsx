import Image from 'next/image';
import { Building2, Compass, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './About.module.css';

const factIcons = [GraduationCap, Compass, Building2];
const factTones = ['lime', 'violet', 'blue'];

export default function About({ site, about, photo }) {
  const hasBeyond = about.personalInterests.length > 0;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="01" eyebrow="About me" title="Data-curious. Intelligence-driven." id="about-title" />

        <div className={styles.bento}>
          {/* Portrait: tall feature tile */}
          <Reveal className={`glass glass-thick ${styles.photoCard}`}>
            <div className={styles.photoFrame}>
              {photo ? (
                <Image
                  src={photo}
                  alt={`Portrait of ${site.name}`}
                  fill
                  quality={90}
                  sizes="(max-width: 760px) 90vw, (max-width: 1080px) 40vw, 380px"
                  className={styles.photo}
                />
              ) : (
                <div className={styles.monogram} aria-hidden="true">
                  {site.initials}
                </div>
              )}
              <span className={`glass glass-thin ${styles.photoChip}`}>
                <MapPin size={13} aria-hidden="true" />
                {site.location}
              </span>
            </div>
            <div className={styles.photoMeta}>
              <span className={styles.metaName}>{site.name}</span>
              <span className={styles.metaRole}>{site.role}</span>
            </div>
          </Reveal>

          {/* Story: solid surface for long-form reading */}
          <Reveal className={`surface ${styles.story}`} delay={0.05}>
            <p className={styles.statement}>{about.statement}</p>
            <div className={styles.copy}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* Facts: three compact tiles of different widths */}
          {about.facts.map((fact, index) => {
            const Icon = factIcons[index % factIcons.length];
            return (
              <Reveal
                key={fact.label}
                className={`glass ${styles.fact}`}
                data-slot={index}
                data-tone={factTones[index % factTones.length]}
                data-glow
                delay={0.08 + index * 0.05}
              >
                <span className={styles.factHead}>
                  <span className={styles.factIcon}>
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className={styles.factLabel}>{fact.label}</span>
                </span>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factDetail}>{fact.detail}</span>
              </Reveal>
            );
          })}

          {/* Interests */}
          <Reveal className={`surface ${styles.exploring}`} data-wide={hasBeyond ? undefined : ''} delay={0.1}>
            <h3 className={styles.panelTitle}>
              <Sparkles size={15} aria-hidden="true" /> Currently exploring
            </h3>
            <ul className={styles.focusList}>
              {about.focus.map((item, index) => (
                <li key={item}>
                  <span className={styles.focusIndex}>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {hasBeyond && (
            <Reveal className={`glass ${styles.beyondCard}`} data-glow delay={0.14}>
              <h3 className={styles.panelTitle}>Beyond the screen</h3>
              <ul className={styles.beyond}>
                {about.personalInterests.map((item) => {
                  const label = item.label ?? item;
                  return (
                    <li key={label}>
                      <span className={styles.beyondLabel}>{label}</span>
                      {item.detail && <span className={styles.beyondDetail}>{item.detail}</span>}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
