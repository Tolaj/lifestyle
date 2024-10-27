/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //  redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth/login',
  //       permanent: true,
  //     },
  //   ]
  // },

  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //     layers: true, // Enable the layers experiment
  //   };
  //   return config;
  // },

  env: {
    SERVER_API: '',
    // SERVER_API:'http://localhost:8081'

  },
}

module.exports = nextConfig
