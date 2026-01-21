import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
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
