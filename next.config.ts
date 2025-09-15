import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  assetPrefix: '/home',
  basePath: '/home',
  experimental: {
    externalDir: true,
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      shared: path.resolve(__dirname, '../shared'),
    },
  },
  transpilePackages: ['shared'],
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      shared: path.resolve(__dirname, '../shared'),
    };
    return config;
  },
};

export default nextConfig;
