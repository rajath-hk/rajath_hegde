import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const basePath = isGithubActions ? '/rajath_hegde' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;