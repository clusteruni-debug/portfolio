import type { JSONContent } from '@tiptap/react'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderPlainText(node: JSONContent): string {
  if (node.type === 'text') return escapeHtml(node.text ?? '')
  return (node.content ?? []).map(renderPlainText).join('')
}

function getLinkType(href: string): 'external' | 'allowed' | null {
  if (/^https?:/i.test(href)) return 'external'
  if (/^mailto:/i.test(href)) return 'allowed'
  if (href.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(href)) return null
  return href ? 'allowed' : null
}

function renderText(node: JSONContent): string {
  let text = escapeHtml(node.text ?? '')

  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case 'bold':
        text = `<strong>${text}</strong>`
        break
      case 'italic':
        text = `<em>${text}</em>`
        break
      case 'strike':
        text = `<del>${text}</del>`
        break
      case 'underline':
        text = `<u>${text}</u>`
        break
      case 'code':
        text = `<code>${text}</code>`
        break
      case 'link': {
        const href = typeof mark.attrs?.href === 'string' ? mark.attrs.href.trim() : ''
        const linkType = getLinkType(href)

        if (linkType === 'external') {
          text = `<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">${text}</a>`
        } else if (linkType === 'allowed') {
          text = `<a href="${escapeHtml(href)}">${text}</a>`
        }
        break
      }
    }
  }

  return text
}

function renderNode(node: JSONContent): string {
  if (node.type === 'text') return renderText(node)

  const children = (node.content ?? []).map(renderNode).join('')

  switch (node.type) {
    case 'doc':
      return children
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading': {
      const level = node.attrs?.level
      const safeLevel = level === 1 || level === 2 || level === 3 ? level : 2
      return `<h${safeLevel}>${children}</h${safeLevel}>`
    }
    case 'bulletList':
      return `<ul>${children}</ul>`
    case 'orderedList':
      return `<ol>${children}</ol>`
    case 'listItem':
      return `<li>${children}</li>`
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`
    case 'codeBlock':
      return `<pre><code>${renderPlainText(node)}</code></pre>`
    case 'horizontalRule':
      return '<hr />'
    case 'image': {
      const src = typeof node.attrs?.src === 'string' ? node.attrs.src : ''
      const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : ''
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="article-image" />`
    }
    case 'hardBreak':
      return '<br />'
    case 'articleLink': {
      const title = typeof node.attrs?.title === 'string' ? node.attrs.title : ''
      return `<span>${escapeHtml(title)}</span>`
    }
    default:
      return children
  }
}

export function renderArticleHTML(content: JSONContent): string {
  try {
    return renderNode(content)
  } catch {
    return '<p style="color:#ef4444">콘텐츠를 렌더링하지 못했습니다.</p>'
  }
}
