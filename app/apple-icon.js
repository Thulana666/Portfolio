import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080B10',
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #C9F78A, #8ED64A)',
            color: '#080B10',
            fontSize: 84,
            fontWeight: 800,
          }}
        >
          T
        </div>
      </div>
    ),
    size,
  );
}
