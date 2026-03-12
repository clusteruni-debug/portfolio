import { generateHTML, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'

const extensions = [StarterKit, Image, Underline]

export function renderArticleHTML(content: JSONContent): string {
  try {
    return generateHTML(content, extensions)
  } catch {
    return '<p style="color:#ef4444">콘텐츠를 렌더링하지 못했습니다.</p>'
  }
}
