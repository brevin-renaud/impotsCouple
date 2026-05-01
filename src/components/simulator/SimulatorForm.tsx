'use client'

import { Fragment } from 'react'
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { Input, Button, Checkbox } from '@/components/ui'
import { PartsCalculator } from './PartsCalculator'
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
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: 'Conjoint A' },
    { number: 2, label: 'Conjoint B' },
  ]

  return (
    <div className="mb-6 sm:mb-8" aria-label="Progression du formulaire">
      <ol className="flex items-center justify-between list-none p-0 m-0">
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <li className="flex items-center" aria-current={currentStep === step.number ? 'step' : undefined}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-colors ${
                    currentStep === step.number
                      ? 'bg-orange-500 text-white'
                      : currentStep > step.number
                        ? 'bg-orange-400 text-white'
                        : 'bg-stone-200 text-stone-500'
                  }`}
                  aria-label={
                    currentStep > step.number
                      ? `Étape ${step.number} ${step.label} : complétée`
                      : currentStep === step.number
                        ? `Étape ${step.number} ${step.label} : en cours`
                        : `Étape ${step.number} ${step.label} : à venir`
                  }
                >
                  {currentStep > step.number ? (
                    <svg aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span aria-hidden="true">{step.number}</span>
                  )}
                </div>
                <span
                  className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium ${
                    currentStep === step.number ? 'text-orange-600' : currentStep > step.number ? 'text-orange-500' : 'text-stone-500'
                  }`}
                  aria-hidden="true"
                >
                  {step.label}
                </span>
              </div>
            </li>
            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={`flex-1 h-0.5 sm:h-1 mx-2 rounded ${
                  currentStep > step.number ? 'bg-orange-400' : 'bg-stone-200'
                }`}
              />
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

// Step 1: Conjoint A
function StepConjointA({ register, watch, setValue, errors }: Omit<SimulatorFormProps, 'currentStep' | 'onNextStep' | 'onPrevStep'>) {
  const partsOptionsA = watch('partsOptionsA') || defaultPartsOptions
  const childrenCountA = watch('childrenCountA') || 0
  const childrenA = watch('childrenA') || []
  const calculatedParts = calculateSingleParts(partsOptionsA, childrenCountA, childrenA)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-1 sm:mb-2">
          Informations du Conjoint A
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm">
          Renseignez les revenus, enfants à charge et la situation fiscale
        </p>
      </div>

      <div className="bg-orange-50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-semibold text-sm sm:text-base">A</span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm sm:text-base">Conjoint A</h3>
        </div>

        <div className="space-y-3 sm:space-y-4">
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
  const childrenCountB = watch('childrenCountB') || 0
  const childrenB = watch('childrenB') || []
  const calculatedParts = calculateSingleParts(partsOptionsB, childrenCountB, childrenB)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-1 sm:mb-2">
          Informations du Conjoint B
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm">
          Renseignez les revenus, enfants à charge et la situation fiscale
        </p>
      </div>

      <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-stone-200 rounded-full flex items-center justify-center">
            <span className="text-stone-600 font-semibold text-sm sm:text-base">B</span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm sm:text-base">Conjoint B</h3>
        </div>

        <div className="space-y-3 sm:space-y-4">
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

      {/* Consentement données */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-xs sm:text-sm text-stone-600">
              <p className="font-medium text-stone-700 mb-1">Confidentialité totale</p>
              <p>
                Vos données sont <strong>100% privées</strong> : elles ne sont <strong>jamais stockées sur nos serveurs</strong>. 
                Le calcul est effectué localement et vos informations sont uniquement transportées dans le lien de partage (chiffré).
              </p>
            </div>
          </div>
          
          <div className="pt-2 border-t border-stone-200">
            <Checkbox
              {...register('consentData')}
              label="J'accepte les conditions d'utilisation"
              description="Requis pour effectuer la simulation"
            />
            {errors.consentData && (
              <p className="mt-2 text-xs sm:text-sm text-red-600">
                {errors.consentData.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimulatorForm({ register, watch, setValue, errors, currentStep, onNextStep, onPrevStep }: SimulatorFormProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <StepConjointA register={register} watch={watch} setValue={setValue} errors={errors} />
      )}
      {currentStep === 2 && (
        <StepConjointB register={register} watch={watch} setValue={setValue} errors={errors} />
      )}

      <div className="flex justify-between pt-4 sm:pt-6 border-t border-stone-100">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevStep}
            size="sm"
          >
            <svg aria-hidden="true" className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Précédent</span>
            <span className="sm:hidden">Retour</span>
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 2 ? (
          <Button
            type="button"
            onClick={onNextStep}
            size="sm"
          >
            Suivant
            <svg aria-hidden="true" className="w-4 h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        ) : null}
      </div>
    </div>
  )
}
