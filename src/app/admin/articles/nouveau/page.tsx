import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import ArticleFormClient from '../ArticleFormClient'

export default async function NewArticlePage() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin')
  }
  
  return <ArticleFormClient mode="create" />
}
