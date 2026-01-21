'use client'

import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { Input, Button } from '@/components/ui'
import { PartsCalculator, ChildrenSection } from './PartsCalculator'
import type { SimulationFormData } from '@/lib/validation/schemas'
import { calculateSingleParts, defaultPartsOptions } from '@/lib/validation/schemas'

interface SimulatorFormProps {
  register: UseFormRegister<SimulationFormData>
  watch: UseFormWatch<SimulationFormData>
  setValue: UseFormSetValue<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
  currentStep: number
  onNextStep: () => void
  onPrevStep: () => void
}

// Composant Step Indicator
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = [
    { number: 1, label: 'Conjoint A' },
    { number: 2, label: 'Conjoint B' },
    { number: 3, label: 'Enfants' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  currentStep === step.number
                    ? 'bg-orange-500 text-white'
                    : currentStep > step.number
                    ? 'bg-orange-400 text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep === step.number ? 'text-orange-600' : currentStep > step.number ? 'text-orange-500' : 'text-stone-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded ${
                  currentStep > step.number ? 'bg-orange-400' : 'bg-stone-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Step 1: Conjoint A
function StepConjointA({ register, watch, setValue, errors }: Omit<SimulatorFormProps, 'currentStep' | 'onNextStep' | 'onPrevStep'>) {
  const partsOptionsA = watch('partsOptionsA') || defaultPartsOptions
  const childrenCount = watch('childrenCount') || 0
  const children = watch('children') || []
  const calculatedParts = calculateSingleParts(partsOptionsA, childrenCount, children)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Informations du Conjoint A
        </h2>
        <p className="text-stone-600 text-sm">
          Renseignez les revenus et la situation fiscale
        </p>
      </div>

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
            hint="Revenu net imposable annuel (visible sur votre avis d'imposition)"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            {...register('incomeA', { valueAsNumber: true })}
          />

          <PartsCalculator
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            person="A"
          />
        </div>
      </div>
    </div>
  )
}

// Step 2: Conjoint B
function StepConjointB({ register, watch, setValue, errors }: Omit<SimulatorFormProps, 'currentStep' | 'onNextStep' | 'onPrevStep'>) {
  const partsOptionsB = watch('partsOptionsB') || defaultPartsOptions
  const calculatedParts = calculateSingleParts(partsOptionsB, 0, [])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Informations du Conjoint B
        </h2>
        <p className="text-stone-600 text-sm">
          Renseignez les revenus et la situation fiscale
        </p>
      </div>

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
            hint="Revenu net imposable annuel (visible sur votre avis d'imposition)"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            {...register('incomeB', { valueAsNumber: true })}
          />

          <PartsCalculator
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            person="B"
          />
        </div>
      </div>
    </div>
  )
}

// Step 3: Enfants
function StepEnfants({ register, watch, setValue, errors }: Omit<SimulatorFormProps, 'currentStep' | 'onNextStep' | 'onPrevStep'>) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Enfants à charge
        </h2>
        <p className="text-stone-600 text-sm">
          Renseignez les informations sur vos enfants à charge
        </p>
      </div>

      <ChildrenSection 
        register={register} 
        watch={watch} 
        setValue={setValue} 
        errors={errors} 
      />

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
              Les parts fiscales sont calculées automatiquement selon vos situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimulatorForm({ register, watch, setValue, errors, currentStep, onNextStep, onPrevStep }: SimulatorFormProps) {
  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={3} />

      {/* Step Content */}
      {currentStep === 1 && (
        <StepConjointA register={register} watch={watch} setValue={setValue} errors={errors} />
      )}
      {currentStep === 2 && (
        <StepConjointB register={register} watch={watch} setValue={setValue} errors={errors} />
      )}
      {currentStep === 3 && (
        <StepEnfants register={register} watch={watch} setValue={setValue} errors={errors} />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-stone-100">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevStep}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={onNextStep}
          >
            Suivant
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        ) : null}
      </div>
    </div>
  )
}
