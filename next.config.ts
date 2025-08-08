import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@fullcalendar/react']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable ESLint in builds
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for production
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
