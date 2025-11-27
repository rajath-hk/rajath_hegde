// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/HegdeOS' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/HegdeOS/' : '',
};

module.exports = nextConfig;