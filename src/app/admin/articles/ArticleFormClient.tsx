'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'

interface Article {
  id: string
  slug: string
  title: string
  description: string
  content: string
  author: string
  category: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  isDraft: boolean
}

interface ArticleFormClientProps {
  mode: 'create' | 'edit'
  article?: Article
}

const CATEGORIES = [
  'Fiscalité',
  'Patrimoine',
  'Famille',
  'Conseils',
  'Actualités',
]

export default function ArticleFormClient({ mode, article }: ArticleFormClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState(article?.title || '')
  const [slug, setSlug] = useState(article?.slug || '')
  const [description, setDescription] = useState(article?.description || '')
  const [content, setContent] = useState(article?.content || '')
  const [author, setAuthor] = useState(article?.author || 'FiscalCouple')
  const [category, setCategory] = useState(article?.category || 'Fiscalité')
  const [publishedAt, setPublishedAt] = useState(
    article?.publishedAt 
      ? new Date(article.publishedAt).toISOString().split('T')[0]
      : ''
  )
  const [isDraft, setIsDraft] = useState(article?.isDraft ?? true)

  // Auto-génération du slug depuis le titre
  useEffect(() => {
    if (mode === 'create' && title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Retire les accents
        .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces, tirets
        .replace(/\s+/g, '-') // Remplace les espaces par des tirets
        .replace(/-+/g, '-') // Évite les tirets multiples
        .substring(0, 100) // Limite la longueur
      setSlug(generatedSlug)
    }
  }, [title, mode, slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const body = {
      title,
      slug,
      description,
      content,
      author,
      category,
      publishedAt: publishedAt || null,
      isDraft,
    }

    try {
      const url = mode === 'create' 
        ? '/api/admin/articles'
        : `/api/admin/articles/${article?.id}`
      
      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/articles')
        router.refresh()
      } else {
        setError(data.error || 'Erreur lors de la sauvegarde')
      }
    } catch {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/admin/articles"
                className="text-sm text-stone-500 hover:text-orange-600 mb-2 inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux articles
              </Link>
              <h1 className="text-2xl font-bold text-stone-900">
                {mode === 'create' ? 'Nouvel article' : 'Modifier l\'article'}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne principale - Contenu */}
              <div className="lg:col-span-2 space-y-6">
                <Card variant="elevated">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Titre *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Titre de l'article"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Slug (URL) *
                      </label>
                      <div className="flex items-center">
                        <span className="text-stone-400 text-sm mr-2">/blog/</span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="flex-1 px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                          placeholder="slug-de-l-article"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Description (meta description) *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        placeholder="Brève description pour le SEO (150-160 caractères)"
                        rows={2}
                        required
                      />
                      <p className="text-xs text-stone-500 mt-1">
                        {description.length}/160 caractères
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-6">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Contenu (MDX) *
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm resize-none"
                      placeholder="Écrivez le contenu en Markdown..."
                      rows={20}
                      required
                    />
                    <p className="text-xs text-stone-500 mt-2">
                      Vous pouvez utiliser la syntaxe Markdown : **gras**, *italique*, ## Titre, - Liste, etc.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Colonne latérale - Metadata */}
              <div className="space-y-6">
                <Card variant="elevated">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-stone-900">Publication</h3>
                    
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!isDraft}
                          onChange={(e) => setIsDraft(!e.target.checked)}
                          className="w-5 h-5 text-orange-500 border-stone-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-stone-700">
                          Publier l&apos;article
                        </span>
                      </label>
                      <p className="text-xs text-stone-500 mt-1 ml-8">
                        Les brouillons ne sont pas visibles sur le blog
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Date de publication
                      </label>
                      <input
                        type="date"
                        value={publishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <p className="text-xs text-stone-500 mt-1">
                        Laissez vide pour utiliser la date actuelle
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-stone-900">Metadata</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Auteur
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="FiscalCouple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading 
                    ? 'Enregistrement...' 
                    : mode === 'create' 
                      ? 'Créer l\'article' 
                      : 'Enregistrer les modifications'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
