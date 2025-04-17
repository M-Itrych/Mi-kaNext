import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Disable TypeScript type checking
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint checking
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // This ensures image files in /news/ are served as static files
        {
          source: '/news/:path*.jpg',
          destination: '/news/:path*.jpg',
        },
        {
          source: '/news/:path*.png',
          destination: '/news/:path*.png',
        },
        {
          source: '/news/:path*.jpeg',
          destination: '/news/:path*.jpeg',
        },
        {
          source: '/news/:path*.gif',
          destination: '/news/:path*.gif',
        },
      ],
    };
  }
};

export default nextConfig;
