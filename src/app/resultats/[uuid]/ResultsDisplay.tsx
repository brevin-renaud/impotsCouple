'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { SimulationResult } from '@/lib/fiscal/types'

interface ResultsDisplayProps {
  uuid: string
  results: SimulationResult
  inputs: {
    incomeA: number
    incomeB: number
    children: number
  }
}

export function ResultsDisplay({ uuid, results, inputs }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/resultats/${uuid}`
    : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  const { celibat, pacs, optimization } = results

  // Fusionner PACS et Mariage s'ils ont le même impôt
  const pacsMariageSameImpot = pacs.totalImpot === pacs.totalImpot // PACS et Mariage ont toujours le même calcul fiscal

  const scenarios = pacsMariageSameImpot ? [
    {
      key: 'celibat',
      label: 'Célibat',
      sublabel: 'Imposition séparée',
      impot: celibat.totalImpot,
      parts: celibat.totalParts,
      isBest: optimization.bestScenario === 'celibat',
      color: 'stone',
    },
    {
      key: 'union',
      label: 'PACS ou Mariage',
      sublabel: 'Imposition commune (fiscalité identique)',
      impot: pacs.totalImpot,
      parts: pacs.totalParts,
      isBest: optimization.bestScenario === 'pacs' || optimization.bestScenario === 'mariage',
      color: 'orange',
    },
  ] : [
    {
      key: 'celibat',
      label: 'Célibat',
      sublabel: 'Imposition séparée',
      impot: celibat.totalImpot,
      parts: celibat.totalParts,
      isBest: optimization.bestScenario === 'celibat',
      color: 'stone',
    },
    {
      key: 'pacs',
      label: 'PACS',
      sublabel: 'Imposition commune',
      impot: pacs.totalImpot,
      parts: pacs.totalParts,
      isBest: optimization.bestScenario === 'pacs',
      color: 'orange',
    },
    {
      key: 'mariage',
      label: 'Mariage',
      sublabel: 'Imposition commune',
      impot: pacs.totalImpot,
      parts: pacs.totalParts,
      isBest: optimization.bestScenario === 'mariage',
      color: 'orange',
    },
  ]

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simulation terminée
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Vos résultats
            </h1>
            <p className="text-stone-600">
              Revenus déclarés : {formatCurrency(inputs.incomeA)} + {formatCurrency(inputs.incomeB)}
              {inputs.children > 0 && ` • ${inputs.children} enfant${inputs.children > 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Recommendation Card */}
          <Card
            variant="elevated"
            className={`mb-8 border-2 ${optimization.gain > 0
              ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
              : 'border-stone-200'
              }`}
          >
            <CardContent className="p-8 text-center">
              {optimization.gain > 0 ? (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    Économie potentielle : <span className="text-green-600">{formatCurrency(optimization.gain)}/an</span>
                  </h2>
                  <p className="text-stone-600 mb-4 max-w-lg mx-auto">
                    {optimization.message}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {optimization.timing}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    {optimization.message}
                  </h2>
                  <p className="text-stone-600">
                    {optimization.timing}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Comparison Cards */}
          <div className={`grid gap-4 mb-8 ${pacsMariageSameImpot ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
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
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Le plus avantageux
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className={scenario.isBest ? 'text-orange-600' : 'text-stone-700'}>
                    {scenario.label}
                  </CardTitle>
                  <p className="text-xs text-stone-500">{scenario.sublabel}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${scenario.isBest ? 'text-orange-600' : 'text-stone-900'
                    }`}>
                    {formatCurrency(scenario.impot)}
                  </div>
                  <p className="text-sm text-stone-500">
                    {scenario.parts} part{scenario.parts > 1 ? 's' : ''} fiscale{scenario.parts > 1 ? 's' : ''}
                  </p>

                  {scenario.key !== 'celibat' && optimization.gain > 0 && (
                    <div className="mt-4 pt-4 border-t border-stone-100">
                      <span className="text-sm text-green-600 font-medium">
                        -{formatCurrency(optimization.gain)} vs célibat
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tableau comparatif PACS vs Mariage */}
          <Card variant="default" className="mb-8">
            <CardHeader>
              <CardTitle>Différences entre PACS et Mariage</CardTitle>
              <p className="text-sm text-stone-600 mt-1">
                Sur le plan fiscal, ils sont identiques. Voici les différences sur les autres aspects :
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Critère</th>
                      <th className="text-left py-3 px-4 font-semibold">PACS</th>
                      <th className="text-left py-3 px-4 font-semibold">Mariage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-100">
                      <td className="py-3 px-4 font-medium text-stone-900">Formalités</td>
                      <td className="py-3 px-4 text-stone-600">Simple déclaration en mairie ou chez un notaire</td>
                      <td className="py-3 px-4 text-stone-600">Cérémonie officielle, publications</td>
                    </tr>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <td className="py-3 px-4 font-medium text-stone-900">Impôts</td>
                      <td className="py-3 px-4 text-stone-600">Déclaration commune, même barème</td>
                      <td className="py-3 px-4 text-stone-600">Déclaration commune, même barème</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-3 px-4 font-medium text-stone-900">Logement</td>
                      <td className="py-3 px-4 text-stone-600">Bien commun ou séparé selon le choix</td>
                      <td className="py-3 px-4 text-stone-600">Communauté de biens (sauf contrat)</td>
                    </tr>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <td className="py-3 px-4 font-medium text-stone-900">Enfants</td>
                      <td className="py-3 px-4 text-stone-600">Reconnaissance nécessaire pour le 2e parent</td>
                      <td className="py-3 px-4 text-stone-600">Filiation automatique pour les 2 parents</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-3 px-4 font-medium text-stone-900">Rupture</td>
                      <td className="py-3 px-4 text-stone-600">Simple : déclaration unilatérale</td>
                      <td className="py-3 px-4 text-stone-600">Divorce : procédure judiciaire</td>
                    </tr>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <td className="py-3 px-4 font-medium text-stone-900">Succession</td>
                      <td className="py-3 px-4 text-stone-600">Pas d'héritage automatique (testament requis)</td>
                      <td className="py-3 px-4 text-stone-600">Héritage automatique du conjoint</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-3 px-4 font-medium text-stone-900">Droits de succession</td>
                      <td className="py-3 px-4 text-stone-600">Exonération totale entre partenaires</td>
                      <td className="py-3 px-4 text-stone-600">Exonération totale entre époux</td>
                    </tr>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <td className="py-3 px-4 font-medium text-stone-900">Pension de réversion</td>
                      <td className="py-3 px-4 text-stone-600">Aucune</td>
                      <td className="py-3 px-4 text-stone-600">54% de la retraite du défunt</td>
                    </tr>
                    <tr className="">
                      <td className="py-3 px-4 font-medium text-stone-900">International</td>
                      <td className="py-3 px-4 text-stone-600">Reconnaissance variable selon pays</td>
                      <td className="py-3 px-4 text-stone-600">Reconnu dans tous les pays</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">Point clé : la pension de réversion</p>
                    <p>Le mariage offre une protection financière importante via la pension de réversion (jusqu'à 54% de la retraite du conjoint décédé). Le PACS ne donne aucun droit à la réversion.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detail Section */}
          {celibat.conjointA && celibat.conjointB && (
            <Card variant="default" className="mb-8">
              <CardHeader>
                <CardTitle>Détail du scénario Célibat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-stone-50 rounded-xl p-4">
                    <h4 className="font-medium text-stone-900 mb-3">Conjoint A</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Revenu imposable (après abattements)</dt>
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
                  <div className="bg-stone-50 rounded-xl p-4">
                    <h4 className="font-medium text-stone-900 mb-3">Conjoint B</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Revenu imposable (après abattements)</dt>
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
          )}

          {/* Alertes et Conseils Stratégiques */}
          {results.alerts && (
            <div className="mb-8 space-y-4">
              {/* Alerte IFI */}
              {results.alerts.ifiAlert && (
                <Card
                  variant="elevated"
                  className={`border-2 ${results.alerts.ifiAlert.includes('⚠️')
                    ? 'border-red-200 bg-red-50'
                    : 'border-green-200 bg-green-50'
                    }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      {results.alerts.ifiAlert.includes('⚠️') ? (
                        <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <div>
                        <h3 className={`font-semibold mb-1 ${results.alerts.ifiAlert.includes('⚠️') ? 'text-red-900' : 'text-green-900'
                          }`}>
                          Impôt sur la Fortune Immobilière (IFI)
                        </h3>
                        <p className={`text-sm ${results.alerts.ifiAlert.includes('⚠️') ? 'text-red-700' : 'text-green-700'
                          }`}>
                          {results.alerts.ifiAlert}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Conseil stratégique */}
              {results.alerts.strategicAdvice && (
                <Card variant="elevated" className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Conseil stratégique personnalisé
                        </h3>
                        <p className="text-sm text-blue-700">
                          {results.alerts.strategicAdvice}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Conseils juridiques PACS vs Mariage */}
          {results.legalAdvice && (
            <Card variant="default" className="mb-8">
              <CardHeader>
                <CardTitle>Aspects juridiques : PACS vs Mariage</CardTitle>
                <p className="text-sm text-stone-500 mt-1">
                  Au-delà de la fiscalité, comparez les protections juridiques offertes par chaque statut
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* PACS */}
                  <div className="bg-orange-50 rounded-xl p-5">
                    <h4 className="font-semibold text-orange-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center text-sm">📝</span>
                      PACS
                    </h4>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">🏠 Succession</dt>
                        <dd className="text-stone-600">{results.legalAdvice.pacs.succession}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">💰 Réversion</dt>
                        <dd className="text-stone-600">{results.legalAdvice.pacs.reversion}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">⚖️ Rupture</dt>
                        <dd className="text-stone-600">{results.legalAdvice.pacs.rupture}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Mariage */}
                  <div className="bg-green-50 rounded-xl p-5">
                    <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center text-sm">💍</span>
                      Mariage
                    </h4>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">🏠 Succession</dt>
                        <dd className="text-stone-600">{results.legalAdvice.mariage.succession}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">💰 Réversion</dt>
                        <dd className="text-stone-600">{results.legalAdvice.mariage.reversion}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-stone-700 mb-1">⚖️ Rupture</dt>
                        <dd className="text-stone-600">{results.legalAdvice.mariage.rupture}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-stone-100 rounded-lg">
                  <p className="text-xs text-stone-600">
                    💡 <strong>Important :</strong> Le choix entre PACS et mariage ne doit pas se faire uniquement sur des critères fiscaux.
                    Les aspects juridiques (succession, réversion, prestation compensatoire) peuvent avoir un impact majeur sur votre protection mutuelle.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lien copié !
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partager ce résultat
                </>
              )}
            </Button>
            <Link href="/simulateur">
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Nouvelle simulation
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-stone-100 rounded-xl text-center">
            <p className="text-xs text-stone-500">
              ⚠️ Cette simulation est fournie à titre indicatif uniquement et ne constitue pas un conseil fiscal.
              Les résultats sont basés sur le barème 2024 et peuvent varier selon votre situation réelle.
              Consultez un professionnel pour une analyse personnalisée.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
