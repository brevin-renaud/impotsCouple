import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Article non trouvé
          </h1>
          <p className="text-stone-600 mb-6">
            L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
          <Link
            href="/admin/articles"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
          >
            Retour aux articles
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
