import React from 'react'
import localFont from 'next/font/local'

const chomsky = localFont({
  src: '../fonts/Chomsky.otf',
  display: 'swap',
  variable: '--font-chomsky',
})

const artifact = localFont({
  src: '../fonts/Artifact.otf',
  display: 'swap',
  variable: '--font-artifact',
})

const Logo = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center align-middle ${className}`} style={{ lineHeight: 1 }}>
    <span
      className={`${chomsky.className} leading-none`}
      style={{ color: '#005A3C', fontSize: '2.5em', lineHeight: 1 }}
    >
      M
    </span>
    <span
      className={`${artifact.className} font-normal tracking-tight ml-1`}
      style={{ letterSpacing: '-0.03em', lineHeight: 1, fontSize: '1em' }}
    >
      FRAMINGPIXEL
    </span>
  </span>
)

export default Logo
