import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API || 'http://localhost:3000'

type Project = {
  id: string
  images?: { image?: { url?: string }; Alt?: string; orientation?: string }[]
  title?: string
  client?: string
  year?: string
  slug?: string
}

async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/api/people?depth=2&where[archive][not_equals]=true`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`)
    }

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

const PeoplePage = async () => {
  let projects = []
  let error = null

  try {
    projects = await getProjects()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load projects'
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h2>
          <p className="text-gray-600">Check back later for new people projects.</p>
        </div>
      </div>
    )
  }

  const renderProjects = (projects: Project[]) => {
    const rows = []
    for (let i = 0; i < projects.length; i += 2) {
      const first = projects[i]
      const second = projects[i + 1]
      rows.push(
        <div key={`row-${i}`} className="flex gap-8 w-full">
          {[first, second].filter(Boolean).map((project) => {
            const imageObj = project?.images?.[0]
            const imageUrl = imageObj?.image?.url ? `${API_URL}${imageObj.image.url}` : null
            const alt = imageObj?.Alt || project?.title || 'People Image'
            const orientation = imageObj?.orientation || 'landscape'
            const client = project?.client || ''
            const year = project?.year || ''
            const slug = project?.slug
            return (
              <Link
                key={project.id}
                href={`/people/${slug}`}
                className="flex-1 flex flex-col group cursor-pointer"
                prefetch={false}
              >
                <div
                  className={`relative w-full ${orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'} bg-gray-100`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="mt-4 text-base text-black font-normal text-left">
                  {project.title && <span>{project.title}</span>}
                  {client && <span> | {client}</span>}
                  {year && <span> | {year}</span>}
                </div>
              </Link>
            )
          })}
        </div>,
      )
    }
    return rows
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-y-16">{renderProjects(projects)}</div>
      </div>
    </div>
  )
}

export default PeoplePage
