import type {NextConfig} from 'next';

// This is set in the GitHub Actions workflow
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Add trailing slash to all paths
  trailingSlash: true,
};

export default nextConfig;