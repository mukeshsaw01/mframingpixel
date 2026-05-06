import React from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Afacad } from 'next/font/google'

const afacad = Afacad({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  description: 'Official website of Mframingpixels.',
  title: 'Mframingpixels',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={afacad.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
