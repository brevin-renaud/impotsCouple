'use client'

import {
  Step1Form,
  Step2Form,
  Step3Form,
  Step4Form,
  StepIndicator,
} from '@/components/simulator'
import { Button, Card, CardContent } from '@/components/ui'
import { defaultSimulationValues, simulationSchema, type SimulationFormData } from '@/lib/validation/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const STEPS = [
  { label: 'Conjoint A' },
  { label: 'Conjoint B' },
  { label: 'Famille' },
  { label: 'Charges & Crédits' },
]

export default function SimulateurPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: defaultSimulationValues,
    mode: 'onBlur',
  })

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof SimulationFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['incomeA', 'fraisReelsA', 'partsA', 'pensionVerseeA', 'patrimoineImmoA', 'epargneRetraiteA']
        break
      case 2:
        fieldsToValidate = ['incomeB', 'fraisReelsB', 'partsB', 'pensionVerseeB', 'patrimoineImmoB', 'epargneRetraiteB']
        break
      case 3:
        fieldsToValidate = ['children', 'gardeAlternee']
        break
      case 4:
        fieldsToValidate = ['fraisGardeEnfants', 'emploiDomicile', 'donsAssociations']
        break
    }

    return await trigger(fieldsToValidate)
  }

  const nextStep = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (data: SimulationFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Nettoyer les données avant l'envoi
      const cleanedData: SimulationFormData = {
        incomeA: data.incomeA || 0,
        fraisReelsA: data.fraisReelsA || 0,
        partsA: data.partsA || 0,
        pensionVerseeA: data.pensionVerseeA || 0,
        patrimoineImmoA: data.patrimoineImmoA || 0,
        epargneRetraiteA: data.epargneRetraiteA || 0,
        incomeB: data.incomeB || 0,
        fraisReelsB: data.fraisReelsB || 0,
        partsB: data.partsB || 0,
        pensionVerseeB: data.pensionVerseeB || 0,
        patrimoineImmoB: data.patrimoineImmoB || 0,
        epargneRetraiteB: data.epargneRetraiteB || 0,
        children: data.children || 0,
        gardeAlternee: data.gardeAlternee || false,
        fraisGardeEnfants: data.fraisGardeEnfants || 0,
        emploiDomicile: data.emploiDomicile || 0,
        donsAssociations: data.donsAssociations || 0,
      }

      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la simulation')
      }

      // Redirection vers la page de résultats
      router.push(`/resultats/${result.uuid}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form register={register} errors={errors} />
      case 2:
        return <Step2Form register={register} errors={errors} />
      case 3:
        return <Step3Form register={register} errors={errors} />
      case 4:
        return <Step4Form register={register} errors={errors} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Simulateur fiscal
            </h1>
            <p className="text-stone-600">
              Comparez l&apos;impact du célibat, PACS et mariage sur vos impôts
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={STEPS.length}
              labels={STEPS.map((s) => s.label)}
            />
          </div>

          {/* Form */}
          <Card variant="elevated">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStep()}

                {/* Error message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Précédent
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={nextStep}>
                      Suivant
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  ) : (
                    <Button type="submit" isLoading={isSubmitting}>
                      {isSubmitting ? 'Calcul en cours...' : 'Calculer mes impôts'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <p className="text-center text-xs text-stone-400 mt-6">
            Simulation basée sur le barème fiscal 2024. Résultats à titre indicatif uniquement.
          </p>
        </div>
      </div>
    </div>
  )
}
