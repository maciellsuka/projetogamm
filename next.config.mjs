/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 768, 1024, 1440, 1920, 2560],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
