import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Only use static export for GitHub Pages deployment
  ...(isGitHubPages && {
    output: 'export',
    distDir: 'out',
  }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
