import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  assetPrefix: '/home',
  basePath: '/home',
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['shared'],
};

export default nextConfig;
