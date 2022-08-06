/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING || false,
  },
};

module.exports = nextConfig;
