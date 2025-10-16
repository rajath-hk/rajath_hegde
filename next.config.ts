import type {NextConfig} from 'next';

// This is set in the GitHub Actions workflow
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true, // Important for GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  // Add assetPrefix for proper asset loading on GitHub Pages
  assetPrefix: basePath || undefined,
};

export default nextConfig;