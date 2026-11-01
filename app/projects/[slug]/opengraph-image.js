import { ImageResponse } from 'next/og';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';

export const alt = 'Project case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const accents = { 'data-ai': '#B9F36A', software: '#8B9CFF', automation: '#A78BFA' };

export default async function ProjectOpenGraphImage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const accent = accents[project?.domain] ?? '#B9F36A';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#080B10',
          backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}40, transparent 50%), radial-gradient(circle at 0% 100%, rgba(110,128,255,0.25), transparent 50%)`,
          color: '#F5F7FA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2, display: 'flex' }}>
            THULANA<span style={{ color: '#B9F36A' }}>.DEV</span>
          </div>
          {project?.status === 'in-progress' && (
            <div
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid rgba(185,243,106,0.4)',
                color: '#B9F36A',
                fontSize: 20,
                letterSpacing: 3,
              }}
            >
              IN PROGRESS
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 24, color: accent, letterSpacing: 3, display: 'flex' }}>
            {(project?.category ?? 'Case study').toUpperCase()}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, display: 'flex' }}>
            {project?.title ?? site.name}
          </div>
        </div>

        <div style={{ fontSize: 26, color: '#A1A9B5', display: 'flex' }}>
          Case study · {site.name}
        </div>
      </div>
    ),
    size,
  );
}
