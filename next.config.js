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
};

module.exports = nextConfig;