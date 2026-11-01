// Global styles first so component CSS Modules can override the shared primitives.
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import AmbientBackground from '@/components/layout/AmbientBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/layout/Providers';
import { navLinks, site } from '@/data/site';
import { publicAsset } from '@/lib/assets';
import { siteUrl } from '@/lib/site-url';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s · ${site.brand}`,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080B10' },
    { media: '(prefers-color-scheme: light)', color: '#F3F5F8' },
  ],
  colorScheme: 'dark light',
};

// Runs before paint so the saved theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: siteUrl,
  jobTitle: site.role,
  description: site.introduction,
  address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sri Lanka Institute of Information Technology' },
  knowsAbout: ['Data Analytics', 'Business Intelligence', 'Artificial Intelligence', 'Machine Learning', 'Software Development'],
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function RootLayout({ children }) {
  const cvHref = publicAsset(site.cv);

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript, reveal animations never run — keep content visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <Providers>
          <Navbar brand={site.brand} links={navLinks} cvHref={cvHref} />
          <main id="main">{children}</main>
          <Footer site={site} links={navLinks} />
        </Providers>
      </body>
    </html>
  );
}
