import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed: output: "export" — migrating to Vercel which supports full Next.js
  // This unlocks SSR, API routes, server components, and fixes Leaflet map loading
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
