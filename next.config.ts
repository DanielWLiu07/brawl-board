import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      } 
    ]
  },
  // Disable ESLint during builds to avoid config issues on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checks during builds (optional, remove if you want type checking)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
