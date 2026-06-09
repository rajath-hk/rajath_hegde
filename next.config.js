// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/HegdeOS' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/HegdeOS/' : '',
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
