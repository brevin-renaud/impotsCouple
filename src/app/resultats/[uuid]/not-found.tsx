import Link from 'next/link'
import { Button } from '@/components/ui'

export default function ResultsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Simulation introuvable
          </h1>
          <p className="text-stone-600 mb-8">
            Cette simulation n&apos;existe pas ou a expiré. Les résultats sont automatiquement 
            supprimés après 30 jours pour protéger votre vie privée.
          </p>
          <Link href="/simulateur">
            <Button size="lg">
              Lancer une nouvelle simulation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
