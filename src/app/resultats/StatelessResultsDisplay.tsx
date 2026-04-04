'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { FeedbackWidget } from '@/components/simulator'
import { formatCurrency } from '@/lib/utils'
import type { SimulationResult } from '@/lib/fiscal/calculator'
import type { SimulationData } from '@/lib/utils'

interface StatelessResultsDisplayProps {
  results: SimulationResult
  inputs: {
    incomeA: number
    incomeB: number
  }
  shareUrl: string
  simulationData: SimulationData
}

export function StatelessResultsDisplay({ results, inputs, shareUrl }: StatelessResultsDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const { celibat, union, bestScenario, gain, message } = results

  const scenarios = [
    {
      key: 'celibat',
      label: 'Célibat',
      sublabel: 'Imposition séparée',
      impot: celibat.totalTax,
      parts: celibat.partsA + celibat.partsB,
      isBest: bestScenario === 'single',
      color: 'stone',
    },
    {
      key: 'union',
      label: 'Union',
      sublabel: 'Imposition commune (PACS ou Mariage)',
      impot: union.totalTax,
      parts: union.parts,
      isBest: bestScenario === 'couple',
      color: 'orange',
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simulation terminée
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Vos résultats
            </h1>
            <p className="text-stone-600 text-sm sm:text-base">
              Revenus déclarés : {formatCurrency(inputs.incomeA)} + {formatCurrency(inputs.incomeB)}
            </p>
          </div>

          {/* Recommendation Card */}
          <Card
            variant="elevated"
            className={`mb-8 border-2 ${gain > 0
              ? 'border-green-200 bg-linear-to-br from-green-50 to-white'
              : 'border-stone-200'
            }`}
          >
            <CardContent className="p-8 text-center">
              {gain > 0 ? (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    Économie potentielle : <span className="text-green-600">{formatCurrency(gain)}/an</span>
                  </h2>
                  <p className="text-stone-600 mb-4 max-w-lg mx-auto">
                    {message}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    {message}
                  </h2>
                </>
              )}
            </CardContent>
          </Card>

          {/* Share CTA Block */}
          <Card variant="elevated" className="mb-6 sm:mb-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  Partagez ces résultats !
                </h3>
                <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto mb-4">
                  Conservez ou partagez ce lien avec votre conjoint(e).
                </p>
              </div>

              {/* URL de partage avec bouton copier */}
              <div className="max-w-xl mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-600 truncate font-mono"
                  />
                  <Button onClick={handleCopy} variant={copied ? 'primary' : 'outline'} className="shrink-0">
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copié !
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copier
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-stone-500 text-center mt-2">
                  💡 Ce lien contient toutes vos données de simulation. Aucune base de données n'est utilisée.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detail Section - Célibat */}
          <Card variant="default" className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Détail du scénario Célibat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-medium text-stone-900 mb-2 sm:mb-3 text-sm sm:text-base">Conjoint A</h4>
                  <dl className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Revenu imposable</dt>
                      <dd className="font-medium">{formatCurrency(celibat.conjointA.revenuImposable)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Parts fiscales</dt>
                      <dd className="font-medium">{celibat.conjointA.parts}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Quotient familial</dt>
                      <dd className="font-medium">{formatCurrency(celibat.conjointA.quotientFamilial)}</dd>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <dt className="text-stone-900 font-medium">Impôt</dt>
                      <dd className="font-bold text-orange-600">{formatCurrency(celibat.conjointA.impotNet)}</dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-medium text-stone-900 mb-2 sm:mb-3 text-sm sm:text-base">Conjoint B</h4>
                  <dl className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Revenu imposable</dt>
                      <dd className="font-medium">{formatCurrency(celibat.conjointB.revenuImposable)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Parts fiscales</dt>
                      <dd className="font-medium">{celibat.conjointB.parts}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Quotient familial</dt>
                      <dd className="font-medium">{formatCurrency(celibat.conjointB.quotientFamilial)}</dd>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <dt className="text-stone-900 font-medium">Impôt</dt>
                      <dd className="font-bold text-orange-600">{formatCurrency(celibat.conjointB.impotNet)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detail Union */}
          <Card variant="default" className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Détail du scénario Union</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-medium text-stone-900 mb-2 sm:mb-3 text-sm sm:text-base">Foyer fiscal commun</h4>
                <dl className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <dt className="text-stone-500">Revenu imposable total</dt>
                    <dd className="font-medium">{formatCurrency(union.revenuImposable)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-500">Parts fiscales</dt>
                    <dd className="font-medium">{union.parts}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-500">Quotient familial</dt>
                    <dd className="font-medium">{formatCurrency(union.quotientFamilial)}</dd>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-orange-200">
                    <dt className="text-stone-900 font-medium">Impôt total</dt>
                    <dd className="font-bold text-orange-600">{formatCurrency(union.totalTax)}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Cards */}
          <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8 grid-cols-2">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.key}
                variant={scenario.isBest ? 'elevated' : 'outlined'}
                className={`relative ${scenario.isBest
                  ? 'border-2 border-orange-300 ring-2 ring-orange-100'
                  : ''
                }`}
              >
                {scenario.isBest && (
                  <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                      Le plus avantageux
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-1 sm:pb-2">
                  <CardTitle className={`text-sm sm:text-base ${scenario.isBest ? 'text-orange-600' : 'text-stone-700'}`}>
                    {scenario.label}
                  </CardTitle>
                  <p className="text-[10px] sm:text-xs text-stone-500 hidden sm:block">{scenario.sublabel}</p>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <div className={`text-xl sm:text-3xl font-bold mb-1 sm:mb-2 ${scenario.isBest ? 'text-orange-600' : 'text-stone-900'
                  }`}>
                    {formatCurrency(scenario.impot)}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500">
                    {scenario.parts} part{scenario.parts > 1 ? 's' : ''}
                  </p>

                  {scenario.key === 'celibat' && (
                    <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
                      <p>A : {formatCurrency(celibat.taxA)}</p>
                      <p>B : {formatCurrency(celibat.taxB)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feedback */}
          <div className="mb-6 sm:mb-8">
            <FeedbackWidget />
          </div>

          {/* Info juridique */}
          <Card variant="default" className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Bon à savoir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-600">
                <p>
                  <strong>Sur le plan fiscal</strong>, le PACS et le mariage sont strictement identiques :
                  déclaration commune et même barème d&apos;imposition.
                </p>
                <p>
                  <strong>Les différences sont juridiques</strong> : succession, pension de réversion,
                  prestation compensatoire en cas de séparation, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleCopy}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {copied ? 'Lien copié !' : 'Partager ce résultat'}
            </Button>
            <Link href="/simulateur">
              <Button size="sm" className="w-full sm:w-auto">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Nouvelle simulation
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-stone-100 rounded-xl text-center">
            <p className="text-[10px] sm:text-xs text-stone-500">
              Cette simulation est fournie à titre indicatif uniquement et ne constitue pas un conseil fiscal.
              Les résultats sont basés sur le barème 2025 et peuvent varier selon votre situation réelle.
              Consultez un professionnel pour une analyse personnalisée.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
