import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section
      className="container"
      style={{
        minHeight: '80vh',
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        gap: 20,
        textAlign: 'center',
        paddingTop: 'var(--nav-offset)',
      }}
    >
      <p className="eyebrow">Error 404</p>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.05em', lineHeight: 0.95 }}>
        No signal <span className="text-gradient">here.</span>
      </h1>
      <p className="muted" style={{ maxWidth: 440 }}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn btn-primary" style={{ marginTop: 8 }}>
        <ArrowLeft size={18} aria-hidden="true" /> Back to home
      </Link>
    </section>
  );
}
