import { MetadataRoute } from 'next'
import prisma from '@/lib/db/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://impotscouple.fr'
  const currentDate = new Date()

  // Pages statiques principales - haute priorité SEO
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/simulateur`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Pages informatives PACS et Mariage - très importantes pour SEO
    {
      url: `${baseUrl}/pacs`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mariage`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quotient-familial`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Articles de blog - contenu éditorial important pour SEO
  let blogPages: MetadataRoute.Sitemap = []
  
  try {
    // Récupérer uniquement les articles publiés (publishedAt != null)
    const publishedArticles = await prisma.article.findMany({
      where: {
        isDraft: false,
        publishedAt: { not: null },
      },
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    })
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogPages = publishedArticles.map((article: any) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch (error) {
    console.warn('Failed to fetch blog articles for sitemap:', error)
  }

  return [...staticPages, ...blogPages]
}
