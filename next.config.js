/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
}

module.exports = nextConfig
