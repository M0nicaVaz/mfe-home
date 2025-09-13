import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  assetPrefix: '/home',
  basePath: '/home',
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
