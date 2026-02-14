'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { SimulationResult } from '@/lib/fiscal/calculator'

interface SharePageClientProps {
  uuid: string
  results: SimulationResult
  inputs: {
    incomeA: number
    incomeB: number
  }
}

export function SharePageClient({ uuid, results, inputs }: SharePageClientProps) {
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/resultats/${uuid}`
    : ''

  const trackAction = async (actionType: 'share_link' | 'generate_pdf') => {
    try {
      await fetch('/api/user-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulationId: uuid, actionType }),
      })
    } catch (error) {
      console.error('Error tracking action:', error)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
      // Track share link action
      await trackAction('share_link')
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  const { celibat, union, bestScenario, gain, message } = results

  // Fonction de formatage spéciale pour PDF (évite les caractères spéciaux)
  const formatForPDF = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount)).replace(/\s/g, ' ') + ' €'
  }

  const handleDownloadPDF = async () => {
    setGenerating(true)
    
    try {
      const { default: jsPDF } = await import('jspdf')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = 210
      const margin = 20
      const contentWidth = pageWidth - 2 * margin
      let y = 20

      // Couleurs
      const orange = [249, 115, 22] as [number, number, number]
      const green = [22, 163, 74] as [number, number, number]
      const gray = [87, 83, 78] as [number, number, number]
      const darkGray = [28, 25, 23] as [number, number, number]

      // Titre
      pdf.setFontSize(24)
      pdf.setTextColor(...darkGray)
      pdf.text('Simulation Fiscale', pageWidth / 2, y, { align: 'center' })
      y += 8

      pdf.setFontSize(14)
      pdf.setTextColor(...orange)
      pdf.text('ImpotsCouple', pageWidth / 2, y, { align: 'center' })
      y += 10

      // Date
      pdf.setFontSize(10)
      pdf.setTextColor(...gray)
      const dateStr = new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      pdf.text(`Généré le ${dateStr}`, pageWidth / 2, y, { align: 'center' })
      y += 15

      // Ligne de séparation
      pdf.setDrawColor(229, 231, 235)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 15

      // Section Revenus
      pdf.setFontSize(14)
      pdf.setTextColor(...darkGray)
      pdf.text('Revenus déclarés', margin, y)
      y += 10

      pdf.setFontSize(11)
      pdf.setTextColor(...gray)
      pdf.text(`Conjoint A : ${formatForPDF(inputs.incomeA)}`, margin, y)
      y += 6
      pdf.text(`Conjoint B : ${formatForPDF(inputs.incomeB)}`, margin, y)
      y += 6
      pdf.text(`Total : ${formatForPDF(inputs.incomeA + inputs.incomeB)}`, margin, y)
      y += 15

      // Résultat principal
      pdf.setFillColor(255, 247, 237) // orange-50
      pdf.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F')
      y += 10

      pdf.setFontSize(12)
      pdf.setTextColor(...darkGray)
      pdf.text('Résultat de la simulation', margin + 5, y)
      y += 8

      if (gain > 0) {
        pdf.setFontSize(16)
        pdf.setTextColor(...green)
        pdf.text(`Économie potentielle : ${formatForPDF(gain)}/an`, margin + 5, y)
        y += 8
        pdf.setFontSize(10)
        pdf.setTextColor(...gray)
        const messageLines = pdf.splitTextToSize(message, contentWidth - 10)
        pdf.text(messageLines, margin + 5, y)
      } else {
        pdf.setFontSize(14)
        pdf.setTextColor(...darkGray)
        const messageLines = pdf.splitTextToSize(message, contentWidth - 10)
        pdf.text(messageLines, margin + 5, y)
      }
      y += 25

      // Comparaison des scénarios
      pdf.setFontSize(14)
      pdf.setTextColor(...darkGray)
      pdf.text('Comparaison des scénarios', margin, y)
      y += 12

      // Scénario Célibat
      const boxWidth = (contentWidth - 10) / 2
      const boxHeight = 45
      
      pdf.setDrawColor(229, 231, 235)
      pdf.setFillColor(250, 250, 249)
      pdf.roundedRect(margin, y, boxWidth, boxHeight, 2, 2, 'FD')
      
      pdf.setFontSize(12)
      pdf.setTextColor(...darkGray)
      pdf.text('Célibat', margin + 5, y + 10)
      
      pdf.setFontSize(18)
      pdf.text(formatForPDF(celibat.totalTax), margin + 5, y + 22)
      
      pdf.setFontSize(9)
      pdf.setTextColor(...gray)
      pdf.text(`${celibat.partsA + celibat.partsB} parts fiscales`, margin + 5, y + 30)
      pdf.text(`A: ${formatForPDF(celibat.taxA)} | B: ${formatForPDF(celibat.taxB)}`, margin + 5, y + 38)

      // Scénario Union
      const unionX = margin + boxWidth + 10
      if (bestScenario === 'couple') {
        pdf.setDrawColor(...orange)
        pdf.setFillColor(255, 247, 237)
      } else {
        pdf.setDrawColor(229, 231, 235)
        pdf.setFillColor(250, 250, 249)
      }
      pdf.roundedRect(unionX, y, boxWidth, boxHeight, 2, 2, 'FD')
      
      pdf.setFontSize(12)
      pdf.setTextColor(...darkGray)
      pdf.text('Union (PACS/Mariage)', unionX + 5, y + 10)
      
      pdf.setFontSize(18)
      if (bestScenario === 'couple') {
        pdf.setTextColor(...orange)
      }
      pdf.text(formatForPDF(union.totalTax), unionX + 5, y + 22)
      
      pdf.setFontSize(9)
      pdf.setTextColor(...gray)
      pdf.text(`${union.parts} parts fiscales`, unionX + 5, y + 30)
      
      if (bestScenario === 'couple') {
        pdf.setTextColor(...orange)
        pdf.text('Le plus avantageux', unionX + 5, y + 38)
      }

      y += boxHeight + 20

      // Footer
      pdf.setDrawColor(229, 231, 235)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 8

      pdf.setFontSize(8)
      pdf.setTextColor(...gray)
      pdf.text('Cette simulation est fournie à titre indicatif uniquement et ne constitue pas un conseil fiscal.', pageWidth / 2, y, { align: 'center' })
      y += 4
      pdf.text('Basée sur le barème 2025 - impotscouple.fr', pageWidth / 2, y, { align: 'center' })

      pdf.save(`simulation-fiscale-${new Date().toISOString().split('T')[0]}.pdf`)
      // Track PDF generation action
      await trackAction('generate_pdf')
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href={`/resultats/${uuid}`}
              className="inline-flex items-center text-sm text-stone-500 hover:text-orange-600 mb-4"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux résultats
            </Link>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Partager vos résultats
            </h1>
            <p className="text-stone-600">
              Copiez le lien ou téléchargez un PDF de votre simulation
            </p>
          </div>

          {/* Options de partage */}
          <div className="space-y-6">
            {/* Copier le lien */}
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900 mb-1">Copier le lien</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Partagez ce lien avec qui vous voulez. Il restera valide pendant 30 jours.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-600 truncate"
                      />
                      <Button onClick={handleCopy} variant={copied ? 'primary' : 'outline'}>
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
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Télécharger PDF */}
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900 mb-1">Télécharger en PDF</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Téléchargez un résumé de votre simulation au format PDF pour le conserver.
                    </p>
                    <Button onClick={handleDownloadPDF} disabled={generating}>
                      {generating ? (
                        <>
                          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Télécharger le PDF
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
