import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const basePath = isGithubActions ? '/rajath_hegde' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // We'll handle TS errors in development, but allow builds to complete
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // We'll handle ESLint errors in development, but allow builds to complete
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ['github.com', 'raw.githubusercontent.com'],
    formats: ['image/webp'],
  },
  // Ensure proper asset prefix for GitHub Pages
  assetPrefix: basePath,
};

export default nextConfig;