/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, 
  },
  serverExternalPackages: ['node-cron'], 
}

module.exports = nextConfig