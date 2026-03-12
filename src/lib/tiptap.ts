import { generateHTML, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import DOMPurify from 'dompurify'

const extensions = [StarterKit, Image, Underline]

export function renderArticleHTML(content: JSONContent): string {
  try {
    const raw = generateHTML(content, extensions)
    return DOMPurify.sanitize(raw)
  } catch {
    return '<p style="color:#ef4444">콘텐츠를 렌더링하지 못했습니다.</p>'
  }
}
