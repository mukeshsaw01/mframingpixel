import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['images.squarespace-cdn.com', 'localhost', 'lzgukookhycbbgxkrawb.supabase.co'],
  },
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
      hostname: process.env.VERCEL_URL || 'your-vercel-domain.vercel.app',
      pathname: '/api/media/file/**',
    },
  ],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
