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
};

export default nextConfig;