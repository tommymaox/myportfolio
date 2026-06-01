import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Serif, Kanit } from 'next/font/google'
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

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tommy Mao — Network Automation & Infrastructure Engineer',
  description:
    'I build reliable systems where automation, networks, and infrastructure meet. Python, Linux, Docker, CI/CD, Cloudflare Zero Trust — 10,000+ production nodes in flight.',
  openGraph: {
    title: 'Tommy Mao — Network Automation & Infrastructure Engineer',
    description:
      'I build reliable systems where automation, networks, and infrastructure meet.',
    type: 'website',
    url: 'https://tommymao.feifei.food',
  },
  metadataBase: new URL('https://tommymao.feifei.food'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
