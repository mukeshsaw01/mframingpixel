'use client'
import React, { useState } from 'react'
import Logo from './Logo'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Architecture & Interior', href: '/architecture' },
  { name: 'Videos', href: '/videos' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="w-full flex items-center justify-between py-8 px-6 md:px-12 bg-white relative">
      <div className="z-20">
        <Logo />
      </div>
      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-10 text-lg font-light">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a href={link.href} className="pb-1 hover:opacity-70">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      {/* Burger Icon for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span
          className={`block w-7 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
        ></span>
      </button>
      {/* Mobile Dropdown */}
      <ul
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-8 text-xl font-light transition-all duration-300 z-30 ${menuOpen ? 'block' : 'hidden'}`}
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="pb-1 hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
