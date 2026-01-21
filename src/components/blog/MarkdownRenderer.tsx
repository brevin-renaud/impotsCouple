import { marked, Renderer } from 'marked'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Fonction pour décoder les entités HTML
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
}

// Créer un renderer personnalisé qui n'encode pas les apostrophes
function createRenderer(): Renderer {
  const renderer = new Renderer()
  
  // Override text pour ne pas encoder les apostrophes
  const originalText = renderer.text.bind(renderer)
  renderer.text = (token) => {
    const result = originalText(token)
    return decodeHtmlEntities(result)
  }
  
  return renderer
}

function parseMarkdown(content: string): string {
  const renderer = createRenderer()
  
  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
  })

  const html = marked.parse(content) as string
  
  // Décoder les entités HTML restantes dans le résultat final
  return decodeHtmlEntities(html)
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const htmlContent = parseMarkdown(content)

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
