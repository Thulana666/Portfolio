import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Building2, Check, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectVisual from '@/components/projects/ProjectVisual';
import styles from './Experience.module.css';

const toneByDomain = { 'data-ai': 'lime', software: 'blue', automation: 'violet' };

export default function Experience({ items }) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Professional experience"
          title="Where data met the real world."
          id="experience-title"
        />

        {items.map((job) => (
          <div key={job.company} className={styles.job}>
            <Reveal className={styles.aside}>
              <div className={styles.companyCard}>
                {job.logo ? (
                  <span className={styles.logoPlate}>
                    <Image
                      src={job.logo.src}
                      alt={job.logo.alt}
                      width={job.logo.width}
                      height={job.logo.height}
                      sizes="280px"
                      className={styles.logo}
                    />
                  </span>
                ) : (
                  <span className={styles.companyIcon}>
                    <Building2 size={20} aria-hidden="true" />
                  </span>
                )}
                <span className="badge badge-neutral">{job.type}</span>
                <h3 className={styles.company}>{job.company}</h3>
                <p className={styles.group}>{job.group}</p>
                <dl className={styles.details}>
                  <div>
                    <dt>Role</dt>
                    <dd>{job.role}</dd>
                  </div>
                  {job.period && (
                    <div>
                      <dt>Period</dt>
                      <dd>{job.period}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt>Location</dt>
                      <dd>{job.location}</dd>
                    </div>
                  )}
                </dl>
                <p className={styles.summary}>{job.summary}</p>
                <p className={styles.note}>
                  <ShieldCheck size={15} aria-hidden="true" />
                  {job.confidentiality}
                </p>
              </div>
            </Reveal>

            <ol className={styles.timeline}>
              {job.contributions.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.id}
                  delay={index * 0.06}
                  className={`${styles.entry} ${item.featured ? styles.featured : ''}`}
                  data-tone={toneByDomain[item.domain]}
                >
                  <span className={styles.marker} aria-hidden="true">
                    {item.id}
                  </span>
                  <article className={`glass ${styles.card}`} data-glow>
                    <div className={styles.cardBody}>
                      <p className={styles.category}>{item.category}</p>
                      <h4 className={styles.title}>{item.title}</h4>
                      <p className={styles.description}>{item.description}</p>
                      <ul className={styles.highlights} aria-label="Contributions">
                        {item.highlights.map((point) => (
                          <li key={point}>
                            <Check size={15} aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <ul className="tag-list" aria-label="Technologies">
                        {item.technologies.map((tech) => (
                          <li key={tech} className="tag">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      {item.projectSlug && (
                        <Link href={`/projects/${item.projectSlug}`} className={styles.caseLink}>
                          Read case study
                          <ArrowUpRight size={16} aria-hidden="true" />
                          <span className="sr-only">: {item.title}</span>
                        </Link>
                      )}
                    </div>
                    {item.featured && (
                      <div className={styles.cardVisual}>
                        <ProjectVisual type="dashboard" />
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
