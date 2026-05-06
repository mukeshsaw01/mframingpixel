import React from 'react'
import { notFound } from 'next/navigation'
import ProjectImageGallery from '../../components/ProjectImageGallery'

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API || 'https://mframingpixel.vercel.app'

async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/art?where[slug][equals]=${slug}&where[archive][not_equals]=true&depth=2`,
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
      <ProjectImageGallery images={images} projectTitle={project.title} apiUrl={API_URL} />
    </div>
  )
}

export default ProjectPage
