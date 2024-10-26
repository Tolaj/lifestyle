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
  env: {
    // SERVER_API: 'https://hashinclude.cloud/',
    SERVER_API:'http://localhost:8081'

  },
}

module.exports = nextConfig
