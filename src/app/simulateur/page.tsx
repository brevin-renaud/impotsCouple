'use client'

import { SimulatorForm } from '@/components/simulator'
import { Button, Card, CardContent } from '@/components/ui'
import { defaultSimulationValues, simulationSchema, type SimulationFormData } from '@/lib/validation/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SimulateurPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: defaultSimulationValues,
    mode: 'onBlur',
  })

  const onSubmit = async (data: SimulationFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const cleanedData: SimulationFormData = {
        incomeA: data.incomeA || 0,
        partsA: data.partsA || 0,
        incomeB: data.incomeB || 0,
        partsB: data.partsB || 0,
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
              Comparez l&apos;impact du célibat et de l&apos;union sur vos impôts
            </p>
          </div>

          {/* Form */}
          <Card variant="elevated">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimulatorForm register={register} errors={errors} />

                {/* Error message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <Button type="submit" isLoading={isSubmitting} className="w-full">
                    {isSubmitting ? 'Calcul en cours...' : 'Calculer mes impôts'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <p className="text-center text-xs text-stone-400 mt-6">
            Simulation basée sur le barème fiscal 2025. Résultats à titre indicatif uniquement.
          </p>
        </div>
      </div>
    </div>
  )
}
