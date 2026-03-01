import prisma from '@/lib/db/prisma'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

// Récupère tous les articles publiés depuis la base de données
export async function getAllPostsAsync(): Promise<BlogPostMeta[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { 
        isDraft: false,
        publishedAt: { 
          not: null,
        },
      },
      orderBy: { 
        publishedAt: 'desc' 
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return articles.map((article: any) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
      author: article.author,
      category: article.category,
      readingTime: calculateReadingTime(article.content),
    }))
  } catch (error) {
    console.warn('Database not available for blog posts:', error)
    return []
  }
}

// Alias pour rétrocompatibilité
export function getAllPosts(): BlogPostMeta[] {
  // Version synchrone - retourne un tableau vide, utilisez getAllPostsAsync à la place
  console.warn('getAllPosts() is deprecated, use getAllPostsAsync() instead')
  return []
}

// Récupère un article par son slug
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  try {
    const now = new Date()
    const article = await prisma.article.findUnique({
      where: { slug },
    })

    // Ne retourner que les articles publiés (pas les brouillons, ni les articles programmés, ni les articles futurs)
    if (!article || article.isDraft || !article.publishedAt || article.publishedAt > now) {
      return null
    }

    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.publishedAt.toISOString(),
      author: article.author,
      category: article.category,
      readingTime: calculateReadingTime(article.content),
      content: article.content,
    }
  } catch (error) {
    console.warn('Database not available for blog post lookup:', error)
    return null
  }
}

// Alias pour rétrocompatibilité
export function getPostBySlug(slug: string): BlogPost | null {
  console.warn('getPostBySlug() is deprecated, use getPostBySlugAsync() instead')
  void slug
  return null
}

// Récupère tous les slugs des articles publiés
export async function getAllSlugsAsync(): Promise<string[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { 
        isDraft: false,
        publishedAt: { not: null },
      },
      select: { slug: true },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return articles.map((a: any) => a.slug)
  } catch (error) {
    console.warn('Database not available for slugs:', error)
    return []
  }
}

// Alias pour rétrocompatibilité
export function getAllSlugs(): string[] {
  console.warn('getAllSlugs() is deprecated, use getAllSlugsAsync() instead')
  return []
}
