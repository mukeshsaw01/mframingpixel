import React from 'react'

const Footer = () => (
  <footer className="w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 px-12 bg-white text-sm font-light mt-12">
    <div className="mb-4 md:mb-0">
      <div>
        <a href="tel:+919960718083" className="hover:underline">
          +91 99607 18083
        </a>
      </div>
      <div>
        <a href="mailto:sawmukesh1111@gmail.com" className="hover:underline">
          sawmukesh1111@gmail.com
        </a>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <a
        href="https://www.instagram.com/mframingpixel_/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-black"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <circle cx="17" cy="7" r="1.5" fill="currentColor" />
        </svg>
      </a>
    </div>
  </footer>
)

export default Footer
