'use client'

import BannerAd from '@/components/bannerAd/bannerAd'
import { SimulatorForm } from '@/components/simulator'
import { Button, Card, CardContent } from '@/components/ui'
import { 
  defaultSimulationValues, 
  simulationSchema, 
  defaultPartsOptions,
  type SimulationFormData 
} from '@/lib/validation/schemas'
import { generateTinyURL, type SimulationData } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SimulateurPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: defaultSimulationValues,
    mode: 'onBlur',
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextStep = async () => {
    let isValid = true
    
    // Validation par étape
    if (currentStep === 1) {
      isValid = await trigger('incomeA')
    } else if (currentStep === 2) {
      isValid = await trigger('incomeB')
    }

    if (isValid && currentStep < 2) {
      setCurrentStep(currentStep + 1)
      scrollToTop()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      scrollToTop()
    }
  }

  const onSubmit = async (data: SimulationFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Récupérer les options de parts
      const partsOptionsA = data.partsOptionsA || defaultPartsOptions
      const partsOptionsB = data.partsOptionsB || defaultPartsOptions
      
      // Enfants de chaque conjoint
      const childrenCountA = data.childrenCountA || 0
      const childrenA = data.childrenA || []
      const childrenCountB = data.childrenCountB || 0
      const childrenB = data.childrenB || []

      // Construire l'objet SimulationData pour l'URL
      const simulationData: SimulationData = {
        incomeA: data.incomeA || 0,
        incomeB: data.incomeB || 0,
        specialSituationsA: partsOptionsA,
        specialSituationsB: partsOptionsB,
        childrenCountA,
        childrenCountB,
        childrenA,
        childrenB,
      }

      // Générer l'URL avec les données encodées
      const tinyUrl = generateTinyURL(simulationData)

      // Redirection vers la page de résultats avec les données dans l'URL
      router.push(tinyUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Simulateur fiscal
            </h1>
            <p className="text-stone-600 text-sm sm:text-base">
              Comparez l&apos;impact du célibat et de l&apos;union sur vos impôts
            </p>
          </div>

          {/* Form */}
          <Card variant="elevated">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimulatorForm 
                  register={register} 
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  currentStep={currentStep}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />

                {/* Error message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button - Only on last step */}
                {currentStep === 2 && (
                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <Button type="submit" isLoading={isSubmitting} className="w-full">
                      {isSubmitting ? 'Calcul en cours...' : 'Calculer mes impôts'}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <BannerAd />

          {/* Disclaimer */}
          <p className="text-center text-xs text-stone-400 mt-6">
            Simulation basée sur le barème fiscal 2025. Résultats à titre indicatif uniquement.
          </p>
        </div>
      </div>
    </div>
  )
}
