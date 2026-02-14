'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui'

interface Article {
  id: string
  slug: string
  title: string
  description: string
  author: string
  category: string
  publishedAt: Date | null
  scheduledPublishAt: Date | null
  createdAt: Date
  updatedAt: Date
  isDraft: boolean
}

interface ArticlesListClientProps {
  initialArticles: Article[]
}

export default function ArticlesListClient({ initialArticles }: ArticlesListClientProps) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return
    }

    setDeleting(id)
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setArticles(articles.filter(a => a.id !== id))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch {
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Gestion des articles
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                {articles.length} article{articles.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/stats"
                className="px-4 py-2 text-stone-600 hover:text-orange-600 transition-colors text-sm"
              >
                Statistiques
              </Link>
              <Link
                href="/admin/avis"
                className="px-4 py-2 text-stone-600 hover:text-orange-600 transition-colors text-sm"
              >
                Avis
              </Link>
              <Link
                href="/admin/articles/nouveau"
                className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                + Nouvel article
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>

          {/* Liste des articles */}
          {articles.length === 0 ? (
            <Card variant="elevated">
              <CardContent className="p-12 text-center">
                <p className="text-stone-500 mb-4">Aucun article pour le moment.</p>
                <Link
                  href="/admin/articles/nouveau"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Créer votre premier article →
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            article.isDraft 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : article.scheduledPublishAt
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {article.isDraft 
                              ? 'Brouillon' 
                              : article.scheduledPublishAt
                              ? `Programmé ${formatDate(article.scheduledPublishAt)}`
                              : 'Publié'}
                          </span>
                          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            {article.category}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-stone-900 mb-1 truncate">
                          {article.title}
                        </h2>
                        <p className="text-stone-600 text-sm line-clamp-2 mb-2">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-stone-500">
                          <span>Slug: <code className="bg-stone-100 px-1 rounded">{article.slug}</code></span>
                          <span>Créé le {formatDate(article.createdAt)}</span>
                          {article.publishedAt && (
                            <span>Publié le {formatDate(article.publishedAt)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                          title="Voir l'article"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="p-2 text-stone-400 hover:text-orange-600 transition-colors"
                          title="Modifier"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleting === article.id}
                          className="p-2 text-stone-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
