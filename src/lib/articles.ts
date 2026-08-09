import { supabase } from './supabase'
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

function toArticle(row: ArticleRow): PortfolioArticle {
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

export async function getArticlesByTag(tag: string, includeContent = false): Promise<PortfolioArticle[]> {
  if (!supabase) return []

  const columns = includeContent
    ? 'id, title, content, content_text, cover_image_url, tags, published_at'
    : 'id, title, content_text, cover_image_url, tags, published_at'

  const { data, error } = await supabase
    .from('articles')
    .select(columns)
    .contains('tags', [tag])
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .returns<ArticleRow[]>()

  if (error || !data) return []
  return data.map(toArticle)
}

export async function getArticleById(id: string): Promise<PortfolioArticle | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, content, content_text, cover_image_url, tags, published_at')
    .eq('id', id)
    .eq('status', 'published')
    .is('deleted_at', null)
    .returns<ArticleRow>()
    .maybeSingle()

  if (error || !data) return null
  return toArticle(data)
}

export async function getFeaturedStories(): Promise<PortfolioArticle[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, content_text, cover_image_url, tags, published_at')
    .contains('tags', ['portfolio:featured'])
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .returns<ArticleRow[]>()

  if (error || !data) return []
  return data
    .filter((row) => row.tags?.some((tag) => tag.startsWith('portfolio:story:')))
    .map(toArticle)
}

export async function getLatestThoughts(limit: number): Promise<PortfolioArticle[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, content_text, cover_image_url, tags, published_at')
    .or('tags.cs.{"portfolio:thought"},tags.cs.{"portfolio:blog"}')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .limit(limit)
    .returns<ArticleRow[]>()

  if (error || !data) return []
  return data.map(toArticle)
}

export async function getStoryBySlug(slug: string): Promise<PortfolioArticle | null> {
  if (!supabase) return null

  const tag = `portfolio:story:${slug}`
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, content, content_text, cover_image_url, tags, published_at')
    .contains('tags', [tag])
    .eq('status', 'published')
    .is('deleted_at', null)
    .returns<ArticleRow>()
    .maybeSingle()

  if (error || !data) return null
  return toArticle(data)
}

/**
 * PostgREST cannot prefix-match inside a text[] element (the `tags::text` cast it
 * would take is rejected as `42883 operator does not exist: text[] ~~ unknown`),
 * so `portfolio:story:<slug>` has to be matched after the fetch. That makes the
 * row cap load-bearing: if the corpus ever exceeds it, older stories fall off the
 * end of the page silently. Hence an explicit bound plus a loud warning at it,
 * rather than relying on whatever default the server happens to apply.
 */
const STORY_SCAN_LIMIT = 1000

export async function getAllStories(): Promise<PortfolioArticle[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, content_text, cover_image_url, tags, published_at')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .limit(STORY_SCAN_LIMIT)
    .returns<ArticleRow[]>()

  if (error || !data) return []
  if (data.length === STORY_SCAN_LIMIT) {
    console.warn(
      `[getAllStories] hit the ${STORY_SCAN_LIMIT}-row scan limit — older stories may be missing. Paginate this query.`,
    )
  }
  return data
    .filter((row) => row.tags?.some((tag) => tag.startsWith('portfolio:story:')))
    .map(toArticle)
}
