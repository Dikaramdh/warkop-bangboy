import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    remotePatterns: [
       {
      protocol: 'https',
      hostname: 'example.com',
    },
    ]
  },
  typescript: {
    // Ignore TypeScript errors during build (use with caution)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
