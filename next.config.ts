/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: { unoptimized: true },  
  trailingSlash: true, // ✅ สำคัญมาก! ป้องกัน 404 ของ _next/static
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ACCESS_PASSWORD: process.env.NEXT_PUBLIC_ACCESS_PASSWORD,
  },
};

module.exports = nextConfig;
