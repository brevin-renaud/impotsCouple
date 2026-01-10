'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Select, Checkbox } from '@/components/ui'
import type { SimulationFormData } from '@/lib/validation/schemas'

interface Step3FormProps {
  register: UseFormRegister<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
}

export function Step3Form({ register, errors }: Step3FormProps) {
  const childrenOptions = [
    { value: 0, label: 'Aucun enfant' },
    { value: 1, label: '1 enfant' },
    { value: 2, label: '2 enfants' },
    { value: 3, label: '3 enfants' },
    { value: 4, label: '4 enfants' },
    { value: 5, label: '5 enfants' },
    { value: 6, label: '6 enfants ou plus' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Situation familiale
        </h2>
        <p className="text-stone-600">
          Renseignez le nombre d&apos;enfants à charge
        </p>
      </div>

      <Select
        label="Nombre d'enfants à charge"
        options={childrenOptions}
        error={errors.children?.message}
        {...register('children', { valueAsNumber: true })}
      />

      <div className="bg-stone-50 rounded-xl p-4">
        <Checkbox
          label="Garde alternée"
          description="Les enfants sont en garde alternée (parts divisées par 2)"
          {...register('gardeAlternee')}
        />
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-orange-900">Bon à savoir</h4>
            <p className="text-sm text-orange-700 mt-1">
              Les 2 premiers enfants donnent droit à 0,5 part chacun. 
              À partir du 3ème enfant, chaque enfant donne droit à 1 part.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
