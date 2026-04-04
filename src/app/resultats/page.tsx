'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { parseTinyURL, generateTinyURL, type SimulationData } from '@/lib/utils'
import { simulateFiscalScenarios, type SimulationResult } from '@/lib/fiscal/calculator'
import { calculateSingleParts, calculateCoupleParts, defaultSpecialSituations } from '@/lib/validation/schemas'
import { StatelessResultsDisplay } from './StatelessResultsDisplay'

const SESSION_KEY = 'impotscouple_simulation'

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [simulation, setSimulation] = useState<SimulationData | null>(null)
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState<string>('')
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return

    const code = searchParams.get('s')
    let data: SimulationData | null = null

    // 1. Essayer de décoder depuis l'URL
    if (code) {
      const parsed = parseTinyURL(code)
      if (parsed.valid && parsed.data) {
        data = parsed.data
        // Sauvegarder dans sessionStorage pour les reloads
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
        // Générer l'URL de partage
        if (typeof window !== 'undefined') {
          setShareUrl(window.location.href)
        }
      } else {
        setError(parsed.error || 'Données de simulation invalides.')
        return
      }
    } 
    // 2. Sinon, essayer de récupérer depuis sessionStorage (reload)
    else {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        try {
          data = JSON.parse(stored) as SimulationData
          // Reconstruire l'URL de partage depuis les données stockées
          const tinyUrl = generateTinyURL(data)
          if (typeof window !== 'undefined') {
            setShareUrl(`${window.location.origin}/resultats?s=${tinyUrl}`)
          }
        } catch {
          setError('Aucune simulation trouvée. Veuillez effectuer une nouvelle simulation.')
          return
        }
      } else {
        setError('Aucune simulation trouvée. Veuillez effectuer une nouvelle simulation.')
        return
      }
    }

    hasProcessed.current = true
    setSimulation(data)

    // 3. Recalculer les résultats fiscaux
    try {
      const ssA = data.specialSituationsA || defaultSpecialSituations
      const ssB = data.specialSituationsB || defaultSpecialSituations
      
      const partsA = calculateSingleParts(ssA, data.childrenCountA, data.childrenA)
      const partsB = calculateSingleParts(ssB, data.childrenCountB, data.childrenB)
      
      const totalChildrenCount = data.childrenCountA + data.childrenCountB
      const allChildren = [...data.childrenA, ...data.childrenB]
      const partsCouple = calculateCoupleParts(ssA, ssB, totalChildrenCount, allChildren)

      const calculatedResults = simulateFiscalScenarios({
        incomeA: data.incomeA,
        incomeB: data.incomeB,
        partsA,
        partsB,
        partsCouple,
      })

      setResults(calculatedResults)

      // 4. Masquer l'URL technique
      window.history.replaceState({ simulation: data }, '', '/resultats')
    } catch (err) {
      setError('Erreur lors du calcul des résultats.')
      console.error(err)
    }
  }, [searchParams])

  // État de chargement
  if (!simulation && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-50 to-stone-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Chargement des résultats...</p>
        </div>
      </div>
    )
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-50 to-stone-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Simulation introuvable</h2>
          <p className="text-stone-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/simulateur')}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
          >
            Nouvelle simulation
          </button>
        </div>
      </div>
    )
  }

  // Affichage des résultats
  if (results && simulation) {
    return (
      <StatelessResultsDisplay
        results={results}
        inputs={{
          incomeA: simulation.incomeA,
          incomeB: simulation.incomeB,
        }}
        shareUrl={shareUrl}
        simulationData={simulation}
      />
    )
  }

  return null
}

export default function StatelessResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-50 to-stone-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
