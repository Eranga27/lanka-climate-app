import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lanka-climate-app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
