import type {NextConfig} from 'next';
import { basePath as envBasePath } from './src/lib/constants';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: envBasePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Add assetPrefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? envBasePath : '',
};

export default nextConfig;