import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { Card, CardContent } from '@/components/ui'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

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

// Composants MDX personnalisés
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-stone-800 mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-stone-600 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-stone-600 mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-stone-600 mb-4 space-y-1" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-stone-600" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-orange-600 hover:text-orange-700 underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-orange-300 pl-4 py-2 my-4 bg-orange-50 rounded-r-lg italic text-stone-700" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono text-stone-800" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-stone-900 text-stone-100 p-4 rounded-xl overflow-x-auto my-4 text-sm" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-stone-200 border border-stone-200 rounded-lg" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 bg-stone-50" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm text-stone-600 border-t border-stone-100" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-stone-900" {...props} />
  ),
  hr: () => <hr className="my-8 border-stone-200" />,
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

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
      name: 'FiscalCouple',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-stone-500 hover:text-orange-600 mb-8"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux articles
            </Link>

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
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-stone max-w-none">
                  <MDXRemote source={post.content} components={components} />
                </div>
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
