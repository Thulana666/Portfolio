import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');

/**
 * Returns the path if the file exists inside /public, otherwise null.
 * Server-only: lets optional assets (photo, CV, screenshots) be dropped in
 * without code changes, and avoids broken links when they are missing.
 */
export function publicAsset(assetPath) {
  if (!assetPath) return null;
  try {
    return fs.existsSync(path.join(publicDir, assetPath)) ? assetPath : null;
  } catch {
    return null;
  }
}
