import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Thumbnails may come from many hosts; disable optimization to avoid domain config
    unoptimized: true,
  },
};

export default nextConfig;
