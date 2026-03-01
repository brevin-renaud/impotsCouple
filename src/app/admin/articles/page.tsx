import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'
import ArticlesListClient from './ArticlesListClient'

export default async function AdminArticlesPage() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin')
  }
  
  const articles = await prisma.article.findMany({
    orderBy: [
      { publishedAt: 'desc' },
      { scheduledPublishAt: 'desc' },
      { createdAt: 'desc' },
    ],
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      author: true,
      category: true,
      publishedAt: true,
      scheduledPublishAt: true,
      createdAt: true,
      updatedAt: true,
      isDraft: true,
    },
  })
  
  return <ArticlesListClient initialArticles={articles} />
}
