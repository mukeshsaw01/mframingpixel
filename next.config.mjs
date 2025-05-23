import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['images.squarespace-cdn.com', 'localhost'],
  },
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/media/file/**',
    },
  ],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
