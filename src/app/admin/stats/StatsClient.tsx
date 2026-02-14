'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

interface Stats {
  summary: {
    totalSimulations: number
    totalShares: number
    totalPDFs: number
    shareRate: string
    pdfRate: string
  }
  dailyData: Array<{
    date: string
    simulations: number
    shares: number
    pdfs: number
  }>
}

export function StatsClient() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<7 | 30 | 90>(30)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/stats?days=${period}`)
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      } else if (res.status === 401) {
        // Non authentifié, rediriger vers la page de login
        router.push('/admin')
      } else {
        console.error('Error response:', res.status)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-600">Erreur lors du chargement des statistiques</p>
      </div>
    )
  }

  const maxValue = Math.max(
    ...stats.dailyData.map(d => Math.max(d.simulations, d.shares, d.pdfs))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Statistiques d'utilisation
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Suivez les simulations, partages et génération de PDF
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="px-4 py-2 text-stone-600 hover:text-orange-600 transition-colors text-sm"
          >
            Articles
          </Link>
          <Link
            href="/admin/avis"
            className="px-4 py-2 text-stone-600 hover:text-orange-600 transition-colors text-sm"
          >
            Avis
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        <button
          onClick={() => setPeriod(7)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            period === 7
              ? 'bg-orange-500 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          7 jours
        </button>
        <button
          onClick={() => setPeriod(30)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            period === 30
              ? 'bg-orange-500 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          30 jours
        </button>
        <button
          onClick={() => setPeriod(90)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            period === 90
              ? 'bg-orange-500 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          90 jours
        </button>
      </div>

      {/* Résumé */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-stone-600">Simulations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">
              {stats.summary.totalSimulations.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-stone-600">Partages lien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {stats.summary.totalShares.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {stats.summary.shareRate} des simulations
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-stone-600">PDF générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {stats.summary.totalPDFs.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {stats.summary.pdfRate} des simulations
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-stone-600">Total actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {(stats.summary.totalShares + stats.summary.totalPDFs).toLocaleString()}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {(
                ((stats.summary.totalShares + stats.summary.totalPDFs) /
                  stats.summary.totalSimulations) *
                100
              ).toFixed(1)}
              % taux d'engagement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-stone-600">Moy. par jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {(stats.summary.totalSimulations / period).toFixed(1)}
            </div>
            <div className="text-xs text-stone-500 mt-1">simulations/jour</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Évolution quotidienne</CardTitle>
            {/* Légende */}
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-stone-400 rounded"></div>
                <span className="text-stone-600">Simulations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-stone-600">Partages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-stone-600">PDF</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Graphique à barres simplifié */}
            {stats.dailyData.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                Aucune donnée pour cette période
              </div>
            ) : (
              <div className="space-y-2">
                {stats.dailyData.slice().reverse().slice(0, 14).map((day, idx) => {
                  const total = day.simulations || 1
                  const sharePercent = (day.shares / total) * 100
                  const pdfPercent = (day.pdfs / total) * 100
                  
                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-20 text-xs text-stone-600 font-medium shrink-0">
                          {new Date(day.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {/* Barre de simulations */}
                            <div className="flex-1 h-8 bg-stone-100 rounded-lg overflow-hidden relative">
                              <div 
                                className="h-full bg-stone-400 transition-all duration-300 flex items-center justify-center"
                                style={{ width: `${Math.max((day.simulations / maxValue) * 100, 2)}%` }}
                              >
                                {day.simulations > 0 && (
                                  <span className="text-xs font-semibold text-white px-2">
                                    {day.simulations}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Barres de partages et PDF */}
                            <div className="flex gap-1.5">
                              <div 
                                className="h-8 bg-blue-500 rounded-lg flex items-center justify-center min-w-[32px] transition-all hover:bg-blue-600"
                                style={{ width: `${Math.max(day.shares * 8, 32)}px` }}
                                title={`${day.shares} partages (${sharePercent.toFixed(0)}%)`}
                              >
                                <span className="text-xs font-semibold text-white">
                                  {day.shares}
                                </span>
                              </div>
                              <div 
                                className="h-8 bg-red-500 rounded-lg flex items-center justify-center min-w-[32px] transition-all hover:bg-red-600"
                                style={{ width: `${Math.max(day.pdfs * 8, 32)}px` }}
                                title={`${day.pdfs} PDF (${pdfPercent.toFixed(0)}%)`}
                              >
                                <span className="text-xs font-semibold text-white">
                                  {day.pdfs}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            
            {stats.dailyData.length > 14 && (
              <p className="text-xs text-stone-500 text-center pt-2 border-t">
                Affichage des 14 derniers jours • Voir le tableau pour toutes les données
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé */}
      <Card>
        <CardHeader>
          <CardTitle>Données détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-4 font-medium text-stone-700">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-stone-700">Simulations</th>
                  <th className="text-right py-3 px-4 font-medium text-stone-700">Partages</th>
                  <th className="text-right py-3 px-4 font-medium text-stone-700">PDF</th>
                  <th className="text-right py-3 px-4 font-medium text-stone-700">Taux partage</th>
                  <th className="text-right py-3 px-4 font-medium text-stone-700">Taux PDF</th>
                </tr>
              </thead>
              <tbody>
                {stats.dailyData.slice().reverse().map((day, idx) => {
                  const shareRate = day.simulations > 0 ? ((day.shares / day.simulations) * 100).toFixed(0) : '0'
                  const pdfRate = day.simulations > 0 ? ((day.pdfs / day.simulations) * 100).toFixed(0) : '0'

                  return (
                    <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="py-3 px-4 text-stone-900">
                        {new Date(day.date).toLocaleDateString('fr-FR', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right text-stone-900 font-medium">
                        {day.simulations}
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600 font-medium">
                        {day.shares}
                      </td>
                      <td className="py-3 px-4 text-right text-red-600 font-medium">
                        {day.pdfs}
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {shareRate}%
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {pdfRate}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
