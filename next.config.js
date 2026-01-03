// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Temporarily disable static export for dev server testing
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/HegdeOS' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/HegdeOS/' : '',
};

module.exports = nextConfig;