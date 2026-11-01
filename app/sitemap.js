import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/site-url';

export default function sitemap() {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: project.domain === 'data-ai' ? 0.8 : 0.6,
    })),
  ];
}
