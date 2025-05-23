import React from 'react'
import Logo from '../components/Logo'

const AboutPage = () => {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full overflow-visible">
      {/* Left: Logo */}
      <div className="hidden md:block flex-1 min-w-0 bg-transparent overflow-visible min-h-screen" />
      {/* Fixed Logo Centered in Left Half */}
      <div className="hidden md:block pointer-events-none select-none w-[60vw] h-[60vw] max-w-none max-h-none fixed top-1/2 left-[25vw] -translate-x-1/2 translate-x-[-240px] -translate-y-1/2 z-0">
        <Logo className="w-full h-full text-[12vw] md:text-[12vw]" />
      </div>
      {/* Right: Image and Info */}
      <div className="w-full md:w-[50vw] flex flex-col items-center justify-start p-8 relative z-10">
        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 w-full h-full bg-white/60 backdrop-blur-md border border-white/30 rounded-none z-0 pointer-events-none" />
        <img
          src="https://lzgukookhycbbgxkrawb.supabase.co/storage/v1/object/public/mframingpixel//mukesh.jpg"
          alt="Mukesh Saw"
          className="w-full max-w-md aspect-square object-cover rounded-xl mb-2 z-10"
        />
        <div className="w-full max-w-md text-lg text-gray-700 mt-2 z-10">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p>
            I'm Mukesh Saw, an Interior Designer by education and an Architectural Photographer by
            passion. My journey into photography wasn't sudden—it's something that has quietly
            followed me throughout my creative life. While I pursued a formal education in interior
            design, my camera was never far from reach. It became a tool through which I could frame
            and interpret the world of spaces I was designing.
            <br />
            <br />
            Over time, I realized I didn't have to choose between design and photography. Instead, I
            could bring them together—merging the technical understanding of interior spaces with
            the emotional and visual power of photography. This fusion has shaped my current path:
            capturing architecture and interiors with a sensitivity only a designer can offer. I see
            each space not just as a composition of materials and forms, but as an experience meant
            to be felt, lived, and remembered.
            <br />
            <br />
            In my photography, I aim to highlight the intent behind a space—the way a wall curves
            with purpose, how light spills onto a textured surface, or how a carefully placed object
            completes a room's story. Drawing from my background, I don't just document interiors—I
            interpret them.
            <br />
            <br />
            My work is rooted in curiosity and a desire to create something that's not just cool,
            but meaningful. In a world increasingly driven by aesthetics and algorithms, I strive to
            keep my lens honest, my approach human, and my outcomes original.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
