'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui'
import type { SimulationFormData } from '@/lib/validation/schemas'

interface Step4FormProps {
  register: UseFormRegister<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
}

export function Step4Form({ register, errors }: Step4FormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Charges déductibles & Crédits d'impôt
        </h2>
        <p className="text-stone-600">
          Dépenses communes du foyer ouvrant droit à crédit ou réduction d'impôt
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-2">💡 Dépenses du foyer (les 2 conjoints ensemble)</p>
            <p className="mb-2">
              Indiquez ici le <strong>total des dépenses du couple</strong>, peu importe qui a payé. 
              Ces avantages fiscaux sont calculés sur la déclaration commune (Union) ou répartis 
              équitablement entre les deux déclarations séparées (Célibat).
            </p>
            <p className="text-xs text-blue-700">
              Exemple : Si vous payez ensemble 4 000€ de frais de garde, indiquez 4 000€ (pas 2 000€ chacun).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-orange-800">
            <p className="font-medium mb-1">Ces champs sont tous optionnels</p>
            <p>Laissez vide si vous n'avez pas de dépenses dans ces catégories.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Garde d'enfants
          </h3>
          <Input
            label="Frais de garde du foyer (total des 2 conjoints)"
            type="number"
            placeholder="0"
            error={errors.fraisGardeEnfants?.message}
            hint="Crédit d'impôt de 50% plafonné à 1 750 € par enfant"
            infoTooltip="Montant TOTAL payé par le couple pour la garde des enfants de moins de 6 ans (crèche, assistante maternelle, garde à domicile). Crédit d'impôt de 50% dans la limite de 1 750€ par enfant."
            {...register('fraisGardeEnfants', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
          />
        </div>

        <div className="pt-4 border-t border-stone-100">
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Emploi à domicile
          </h3>
          <Input
            label="Dépenses d'emploi à domicile du foyer (total)"
            type="number"
            placeholder="0"
            error={errors.emploiDomicile?.message}
            hint="Crédit d'impôt de 50% plafonné à 6 000 €"
            infoTooltip="Montant TOTAL payé par le couple pour les services à la personne (ménage, jardinage, aide à domicile, etc.). Crédit d'impôt de 50% plafonné à 12 000€ de dépenses (soit 6 000€ de crédit max)."
            {...register('emploiDomicile', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
          />
        </div>

        <div className="pt-4 border-t border-stone-100">
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Dons aux associations
          </h3>
          <Input
            label="Dons du foyer aux associations (total des 2 conjoints)"
            type="number"
            placeholder="0"
            error={errors.donsAssociations?.message}
            hint="Réduction d'impôt de 66% plafonnée à 20% du revenu imposable"
            infoTooltip="Montant TOTAL des dons faits par le couple aux associations d'intérêt général (Croix-Rouge, Restos du Cœur, etc.). Réduction d'impôt de 66% dans la limite de 20% de votre revenu imposable."
            {...register('donsAssociations', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-800">
            <strong>Bon à savoir :</strong> Ces avantages fiscaux sont cumulables. En cas d'union (PACS/Mariage), ils s'appliquent directement sur votre déclaration commune. En célibat, ils sont répartis équitablement entre vos deux déclarations.
          </p>
        </div>
      </div>
    </div>
  )
}
