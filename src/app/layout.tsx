import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tommy Mao — Network Automation & Infrastructure Engineer',
  description:
    'Network automation, CI/CD, and self-hosted infrastructure. 10,000+ Telstra production nodes, AI pipelines, home lab.',
  openGraph: {
    title: 'Tommy Mao — Network Automation & Infrastructure Engineer',
    description:
      'Network automation, CI/CD, and self-hosted infrastructure. 10,000+ Telstra production nodes, AI pipelines, home lab.',
    type: 'website',
  },
  metadataBase: new URL('https://tommymao.feifei.food'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
