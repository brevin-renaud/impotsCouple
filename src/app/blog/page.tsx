import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { getAllPostsAsync } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog Fiscalité Couple 2026 : Guides PACS et Mariage',
  description:
    'Articles et guides complets sur la fiscalité des couples en France : PACS, mariage, quotient familial, impôts, optimisation fiscale.',
  alternates: {
    canonical: 'https://impotscouple.fr/blog',
  },
  openGraph: {
    title: 'Blog Fiscalité Couple : Guides PACS, Mariage, Impôts',
    description:
      'Guides et articles pour comprendre la fiscalité des couples en France.',
    url: 'https://impotscouple.fr/blog',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog Fiscalité Couple : Guides PACS, Mariage, Impôts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Fiscalité Couple : Guides PACS, Mariage, Impôts',
    description: 'Guides et articles pour comprendre la fiscalité des couples en France.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default async function BlogPage() {
  const posts = await getAllPostsAsync()

  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-stone-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-orange-600">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="text-stone-900 font-medium">Blog</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Guide Fiscal
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Tout comprendre sur la fiscalité des couples en France : quotient familial, 
              union et optimisation de vos impôts.
            </p>
          </div>

          {/* Articles */}
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card
                    variant="default"
                    className="hover:shadow-lg transition-all duration-200 hover:border-orange-200"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-stone-400">
                              {post.readingTime} de lecture
                            </span>
                          </div>
                          <h2 className="text-xl font-semibold text-stone-900 mb-2 group-hover:text-orange-600">
                            {post.title}
                          </h2>
                          <p className="text-stone-600 text-sm line-clamp-2">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex items-center text-orange-500">
                          <span className="text-sm font-medium mr-2">Lire</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500">Aucun article pour le moment.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card variant="elevated" className="bg-linear-to-br from-orange-500 to-orange-600 border-0">
              <CardContent>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Prêt à calculer votre économie ?
                </h3>
                <p className="text-orange-100 mb-6">
                  Utilisez notre simulateur gratuit pour découvrir l&apos;impact fiscal sur votre situation.
                </p>
                <Link
                  href="/simulateur"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-colors"
                >
                  Lancer la simulation
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
