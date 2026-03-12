import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '람쥐썬더 | Portfolio',
  description: '바이브코딩 프로젝트 쇼케이스 - Web3 가계부, 육아 앱, 김프 모니터링 등',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: '람쥐썬더 | Portfolio',
    description: '바이브코딩 프로젝트 쇼케이스 - Web3 가계부, 육아 앱, 김프 모니터링 등',
    type: 'website',
  },
  twitter: { card: 'summary' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
