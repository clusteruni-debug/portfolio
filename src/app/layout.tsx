import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '기록하는 사람',
  description: '만들고, 쓰고, 기록합니다 — 람쥐썬더의 기록 공간',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: '기록하는 사람',
    description: '만들고, 쓰고, 기록합니다 — 람쥐썬더의 기록 공간',
    type: 'website',
  },
  twitter: { card: 'summary' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
        }} />
      </head>
      <body>
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
