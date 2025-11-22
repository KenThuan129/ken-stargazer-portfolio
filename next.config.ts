import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Only use static export for GitHub Pages deployment
  ...(isGitHubPages && {
    output: 'export',
    distDir: 'out',
    ...(basePath && { basePath }),
  }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
