import { redirect, notFound } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'
import ArticleFormClient from '../ArticleFormClient'

interface EditArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin')
  }
  
  const { id } = await params
  
  const article = await prisma.article.findUnique({
    where: { id },
  })
  
  if (!article) {
    notFound()
  }
  
  return (
    <ArticleFormClient 
      mode="edit" 
      article={{
        ...article,
        publishedAt: article.publishedAt?.toISOString() || null,
        scheduledPublishAt: article.scheduledPublishAt?.toISOString() || null,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      }} 
    />
  )
}
