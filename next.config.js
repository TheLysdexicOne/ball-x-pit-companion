/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
  basePath: '/ball-x-pit-companion',
  assetPrefix: '/ball-x-pit-companion/',
};

module.exports = nextConfig;
