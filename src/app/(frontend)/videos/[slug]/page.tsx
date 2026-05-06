import React from 'react'
import { notFound } from 'next/navigation'

const API_URL = (process.env.NEXT_PUBLIC_PAYLOAD_API || 'https://mframingpixel.vercel.app').replace(/\/+$/, '')

type VideoEntry = {
  id?: string
  title?: string
  youtubeURL?: string
}

type VideoCollection = {
  id: string
  title?: string
  videos?: VideoEntry[]
}

function getYoutubeEmbedURL(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim()
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {
    return null
  }

  return null
}

async function getVideoCollectionByID(id: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/videos/${id}?depth=1`,
      {
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch video collection: ${res.statusText}`)
    }

    const data = (await res.json()) as VideoCollection & { archive?: boolean }
    if (data.archive) return null
    return data
  } catch {
    return null
  }
}

interface VideoCollectionPageProps {
  params: Promise<{ slug: string }>
}

const VideoCollectionPage = async ({ params }: VideoCollectionPageProps) => {
  const { slug } = await params
  const collection = await getVideoCollectionByID(slug)

  if (!collection) {
    return notFound()
  }

  const entries = collection.videos || []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {collection.title && <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-10">{collection.title}</h1>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {entries.map((entry) => {
            const embedURL = entry.youtubeURL ? getYoutubeEmbedURL(entry.youtubeURL) : null

            return (
              <div key={entry.id || entry.youtubeURL} className="space-y-3">
                <div className="relative aspect-video bg-black">
                  {embedURL ? (
                    <iframe
                      src={embedURL}
                      title={entry.title || collection.title || 'YouTube Video'}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 px-4 text-center">
                      Invalid YouTube URL in admin entry.
                    </div>
                  )}
                </div>
                {entry.title && <h2 className="text-base sm:text-lg font-medium text-black">{entry.title}</h2>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VideoCollectionPage
