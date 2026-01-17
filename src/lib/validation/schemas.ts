import { z } from 'zod'

// Schéma simplifié de simulation (revenus + parts uniquement)
export const simulationSchema = z.object({
  // Conjoint A
  incomeA: z
    .number({ message: 'Le revenu du conjoint A est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  partsA: z.number().min(0).max(10).optional(),

  // Conjoint B
  incomeB: z
    .number({ message: 'Le revenu du conjoint B est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  partsB: z.number().min(0).max(10).optional(),
})

// Type inféré du schéma
export type SimulationFormData = z.infer<typeof simulationSchema>

// Valeurs par défaut
export const defaultSimulationValues = {
  incomeA: undefined as unknown as number,
  partsA: undefined as unknown as number,
  incomeB: undefined as unknown as number,
  partsB: undefined as unknown as number,
}
