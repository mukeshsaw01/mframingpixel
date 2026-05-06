import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  turbopack: {},
  images: {
    domains: [
      'images.squarespace-cdn.com',
      'localhost',
      'lzgukookhycbbgxkrawb.supabase.co',
      'mframingpixel.vercel.app',
      'img.youtube.com',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'lzgukookhycbbgxkrawb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'mframingpixel.vercel.app',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: process.env.VERCEL_URL || 'mframingpixel.vercel.app',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
}

const payloadNextConfig = withPayload(nextConfig, { devBundleServerPackages: false })

if (payloadNextConfig.experimental?.turbo) {
  payloadNextConfig.turbopack = {
    ...(payloadNextConfig.turbopack || {}),
    ...payloadNextConfig.experimental.turbo,
  }
  delete payloadNextConfig.experimental.turbo
}

export default payloadNextConfig
