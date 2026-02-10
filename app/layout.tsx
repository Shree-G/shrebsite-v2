import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { IBM_Plex_Sans, Lora, IBM_Plex_Mono } from 'next/font/google'

const _ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"] })
const _lora = Lora({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })
const _ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: 'Shree Gopalakrishnan',
  description: 'Shree G Personal Portfolio - Full Stack Software Engineer with AI Expertise',
  generator: 'v0.app',
  icons: {
    icon: '/prof-photo.JPG',
    apple: '/prof-photo.JPG',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
