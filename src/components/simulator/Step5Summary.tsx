'use client'

import { UseFormWatch } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { SimulationFormData } from '@/lib/validation/schemas'

interface Step5SummaryProps {
  watch: UseFormWatch<SimulationFormData>
}

export function Step5Summary({ watch }: Step5SummaryProps) {
  const values = watch()

  const formatValue = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '0 €'
    return formatCurrency(value)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Récapitulatif
        </h2>
        <p className="text-stone-600">
          Vérifiez vos informations avant de lancer la simulation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Conjoint A */}
        <Card variant="outlined">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">A</span>
              </div>
              <h3 className="font-semibold text-stone-900">Conjoint A</h3>
            </div>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-stone-500">Revenu net perçu</dt>
                <dd className="text-sm font-medium text-stone-900">
                  {formatValue(values.incomeA)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-stone-500">Déduction fiscale</dt>
                <dd className="text-sm font-medium text-stone-900">
                  {values.fraisReelsA && values.fraisReelsA > 0
                    ? `Frais réels: ${formatValue(values.fraisReelsA)}`
                    : 'Abattement 10%'}
                </dd>
              </div>
              {(values.partsA ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-stone-500">Parts supp.</dt>
                  <dd className="text-sm font-medium text-stone-900">
                    +{values.partsA}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Conjoint B */}
        <Card variant="outlined">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">B</span>
              </div>
              <h3 className="font-semibold text-stone-900">Conjoint B</h3>
            </div>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-stone-500">Revenu net perçu</dt>
                <dd className="text-sm font-medium text-stone-900">
                  {formatValue(values.incomeB)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-stone-500">Déduction fiscale</dt>
                <dd className="text-sm font-medium text-stone-900">
                  {values.fraisReelsB && values.fraisReelsB > 0
                    ? `Frais réels: ${formatValue(values.fraisReelsB)}`
                    : 'Abattement 10%'}
                </dd>
              </div>
              {(values.partsB ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-stone-500">Parts supp.</dt>
                  <dd className="text-sm font-medium text-stone-900">
                    +{values.partsB}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Message explicatif sur l'abattement */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">📊 Calcul du revenu imposable</p>
            <p>
              L'abattement de 10% pour frais professionnels (ou vos frais réels) sera automatiquement 
              déduit de vos revenus nets perçus pour calculer votre revenu imposable final.
            </p>
          </div>
        </div>
      </div>

      {/* Foyer */}
      <Card variant="outlined">
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-semibold text-stone-900">Situation familiale</h3>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-stone-500">Enfants à charge</dt>
              <dd className="text-sm font-medium text-stone-900">
                {values.children || 0} enfant{(values.children || 0) > 1 ? 's' : ''}
              </dd>
            </div>
            {values.gardeAlternee && (
              <div className="flex justify-between">
                <dt className="text-sm text-stone-500">Mode de garde</dt>
                <dd className="text-sm font-medium text-stone-900">
                  Garde alternée
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Charges communes du foyer */}
      {((values.fraisGardeEnfants && values.fraisGardeEnfants > 0) || 
        (values.emploiDomicile && values.emploiDomicile > 0) || 
        (values.donsAssociations && values.donsAssociations > 0)) && (
        <Card variant="outlined" className="bg-green-50">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-stone-900">Charges du foyer (A + B)</h3>
            </div>
            <dl className="space-y-2">
              {values.fraisGardeEnfants && values.fraisGardeEnfants > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-stone-500">Frais de garde</dt>
                  <dd className="text-sm font-medium text-green-700">
                    {formatValue(values.fraisGardeEnfants)}
                  </dd>
                </div>
              )}
              {values.emploiDomicile && values.emploiDomicile > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-stone-500">Emploi à domicile</dt>
                  <dd className="text-sm font-medium text-green-700">
                    {formatValue(values.emploiDomicile)}
                  </dd>
                </div>
              )}
              {values.donsAssociations && values.donsAssociations > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-stone-500">Dons associations</dt>
                  <dd className="text-sm font-medium text-green-700">
                    {formatValue(values.donsAssociations)}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-xs text-green-700">
                💡 Ces dépenses communes réduiront votre impôt via crédits et réductions
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
        <p className="text-xs text-stone-500">
          En cliquant sur &quot;Calculer&quot;, vous acceptez que vos données soient traitées 
          de manière anonyme pour effectuer la simulation. Aucune donnée personnelle n&apos;est collectée.
        </p>
      </div>
    </div>
  )
}
