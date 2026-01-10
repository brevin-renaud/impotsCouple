'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui'
import type { SimulationFormData } from '@/lib/validation/schemas'

interface Step2FormProps {
  register: UseFormRegister<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
}

export function Step2Form({ register, errors }: Step2FormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Revenus du Conjoint B
        </h2>
        <p className="text-stone-600">
          Renseignez les revenus nets perçus (avant abattement fiscal)
        </p>
      </div>

      <Input
        label="Revenu net annuel (avant abattement 10%)"
        type="number"
        placeholder="Ex: 28000"
        error={errors.incomeB?.message}
        hint="Salaires et traitements nets versés (ligne 1BJ sur la déclaration)"
        infoTooltip="Indiquez votre revenu NET AVANT abattement : c'est le montant de vos salaires nets perçus dans l'année (total des fiches de paie). L'abattement de 10% pour frais professionnels sera automatiquement appliqué dans le calcul, sauf si vous choisissez les frais réels."
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        {...register('incomeB', { valueAsNumber: true })}
      />

      <Input
        label="Frais réels (optionnel)"
        type="number"
        placeholder="0"
        error={errors.fraisReelsB?.message}
        hint="Laissez 0 pour bénéficier de l'abattement forfaitaire de 10%"
        infoTooltip="Les frais réels sont vos dépenses professionnelles réelles (transport, repas, etc.). Ne remplissez que si vos frais dépassent 10% de vos revenus."
        {...register('fraisReelsB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
      />

      <Input
        label="Parts supplémentaires (optionnel)"
        type="number"
        step="0.5"
        placeholder="0"
        error={errors.partsB?.message}
        hint="Ex: 0.5 pour invalidité, ancien combattant..."
        infoTooltip="Vous avez droit à une demi-part supplémentaire si vous êtes invalide (carte mobilité inclusion), titulaire d'une pension militaire d'invalidité, ou ancien combattant de plus de 74 ans."
        {...register('partsB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
      />

      <div className="pt-4 border-t border-stone-100">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">Déductions fiscales</h3>
        
        <Input
          label="Pensions alimentaires versées (optionnel)"
          type="number"
          placeholder="0"
          error={errors.pensionVerseeB?.message}
          hint="Montant annuel des pensions déductibles"
          infoTooltip="Pensions versées à un ex-conjoint ou pour l'entretien d'un enfant majeur. Ces montants sont déductibles de vos revenus imposables."
          {...register('pensionVerseeB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
        />

        <Input
          label="Épargne retraite - PER/PERP (optionnel)"
          type="number"
          placeholder="0"
          error={errors.epargneRetraiteB?.message}
          hint="Versements déductibles sur PER, PERP, Madelin..."
          infoTooltip="Les versements sur un Plan d'Épargne Retraite (PER), PERP ou contrat Madelin sont déductibles de vos revenus dans la limite d'un plafond annuel."
          {...register('epargneRetraiteB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
        />

        <Input
          label="Patrimoine immobilier (optionnel)"
          type="number"
          placeholder="0"
          error={errors.patrimoineImmoB?.message}
          hint="Valeur totale du patrimoine immobilier (pour alerte IFI)"
          infoTooltip="Valeur de vos biens immobiliers (résidences secondaires, investissements locatifs, etc.). Si le patrimoine du couple dépasse 1,3M€, vous serez soumis à l'IFI."
          {...register('patrimoineImmoB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
        />
      </div>
    </div>
  )
}
