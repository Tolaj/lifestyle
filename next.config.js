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
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },


  env: {
    SERVER_API: '',
    // SERVER_API:'http://localhost:8081'

  },
}

module.exports = nextConfig
