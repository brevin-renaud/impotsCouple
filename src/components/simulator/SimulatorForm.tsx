'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui'
import type { SimulationFormData } from '@/lib/validation/schemas'

interface SimulatorFormProps {
  register: UseFormRegister<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
}

export function SimulatorForm({ register, errors }: SimulatorFormProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Simulation fiscale
        </h2>
        <p className="text-stone-600">
          Renseignez les revenus et parts fiscales de chaque conjoint
        </p>
      </div>

      {/* Conjoint A */}
      <div className="bg-orange-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-semibold">A</span>
          </div>
          <h3 className="font-semibold text-stone-900">Conjoint A</h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Revenu net annuel imposable"
            type="number"
            placeholder="Ex: 35000"
            error={errors.incomeA?.message}
            hint="Revenu net imposable annuel"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            {...register('incomeA', { valueAsNumber: true })}
          />

          <Input
            label="Parts fiscales supplémentaires (optionnel)"
            type="number"
            step="0.5"
            placeholder="0"
            error={errors.partsA?.message}
            hint="Ex: 0.5 pour un enfant en garde exclusive, 0.25 pour garde alternée..."
            infoTooltip="Parts supplémentaires pour enfants à charge, invalidité, ancien combattant, etc. Les 2 premiers enfants donnent 0.5 part chacun, puis 1 part à partir du 3ème."
            {...register('partsA', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
          />
        </div>
      </div>

      {/* Conjoint B */}
      <div className="bg-stone-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
            <span className="text-stone-600 font-semibold">B</span>
          </div>
          <h3 className="font-semibold text-stone-900">Conjoint B</h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Revenu net annuel imposable"
            type="number"
            placeholder="Ex: 28000"
            error={errors.incomeB?.message}
            hint="Revenu net imposable annuel"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            {...register('incomeB', { valueAsNumber: true })}
          />

          <Input
            label="Parts fiscales supplémentaires (optionnel)"
            type="number"
            step="0.5"
            placeholder="0"
            error={errors.partsB?.message}
            hint="Ex: 0.5 pour un enfant en garde exclusive, 0.25 pour garde alternée..."
            infoTooltip="Parts supplémentaires pour enfants à charge, invalidité, ancien combattant, etc. Les 2 premiers enfants donnent 0.5 part chacun, puis 1 part à partir du 3ème."
            {...register('partsB', { setValueAs: (v) => v === '' || isNaN(v) ? undefined : Number(v) })}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">💡 Comment ça marche ?</p>
            <p>
              Nous comparons l&apos;impôt que vous payeriez séparément (célibataires) 
              versus ensemble (PACS ou mariage) pour déterminer la situation la plus avantageuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
