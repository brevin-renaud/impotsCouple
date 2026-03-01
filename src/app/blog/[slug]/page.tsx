import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlugAsync, getAllSlugsAsync } from '@/lib/blog'
import { Card, CardContent } from '@/components/ui'
import { MarkdownRenderer } from '@/components/blog'

// Revalider la page toutes les 60 secondes
export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugsAsync()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlugAsync(slug)

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlugAsync(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Schema.org Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ImpotsCouple',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-stone-500 mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-orange-600">
                    Accueil
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-orange-600">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-stone-900 font-medium truncate max-w-xs">{post.title}</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-stone-400">
                  {post.readingTime} de lecture
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-stone-600 mb-4">
                {post.description}
              </p>
              <div className="flex items-center text-sm text-stone-500">
                <span>Par {post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
            </header>

            {/* Content */}
            <Card variant="elevated">
              <CardContent className="p-0">
                <MarkdownRenderer content={post.content} />
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="mt-8">
              <Card variant="outlined" className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">
                    Calculez votre situation
                  </h3>
                  <p className="text-stone-600 text-sm mb-4">
                    Découvrez concrètement l&apos;impact fiscal sur votre situation personnelle
                  </p>
                  <Link
                    href="/simulateur"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
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
      </article>
    </>
  )
}
