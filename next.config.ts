import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Fotos provisionales de Unsplash, enlazadas y no descargadas, mientras
  // Frank no mande las suyas. Sólo images.unsplash.com.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
    ],
  },
};

export default nextConfig;
