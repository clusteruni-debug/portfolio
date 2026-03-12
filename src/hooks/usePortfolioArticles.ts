import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { JSONContent } from '@tiptap/react'

export interface PortfolioArticle {
  id: string
  title: string
  content: JSONContent | null
  content_text: string | null
  cover_image_url: string | null
  tags: string[]
  published_at: string | null
}

interface ArticleRow {
  id: string
  title: string
  content?: JSONContent
  content_text: string | null
  cover_image_url: string | null
  tags: string[] | null
  published_at: string | null
}

interface UsePortfolioArticlesOptions {
  tag: string
  includeContent?: boolean
}

function toPortfolioArticle(row: ArticleRow): PortfolioArticle {
  return {
    id: row.id,
    title: row.title,
    content: row.content ?? null,
    content_text: row.content_text,
    cover_image_url: row.cover_image_url,
    tags: row.tags ?? [],
    published_at: row.published_at,
  }
}

export function usePortfolioArticles({ tag, includeContent = false }: UsePortfolioArticlesOptions) {
  const [articles, setArticles] = useState<PortfolioArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchArticles() {
      setLoading(true)
      setError(null)

      try {
        const columns = includeContent
          ? 'id, title, content, content_text, cover_image_url, tags, published_at'
          : 'id, title, content_text, cover_image_url, tags, published_at'

        const { data, error: err } = await supabase!
          .from('articles')
          .select(columns)
          .contains('tags', [tag])
          .eq('status', 'published')
          .is('deleted_at', null)
          .order('published_at', { ascending: false })
          .returns<ArticleRow[]>()

        if (cancelled) return

        if (err) {
          setError(err.message)
        } else {
          setArticles((data ?? []).map(toPortfolioArticle))
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load articles')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchArticles()
    return () => { cancelled = true }
  }, [tag, includeContent])

  return { articles, loading, error }
}

export function usePortfolioArticle(id: string | undefined) {
  const [article, setArticle] = useState<PortfolioArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase || !id) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchArticle() {
      setLoading(true)
      setError(null)

      try {
        const { data, error: err } = await supabase!
          .from('articles')
          .select('id, title, content, content_text, cover_image_url, tags, published_at')
          .eq('id', id!)
          .eq('status', 'published')
          .is('deleted_at', null)
          .returns<ArticleRow>()
          .maybeSingle()

        if (cancelled) return

        if (err) {
          setError(err.message)
        } else if (data) {
          setArticle(toPortfolioArticle(data))
        } else {
          setError('Article not found')
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load article')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchArticle()
    return () => { cancelled = true }
  }, [id])

  return { article, loading, error }
}
