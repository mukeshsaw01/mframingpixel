import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API || 'http://localhost:3000'

type ImageObj = {
  image?: { url?: string }
  Alt?: string
  orientation?: string
}

async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/people?where[slug][equals]=${slug}&where[archive][not_equals]=true&depth=2`,
      {
        cache: 'no-store',
      },
    )
    if (!res.ok) throw new Error('Failed to fetch project')
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (_error) {
    return null
  }
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return notFound()

  const images = project.images || []
  const client = project.client || ''
  const type = project.type || ''
  const year = project.year || ''

  const renderImages = (images: ImageObj[], projectTitle: string) => {
    const rows = []
    let i = 0
    while (i < images.length) {
      const curr = images[i]
      const next = images[i + 1]
      const currOrientation = curr?.orientation || 'landscape'
      const nextOrientation = next?.orientation || 'landscape'

      // If two consecutive portraits, render them in a row
      if (currOrientation === 'portrait' && nextOrientation === 'portrait') {
        rows.push(
          <div key={`row-${i}`} className="flex justify-center w-full">
            <div className="flex justify-center gap-8 w-[90vw] mx-auto">
              {[curr, next].map((imgObj, idx: number) => {
                const imageUrl = imgObj?.image?.url ? `${API_URL}${imgObj.image.url}` : null
                const alt = imgObj?.Alt || projectTitle || `Project Image ${i + idx + 1}`
                return (
                  <div key={idx} className="flex-1 relative aspect-[3/4] bg-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i + idx === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>,
        )
        i += 2
      } else {
        // Render single (landscape or single portrait)
        const imgObj = images[i]
        const imageUrl = imgObj?.image?.url ? `${API_URL}${imgObj.image.url}` : null
        const alt = imgObj?.Alt || projectTitle || `Project Image ${i + 1}`
        const orientation = imgObj?.orientation || 'landscape'
        rows.push(
          <div key={i} className="flex justify-center w-full">
            <div
              className={`relative bg-gray-100 w-[90vw] mx-auto ${orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'}`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={alt}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={i === 0}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
          </div>,
        )
        i += 1
      }
    }
    return rows
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold text-center mb-2">{project.title}</h1>
        <div className="text-center text-lg text-black mb-8">
          {client && <span>{client}</span>}
          {type && <span> | {type}</span>}
          {year && <span> | {year}</span>}
        </div>
        {project.description && (
          <div className="text-center text-base text-gray-700 mb-8 max-w-2xl mx-auto">
            {project.description}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-12 items-center mt-8">
        {renderImages(images, project.title)}
      </div>
    </div>
  )
}

export default ProjectPage
