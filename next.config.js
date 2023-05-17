/** @type {import('next').NextConfig} */

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};
