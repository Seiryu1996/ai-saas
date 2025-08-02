import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
      config.cache = false;
      config.snapshot = {
        managedPaths: [],
        immutablePaths: [],
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: "10mb",
    }
  },
};

export default nextConfig;
