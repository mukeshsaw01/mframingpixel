import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API || 'https://mframingpixel.vercel.app'

async function getLatestProject(collection: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/${collection}?depth=2&where[archive][not_equals]=true&sort=-createdAt&limit=1`,
      {
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch ${collection} project: ${res.statusText}`)
    }

    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    return null
  }
}

const Page = async () => {
  const [architectureProject, peopleProject, artProject] = await Promise.all([
    getLatestProject('architecture'),
    getLatestProject('people'),
    getLatestProject('art'),
  ])

  const images = [
    {
      src: architectureProject?.images?.[0]?.image?.url
        ? `${API_URL}${architectureProject.images[0].image.url}`
        : 'https://images.squarespace-cdn.com/content/v1/67986abf2aa154353d4c7088/1738042081732-DHJSTXSCZQ4S6JEUN840/11-min.jpg?format=2500w',
      alt: 'Architecture',
      label: 'Architecture',
      href: '/architecture',
    },
    {
      src: peopleProject?.images?.[0]?.image?.url
        ? `${API_URL}${peopleProject.images[0].image.url}`
        : 'https://images.squarespace-cdn.com/content/v1/67986abf2aa154353d4c7088/1738042081732-DHJSTXSCZQ4S6JEUN840/11-min.jpg?format=2500w',
      alt: 'People',
      label: 'People',
      href: '/people',
    },
    {
      src: artProject?.images?.[0]?.image?.url
        ? `${API_URL}${artProject.images[0].image.url}`
        : 'https://images.squarespace-cdn.com/content/v1/67986abf2aa154353d4c7088/1738042081732-DHJSTXSCZQ4S6JEUN840/11-min.jpg?format=2500w',
      alt: 'Art',
      label: 'Art',
      href: '/art',
    },
  ]

  return (
    <div className="flex flex-col gap-12 py-12 items-center px-4">
      {images.map((img, idx) => (
        <Link key={img.alt} href={img.href} className="w-full flex justify-center">
          <div className="relative w-[90vw] aspect-[4/3] overflow-hidden rounded-lg mx-auto group cursor-pointer">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center grayscale group-hover:grayscale-0 transition duration-300"
              priority={idx === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-5xl font-light"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              {img.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Page
