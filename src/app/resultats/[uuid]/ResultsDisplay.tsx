'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { SimulationResult } from '@/lib/fiscal/calculator'

interface ResultsDisplayProps {
    uuid: string
    results: SimulationResult
    inputs: {
        incomeA: number
        incomeB: number
    }
}

export function ResultsDisplay({ uuid, results, inputs }: ResultsDisplayProps) {
    // Réécrire l'URL pour masquer l'UUID
    useEffect(() => {
        window.history.replaceState(null, '', '/resultats')
    }, [])

    const { celibat, union, bestScenario, gain, message } = results

    const scenarios = [
        {
            key: 'celibat',
            label: 'Celibat',
            sublabel: 'Imposition separee',
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
                            Simulation terminee
                        </div>
                        <h1 className="text-3xl font-bold text-stone-900 mb-2">
                            Vos resultats
                        </h1>
                        <p className="text-stone-600">
                            Revenus declares : {formatCurrency(inputs.incomeA)} + {formatCurrency(inputs.incomeB)}
                        </p>
                    </div>

                    {/* Recommendation Card */}
                    <Card
                        variant="elevated"
                        className={`mb-8 border-2 ${gain > 0
                            ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
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
                                        Economie potentielle : <span className="text-green-600">{formatCurrency(gain)}/an</span>
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

                    {/* Detail Section */}
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
                                <div className="bg-stone-50 rounded-xl p-4">
                                    <h4 className="font-medium text-stone-900 mb-3">Conjoint B</h4>
                                    <dl className="space-y-2 text-sm">
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
                    <Card variant="default" className="mb-8">
                        <CardHeader>
                            <CardTitle>Détail du scénario Union</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-orange-50 rounded-xl p-4">
                                <h4 className="font-medium text-stone-900 mb-3">Foyer fiscal commun</h4>
                                <dl className="space-y-2 text-sm">
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
                    <div className="grid gap-4 mb-8 md:grid-cols-2">
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

                                    {scenario.key === 'celibat' && (
                                        <div className="mt-4 pt-4 border-t border-stone-100 text-sm text-stone-600">
                                            <p>Conjoint A : {formatCurrency(celibat.taxA)}</p>
                                            <p>Conjoint B : {formatCurrency(celibat.taxB)}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Info juridique */}
                    <Card variant="default" className="mb-8">
                        <CardHeader>
                            <CardTitle>Bon a savoir</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-stone-600">
                                <p>
                                    <strong>Sur le plan fiscal</strong>, le PACS et le mariage sont strictement identiques :
                                    declaration commune et meme bareme d&apos;imposition.
                                </p>
                                <p>
                                    <strong>Les differences sont juridiques</strong> : succession, pension de reversion,
                                    prestation compensatoire en cas de separation, etc.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="default" className="mb-8">
                        <CardHeader>
                            <CardTitle>PACS ou Mariage ? Différences juridiques</CardTitle>
                            <p className="text-sm text-stone-600 mt-1">
                                Sur le plan fiscal, PACS et mariage sont strictement identiques. Voici les différences juridiques pour vous aider à choisir :
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


                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/resultats/${uuid}/partage`}>
                            <Button variant="outline">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Partager ce résultat
                            </Button>
                        </Link>
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
                            Cette simulation est fournie a titre indicatif uniquement et ne constitue pas un conseil fiscal.
                            Les resultats sont bases sur le bareme 2025 et peuvent varier selon votre situation reelle.
                            Consultez un professionnel pour une analyse personnalisee.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
