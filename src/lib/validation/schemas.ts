import { z } from 'zod'

// Schéma pour un conjoint (étendu avec nouveaux champs)
export const personSchema = z.object({
  income: z
    .number({ message: 'Le revenu est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  fraisReels: z
    .number()
    .min(0, 'Les frais réels ne peuvent pas être négatifs')
    .max(1000000, 'Les frais réels semblent trop élevés'),
  partsSupp: z
    .number()
    .min(0, 'Les parts supplémentaires ne peuvent pas être négatives')
    .max(10, 'Le nombre de parts supplémentaires semble trop élevé'),
  pensionVersee: z
    .number()
    .min(0, 'Les pensions ne peuvent pas être négatives')
    .max(1000000, 'Le montant semble trop élevé'),
  patrimoineImmo: z
    .number()
    .min(0, 'Le patrimoine ne peut pas être négatif')
    .max(100000000, 'Le montant semble trop élevé'),
  epargneRetraite: z
    .number()
    .min(0, "L'épargne retraite ne peut pas être négative")
    .max(500000, 'Le montant semble trop élevé'),
})

// Schéma complet de simulation (tous les champs requis pour le formulaire)
export const simulationSchema = z.object({
  // Conjoint A
  incomeA: z
    .number({ message: 'Le revenu du conjoint A est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  fraisReelsA: z.number().min(0).max(100000).optional(),
  partsA: z.number().min(0).max(10).optional(),
  pensionVerseeA: z.number().min(0).max(1000000).optional(),
  patrimoineImmoA: z.number().min(0).max(100000000).optional(),
  epargneRetraiteA: z.number().min(0).max(500000).optional(),

  // Conjoint B
  incomeB: z
    .number({ message: 'Le revenu du conjoint B est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  fraisReelsB: z.number().min(0).max(100000).optional(),
  partsB: z.number().min(0).max(10).optional(),
  pensionVerseeB: z.number().min(0).max(1000000).optional(),
  patrimoineImmoB: z.number().min(0).max(100000000).optional(),
  epargneRetraiteB: z.number().min(0).max(500000).optional(),

  // Foyer
  children: z
    .number()
    .int('Le nombre d\'enfants doit être un entier')
    .min(0, 'Le nombre d\'enfants ne peut pas être négatif')
    .max(20, 'Le nombre d\'enfants semble trop élevé'),
  gardeAlternee: z
    .boolean(),

  // Charges déductibles et crédits d'impôt
  fraisGardeEnfants: z.number().min(0).max(50000).optional(),
  emploiDomicile: z.number().min(0).max(50000).optional(),
  donsAssociations: z.number().min(0).max(1000000).optional(),
})

// Type inféré du schéma
export type SimulationFormData = z.infer<typeof simulationSchema>

// Schémas pour les étapes du formulaire
export const step1Schema = z.object({
  incomeA: simulationSchema.shape.incomeA,
  fraisReelsA: simulationSchema.shape.fraisReelsA,
  partsA: simulationSchema.shape.partsA,
  pensionVerseeA: simulationSchema.shape.pensionVerseeA,
  patrimoineImmoA: simulationSchema.shape.patrimoineImmoA,
  epargneRetraiteA: simulationSchema.shape.epargneRetraiteA,
})

export const step2Schema = z.object({
  incomeB: simulationSchema.shape.incomeB,
  fraisReelsB: simulationSchema.shape.fraisReelsB,
  partsB: simulationSchema.shape.partsB,
  pensionVerseeB: simulationSchema.shape.pensionVerseeB,
  patrimoineImmoB: simulationSchema.shape.patrimoineImmoB,
  epargneRetraiteB: simulationSchema.shape.epargneRetraiteB,
})

export const step3Schema = z.object({
  children: simulationSchema.shape.children,
  gardeAlternee: simulationSchema.shape.gardeAlternee,
})

export const step4Schema = z.object({
  fraisGardeEnfants: simulationSchema.shape.fraisGardeEnfants,
  emploiDomicile: simulationSchema.shape.emploiDomicile,
  donsAssociations: simulationSchema.shape.donsAssociations,
})

// Types pour chaque étape
export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>

// Valeurs par défaut
export const defaultSimulationValues = {
  incomeA: undefined as unknown as number,
  fraisReelsA: undefined as unknown as number,
  partsA: undefined as unknown as number,
  pensionVerseeA: undefined as unknown as number,
  patrimoineImmoA: undefined as unknown as number,
  epargneRetraiteA: undefined as unknown as number,
  incomeB: undefined as unknown as number,
  fraisReelsB: undefined as unknown as number,
  partsB: undefined as unknown as number,
  pensionVerseeB: undefined as unknown as number,
  patrimoineImmoB: undefined as unknown as number,
  epargneRetraiteB: undefined as unknown as number,
  children: 0,
  gardeAlternee: false,
  fraisGardeEnfants: undefined as unknown as number,
  emploiDomicile: undefined as unknown as number,
  donsAssociations: undefined as unknown as number,
}
