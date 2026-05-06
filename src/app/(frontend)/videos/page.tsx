import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API || 'https://mframingpixel.vercel.app'

type VideoDoc = {
  id: string
  title?: string
  videos?: {
    id?: string
    title?: string
    youtubeURL?: string
  }[]
}

function getYoutubeVideoID(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim()
      return id || null
    }

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id || null
    }
  } catch {
    return null
  }

  return null
}

async function getVideos() {
  const res = await fetch(`${API_URL}/api/videos?where[archive][not_equals]=true&sort=-createdAt`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch videos: ${res.statusText}`)
  }

  const data = await res.json()
  return (data.docs as VideoDoc[]) || []
}

const VideosPage = async () => {
  let videos: VideoDoc[] = []
  let error: string | null = null

  try {
    videos = await getVideos()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load videos'
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Videos</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Videos Found</h2>
          <p className="text-gray-600">Add videos from the admin panel to show them here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((videoDoc) => {
            const firstVideoURL = videoDoc.videos?.[0]?.youtubeURL || ''
            const firstVideoID = getYoutubeVideoID(firstVideoURL)
            const thumbnailURL = firstVideoID ? `https://img.youtube.com/vi/${firstVideoID}/hqdefault.jpg` : null

            return (
              <Link
                key={videoDoc.id}
                href={`/videos/${videoDoc.id}`}
                className="flex flex-col gap-4 group"
                prefetch={false}
              >
                <div className="relative w-full h-[35vh] bg-gray-100 overflow-hidden">
                  {thumbnailURL ? (
                    <Image
                      src={thumbnailURL}
                      alt={videoDoc.title || 'Video collection thumbnail'}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Thumbnail Available
                    </div>
                  )}
                </div>
                {videoDoc.title && <h2 className="text-base sm:text-lg font-medium text-black">{videoDoc.title}</h2>}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VideosPage