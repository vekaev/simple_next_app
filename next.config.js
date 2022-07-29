/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
  },
};

module.exports = nextConfig;
