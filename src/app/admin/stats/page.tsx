import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import { StatsClient } from './StatsClient'

export const metadata: Metadata = {
  title: 'Statistiques - Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function StatsPage() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <StatsClient />
        </div>
      </div>
    </div>
  )
}
