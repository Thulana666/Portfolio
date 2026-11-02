import { site } from '@/data/site';

// Canonical address for metadata, Open Graph and the sitemap.
// NEXT_PUBLIC_SITE_URL (e.g. a custom domain) wins, then `site.url`.
// Vercel's own production URL is only a fallback: it picks the project's
// generated *.vercel.app name rather than a chosen subdomain.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (site.url) return site.url.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();
