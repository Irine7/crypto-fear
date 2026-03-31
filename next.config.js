/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, 
  },
  serverExternalPackages: ['node-cron'], 
}

export default nextConfig;