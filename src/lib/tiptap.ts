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

/**
 * Reduce a URL to the form a browser will actually navigate to, so the scheme
 * allowlist below cannot be walked around by characters the browser discards.
 * Per the WHATWG URL parser: tab/LF/CR are removed from anywhere in the input,
 * and leading/trailing C0 controls and spaces are trimmed. Without this,
 * `java\tscript:alert(1)` misses the scheme regex, falls through as a relative
 * path, and executes on click.
 */
function normalizeHref(raw: string): string {
  return raw
    .replace(/[\u0009\u000A\u000D]/g, '')
    .replace(/^[\u0000-\u0020]+/, '')
    .replace(/[\u0000-\u0020]+$/, '')
}

function getLinkType(href: string): 'external' | 'allowed' | null {
  if (!href) return null
  if (/^https?:/i.test(href)) return 'external'
  if (/^mailto:/i.test(href)) return 'allowed'
  // Backslashes normalize to slashes during URL parsing, so `\\evil.com` and
  // `/\evil.com` are protocol-relative too and must not read as internal links.
  if (/^[\\/]{2}/.test(href.replace(/\\/g, '/'))) return null
  if (/^[a-z][a-z\d+.-]*:/i.test(href)) return null
  return 'allowed'
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
        // Emit the normalized value, not the raw one — allowlisting one string
        // and rendering another is the bypass this guards against.
        const href = typeof mark.attrs?.href === 'string' ? normalizeHref(mark.attrs.href) : ''
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
      const safeLevel = typeof level === 'number' && level >= 1 && level <= 6 ? Math.trunc(level) : 2
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
    case 'codeBlock': {
      const language = typeof node.attrs?.language === 'string' ? node.attrs.language : ''
      const cls = /^[a-z0-9+#-]{1,32}$/i.test(language) ? ` class="language-${escapeHtml(language)}"` : ''
      return `<pre><code${cls}>${renderPlainText(node)}</code></pre>`
    }
    case 'horizontalRule':
      return '<hr />'
    case 'image': {
      // Same allowlist as links. `javascript:` in an img src does not execute in
      // current browsers, but an arbitrary remote src still leaks visitor IP/UA,
      // and the editor is configured with allowBase64: false so data: is not ours.
      const rawSrc = typeof node.attrs?.src === 'string' ? normalizeHref(node.attrs.src) : ''
      const src = getLinkType(rawSrc) === null ? '' : rawSrc
      if (!src) {
        // Say why the image vanished rather than leaving a silent hole.
        if (rawSrc) console.warn('[renderArticleHTML] dropped image with disallowed src:', rawSrc)
        return ''
      }
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
  } catch (err) {
    // Log before falling back. A silent catch here is exactly what hid the
    // browser-only generateHTML crash that made every article body render as
    // this message for weeks.
    console.error('[renderArticleHTML] render failed:', err)
    return '<p style="color:#ef4444">콘텐츠를 렌더링하지 못했습니다.</p>'
  }
}
