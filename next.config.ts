import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // AVIF primero (un 20 % más ligero que WebP; Safari del iPhone lo soporta) y
  // WebP para el resto. Tarda más en generarse la primera vez, luego va de caché.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
