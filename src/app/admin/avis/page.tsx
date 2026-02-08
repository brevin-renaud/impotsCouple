import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import FeedbackListClient from './FeedbackListClient'

export default async function AdminFeedbackPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  return <FeedbackListClient />
}
