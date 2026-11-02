import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this folder (a parent folder has its own lockfile).
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // 90 is used for the portrait, where compression is most visible.
    qualities: [75, 90],
  },
};

export default nextConfig;
