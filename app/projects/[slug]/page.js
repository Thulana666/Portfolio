import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Info, ShieldCheck } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/BrandIcons';
import Reveal from '@/components/ui/Reveal';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProject, projects } from '@/data/projects';
import { publicAsset } from '@/lib/assets';
import styles from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.summary,
    },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary },
  };
}

const toneByDomain = { 'data-ai': 'lime', software: 'blue', automation: 'violet' };

function Block({ id, title, children }) {
  return (
    <Reveal as="section" id={id} className={styles.block} aria-labelledby={`${id}-title`} amount={0.1}>
      <h2 id={`${id}-title`} className={styles.blockTitle}>
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

function BulletList({ items }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.label}>
          <Check size={16} aria-hidden="true" />
          <span>
            {typeof item === 'string' ? (
              item
            ) : item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                {item.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              item.label
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy ?? {};
  const screenshots = (cs.screenshots ?? []).filter((shot) => publicAsset(shot.src));
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const inProgress = project.status === 'in-progress';

  // Only sections with content are rendered and listed in the table of contents.
  const sections = [
    { id: 'overview', title: 'Overview', show: Boolean(cs.overview) },
    { id: 'problem', title: 'Problem statement', show: Boolean(cs.problem) },
    { id: 'objectives', title: 'Objectives', show: cs.objectives?.length > 0 },
    { id: 'technologies', title: 'Technologies', show: project.tech?.length > 0 },
    { id: 'data', title: cs.dataSourcesTitle ?? 'Data sources', show: cs.dataSources?.length > 0 },
    { id: 'methodology', title: inProgress ? 'Approach' : 'Methodology', show: cs.methodology?.length > 0 },
    { id: 'architecture', title: cs.architectureTitle ?? 'Architecture', show: cs.architecture?.length > 0 },
    { id: 'implementation', title: cs.implementationTitle ?? 'Implementation', show: cs.implementation?.length > 0 },
    { id: 'progress', title: 'Progress', show: cs.progress?.length > 0 },
    { id: 'results', title: 'Results', show: cs.results?.length > 0 || Boolean(cs.resultsNote) },
    { id: 'challenges', title: cs.challengesTitle ?? 'Challenges', show: cs.challenges?.length > 0 },
    { id: 'screenshots', title: 'Screenshots', show: screenshots.length > 0 },
  ].filter((s) => s.show);

  const titleFor = (id) => sections.find((s) => s.id === id)?.title;
  const has = (id) => sections.some((s) => s.id === id);

  return (
    <article className={styles.page} data-tone={toneByDomain[project.domain]}>
      <header className={`container ${styles.header}`}>
        <Reveal>
          <Link href="/#projects" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
        </Reveal>

        <div className={styles.headerGrid}>
          <Reveal className={styles.headerText} delay={0.05}>
            <div className={styles.metaRow}>
              <span className={styles.category}>{project.category}</span>
              {inProgress && <span className="badge badge-progress">In progress</span>}
              {project.status === 'completed' && <span className="badge badge-neutral">Completed</span>}
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.context}>
              {project.codename ? `${project.codename} · ` : ''}
              {project.context}
            </p>
            <p className={styles.summary}>{project.summary}</p>

            {(project.links.github || project.links.demo) && (
              <div className={styles.links}>
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live demo <ExternalLink size={17} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                    <GitHubIcon size={17} /> View on GitHub
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </Reveal>

          <Reveal className={`glass ${styles.cover}`} delay={0.12}>
            <div className={styles.coverInner}>
              <ProjectCover project={project} sizes="(max-width: 980px) 100vw, 600px" preload />
            </div>
          </Reveal>
        </div>

        {(cs.statusNote || cs.confidentiality) && (
          <Reveal className={styles.notices} delay={0.15}>
            {cs.statusNote && (
              <p className={styles.notice} data-kind="progress">
                <Info size={18} aria-hidden="true" />
                {cs.statusNote}
              </p>
            )}
            {cs.confidentiality && (
              <p className={styles.notice}>
                <ShieldCheck size={18} aria-hidden="true" />
                {cs.confidentiality}
              </p>
            )}
          </Reveal>
        )}
      </header>

      <div className={`container ${styles.bodyGrid}`}>
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ol>
            {sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.content}>
          {has('overview') && (
            <Block id="overview" title={titleFor('overview')}>
              <p className={styles.lead}>{cs.overview}</p>
              {cs.role && <p className={styles.role}>{cs.role}</p>}
              {project.components && (
                <ol className={styles.componentList}>
                  {project.components.map((component, i) => (
                    <li key={component} className="glass">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {component}
                    </li>
                  ))}
                </ol>
              )}
            </Block>
          )}

          {has('problem') && (
            <Block id="problem" title={titleFor('problem')}>
              <p className={styles.text}>{cs.problem}</p>
            </Block>
          )}

          {has('objectives') && (
            <Block id="objectives" title={titleFor('objectives')}>
              <BulletList items={cs.objectives} />
            </Block>
          )}

          {has('technologies') && (
            <Block id="technologies" title={titleFor('technologies')}>
              <ul className="tag-list">
                {project.tech.map((tech) => (
                  <li key={tech} className={`tag ${styles.techTag}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {has('data') && (
            <Block id="data" title={titleFor('data')}>
              <BulletList items={cs.dataSources} />
            </Block>
          )}

          {has('methodology') && (
            <Block id="methodology" title={titleFor('methodology')}>
              <ol className={styles.steps}>
                {cs.methodology.map((step, i) => (
                  <li key={step.title} className="glass" data-glow>
                    <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {has('architecture') && (
            <Block id="architecture" title={titleFor('architecture')}>
              {cs.architectureNote && <p className={styles.caption}>{cs.architectureNote}</p>}
              <ol className={styles.architecture}>
                {cs.architecture.map((layer) => (
                  <li key={layer.layer} className={styles.layer}>
                    <span className={styles.layerName}>{layer.layer}</span>
                    <ul className={styles.layerItems}>
                      {layer.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {has('implementation') && (
            <Block id="implementation" title={titleFor('implementation')}>
              <BulletList items={cs.implementation} />
            </Block>
          )}

          {has('progress') && (
            <Block id="progress" title={titleFor('progress')}>
              <ol className={styles.progress}>
                {cs.progress.map((item) => (
                  <li key={item.label} data-state={item.state}>
                    <span className={styles.progressDot} aria-hidden="true" />
                    {item.label}
                    <span className="sr-only">
                      {item.state === 'done' ? ' (done)' : item.state === 'active' ? ' (in progress)' : ' (next)'}
                    </span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {has('results') && (
            <Block id="results" title={titleFor('results')}>
              {cs.results?.length > 0 ? (
                <BulletList items={cs.results} />
              ) : (
                <p className={styles.placeholder}>{cs.resultsNote}</p>
              )}
            </Block>
          )}

          {has('challenges') && (
            <Block id="challenges" title={titleFor('challenges')}>
              <BulletList items={cs.challenges} />
            </Block>
          )}

          {has('screenshots') && (
            <Block id="screenshots" title={titleFor('screenshots')}>
              <div className={styles.gallery}>
                {screenshots.map((shot) => (
                  <figure key={shot.src} className={`glass ${styles.shot}`}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 980px) 100vw, 760px"
                      className={styles.shotImage}
                    />
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Block>
          )}
        </div>
      </div>

      {next && next.slug !== project.slug && (
        <div className="container">
          <Link href={`/projects/${next.slug}`} className={`glass ${styles.next}`} data-glow>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextTitle}>{next.title}</span>
            <span className={styles.nextCategory}>{next.category}</span>
            <ArrowRight size={28} className={styles.nextArrow} aria-hidden="true" />
          </Link>
        </div>
      )}
    </article>
  );
}
