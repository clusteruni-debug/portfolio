import { Component, lazy, Suspense, type ReactNode } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
    </div>
  )
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-300">404</h1>
      <p className="mb-6 text-lg text-slate-500">페이지를 찾을 수 없습니다</p>
      <Link
        to="/"
        className="inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
      >
        홈으로 돌아가기
      </Link>
    </section>
  )
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
          <p className="mb-4 text-lg font-medium text-slate-500">문제가 발생했습니다</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
            className="inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            홈으로 돌아가기
          </button>
        </section>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <main className="relative">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default App
