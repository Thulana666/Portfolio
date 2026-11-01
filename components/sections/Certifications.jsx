import Image from 'next/image';
import { Award, ExternalLink } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Certifications.module.css';

export default function Certifications({ items }) {
  const entries = items.filter((item) => item?.name);
  if (entries.length === 0) return null;

  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="container">
        <SectionHeader index="07" eyebrow="Certifications" title="Verified learning." id="certifications-title" />

        <ul className={styles.grid}>
          {entries.map((cert, index) => (
            <Reveal as="li" key={`${cert.name}-${cert.issuer ?? index}`} delay={index * 0.05}>
              <article className={`glass ${styles.card}`} data-glow>
                {cert.image && (
                  <div className={styles.media}>
                    <Image
                      src={cert.image}
                      alt={`${cert.name} certificate`}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.body}>
                  <span className={styles.icon}>
                    <Award size={18} aria-hidden="true" />
                  </span>
                  <h3 className={styles.name}>{cert.name}</h3>
                  {cert.issuer && <p className={styles.issuer}>{cert.issuer}</p>}
                  {(cert.date || cert.credentialId) && (
                    <dl className={styles.meta}>
                      {cert.date && (
                        <div>
                          <dt>Issued</dt>
                          <dd>{cert.date}</dd>
                        </div>
                      )}
                      {cert.credentialId && (
                        <div>
                          <dt>Credential ID</dt>
                          <dd>{cert.credentialId}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.verify}>
                      Verify credential <ExternalLink size={14} aria-hidden="true" />
                      <span className="sr-only"> for {cert.name} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
