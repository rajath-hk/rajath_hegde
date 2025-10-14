// 从环境变量中读取 basePath，提供空字符串作为默认值
export const basePath = process.env.BASE_PATH || '';
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