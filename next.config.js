/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting:true,
  // disable: process.env.NODE_ENV === 'development',
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})


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


module.exports = withPWA(nextConfig)

