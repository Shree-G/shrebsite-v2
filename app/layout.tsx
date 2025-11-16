import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { IBM_Plex_Sans, Lora, IBM_Plex_Mono } from 'next/font/google'

const _ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })
const _ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })

export const metadata: Metadata = {
  title: 'AI Engineer - Personal Portfolio',
  description: 'Explore my AI engineering projects, research, and professional journey',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
