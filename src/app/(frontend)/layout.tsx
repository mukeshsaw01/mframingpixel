import React from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Afacad } from 'next/font/google'

const afacad = Afacad({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
