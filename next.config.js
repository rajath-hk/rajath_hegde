// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/rajath_hegde' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/rajath_hegde/' : '',
  eslint: {
    dirs: ['src'], // Only run ESLint on the src directory
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;