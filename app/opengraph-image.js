import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
          backgroundImage:
            'radial-gradient(circle at 12% 0%, rgba(110,128,255,0.35), transparent 45%), radial-gradient(circle at 100% 60%, rgba(167,139,250,0.28), transparent 45%), radial-gradient(circle at 40% 120%, rgba(185,243,106,0.18), transparent 50%)',
          color: '#F5F7FA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#B9F36A' }} />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2, display: 'flex' }}>
            THULANA<span style={{ color: '#B9F36A' }}>.DEV</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, display: 'flex', flexDirection: 'column' }}>
            <span>Turning Data Into</span>
            <span style={{ color: '#B9F36A' }}>Intelligence.</span>
          </div>
          <div style={{ fontSize: 30, color: '#A1A9B5', display: 'flex' }}>
            {site.name} · {site.role}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 22, color: '#A1A9B5' }}>
          {['Data Analytics', 'Business Intelligence', 'AI & Machine Learning', site.location].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.16)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
