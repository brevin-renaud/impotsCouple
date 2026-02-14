'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui'

interface Feedback {
  id: string
  rating: number
  comment: string | null
  createdAt: string
}

interface FeedbackStats {
  average: number
  total: number
  distribution: { rating: number; count: number }[]
}

export default function FeedbackListClient() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [ratingFilter, setRatingFilter] = useState<string>('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString() })
      if (ratingFilter) params.set('rating', ratingFilter)

      const response = await fetch(`/api/admin/feedback?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data.feedbacks)
        setTotalPages(data.totalPages)
        setStats(data.stats)
      } else if (response.status === 401) {
        router.push('/admin')
      }
    } catch {
      console.error('Erreur chargement avis')
    } finally {
      setLoading(false)
    }
  }, [page, ratingFilter, router])

  useEffect(() => {
    fetchFeedbacks()
  }, [fetchFeedbacks])

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet avis ?')) return

    setDeleting(id)
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFeedbacks(feedbacks.filter(f => f.id !== id))
        fetchFeedbacks() // Refresh stats
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch {
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300 fill-stone-300'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Avis utilisateurs
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                {stats ? `${stats.total} avis au total` : 'Chargement...'}
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
                href="/admin/articles"
                className="px-4 py-2 text-stone-600 hover:text-orange-600 transition-colors text-sm"
              >
                Articles
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>

          {/* Stats */}
          {stats && stats.total > 0 && (
            <div className="grid gap-4 mb-8 grid-cols-2 lg:grid-cols-4">
              {/* Note moyenne */}
              <Card variant="elevated">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {stats.average.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(stats.average))}
                  </div>
                  <p className="text-xs text-stone-500">Note moyenne</p>
                </CardContent>
              </Card>

              {/* Total avis */}
              <Card variant="elevated">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-stone-900 mb-1">
                    {stats.total}
                  </div>
                  <p className="text-xs text-stone-500 mt-2">Avis au total</p>
                </CardContent>
              </Card>

              {/* Distribution */}
              <Card variant="elevated" className="col-span-2">
                <CardContent className="p-6">
                  <p className="text-xs text-stone-500 mb-3 font-medium">Répartition des notes</p>
                  <div className="space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const item = stats.distribution.find(d => d.rating === star)
                      const count = item?.count || 0
                      const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0

                      return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                          <span className="w-3 text-right text-stone-600">{star}</span>
                          <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-yellow-400 h-full rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs text-stone-500">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filtres */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-stone-600">Filtrer :</span>
            <button
              onClick={() => { setRatingFilter(''); setPage(1) }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                !ratingFilter ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tous
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => { setRatingFilter(star.toString()); setPage(1) }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                  ratingFilter === star.toString()
                    ? 'bg-orange-500 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {star}
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Liste des avis */}
          {loading ? (
            <div className="text-center py-12">
              <svg className="animate-spin h-8 w-8 text-orange-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-stone-500 text-sm">Chargement des avis...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <Card variant="elevated">
              <CardContent className="p-12 text-center">
                <p className="text-stone-500">
                  {ratingFilter ? 'Aucun avis avec cette note.' : 'Aucun avis pour le moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {renderStars(feedback.rating)}
                          <span className="text-xs text-stone-400">
                            {formatDate(feedback.createdAt)}
                          </span>
                        </div>
                        {feedback.comment ? (
                          <p className="text-sm text-stone-700 whitespace-pre-wrap">
                            {feedback.comment}
                          </p>
                        ) : (
                          <p className="text-sm text-stone-400 italic">
                            Pas de commentaire
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        disabled={deleting === feedback.id}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors disabled:opacity-50 flex-shrink-0"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Précédent
              </button>
              <span className="text-sm text-stone-600 px-4">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
