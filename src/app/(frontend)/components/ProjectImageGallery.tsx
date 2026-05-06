'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type ImageObj = {
  image?: { url?: string }
  Alt?: string
  orientation?: string
}

type ProjectImageGalleryProps = {
  images: ImageObj[]
  projectTitle?: string
  apiUrl: string
}

const ProjectImageGallery = ({ images, projectTitle = 'Project', apiUrl }: ProjectImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const normalizedImages = useMemo(
    () =>
      images.map((imgObj, i) => {
        const imageUrl = imgObj?.image?.url ? `${apiUrl}${imgObj.image.url}` : null
        const alt = imgObj?.Alt || projectTitle || `Project Image ${i + 1}`
        const orientation = imgObj?.orientation || 'landscape'
        return { imageUrl, alt, orientation }
      }),
    [images, projectTitle, apiUrl],
  )

  const validImageIndexes = useMemo(
    () => normalizedImages.map((item, index) => (item.imageUrl ? index : -1)).filter((index) => index !== -1),
    [normalizedImages],
  )

  const goToNext = () => {
    if (selectedIndex === null || validImageIndexes.length === 0) return
    const currentPos = validImageIndexes.indexOf(selectedIndex)
    if (currentPos === -1) return
    const nextPos = (currentPos + 1) % validImageIndexes.length
    setSelectedIndex(validImageIndexes[nextPos])
  }

  const goToPrevious = () => {
    if (selectedIndex === null || validImageIndexes.length === 0) return
    const currentPos = validImageIndexes.indexOf(selectedIndex)
    if (currentPos === -1) return
    const prevPos = (currentPos - 1 + validImageIndexes.length) % validImageIndexes.length
    setSelectedIndex(validImageIndexes[prevPos])
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (selectedIndex !== null && event.key === 'ArrowRight') goToNext()
      if (selectedIndex !== null && event.key === 'ArrowLeft') goToPrevious()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedIndex, validImageIndexes])

  const renderImages = () => {
    const rows = []
    for (let i = 0; i < normalizedImages.length; i += 2) {
      const first = normalizedImages[i]
      const second = normalizedImages[i + 1]

      rows.push(
        <div key={`row-${i}`} className="flex gap-8 w-full">
          {[first, second].filter(Boolean).map((item, idx) => {
            const imageIndex = i + idx
            return (
              <button
                key={imageIndex}
                type="button"
                onClick={() => item?.imageUrl && setSelectedIndex(imageIndex)}
                className="flex-1 relative w-full h-[80vh] bg-gray-100 cursor-zoom-in"
              >
                {item?.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={imageIndex === 0}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </button>
            )
          })}
        </div>,
      )
    }

    return rows
  }

  const selectedImage = selectedIndex !== null ? normalizedImages[selectedIndex] : null

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-y-16">{renderImages()}</div>
      </div>

      {selectedImage?.imageUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl leading-none"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <div className="relative w-[96vw] h-[96vh]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white text-4xl leading-none z-10"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <Image src={selectedImage.imageUrl} alt={selectedImage.alt} fill className="object-contain" sizes="100vw" />
            <button
              type="button"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white text-4xl leading-none z-10"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectImageGallery
