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

export async function getProjectDescriptions(): Promise<Map<string, string>> {
  if (!supabase) return new Map()

  const { data, error } = await supabase
    .from('articles')
    .select('tags, content_text')
    .like('tags::text', '%portfolio:project:%')
    .eq('status', 'published')
    .is('deleted_at', null)
    .returns<{ tags: string[]; content_text: string | null }[]>()

  if (error || !data) return new Map()

  const map = new Map<string, string>()
  for (const row of data) {
    if (!row.tags || !row.content_text) continue
    for (const tag of row.tags) {
      if (tag.startsWith('portfolio:project:')) {
        map.set(tag.replace('portfolio:project:', ''), row.content_text)
      }
    }
  }
  return map
}
