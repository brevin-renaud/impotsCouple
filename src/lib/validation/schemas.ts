import { z } from 'zod'

// Schéma pour les options de parts supplémentaires d'un conjoint
export const partsOptionsSchema = z.object({
  // Situation de base
  isInvalid: z.boolean(),           // Contribuable invalide (+0.5)
  isVeteran: z.boolean(),           // Ancien combattant 74+ ans (+0.5)
  isVeteranWidow: z.boolean(),      // Veuf/veuve d'ancien combattant (+0.5)
  isSingleParent: z.boolean(),      // Parent isolé (+0.5 pour 1er enfant)
  hasRaisedChildAlone: z.boolean(), // A élevé un enfant seul 5 ans (+0.5)
})

// Schéma pour les enfants
export const childSchema = z.object({
  isSharedCustody: z.boolean(),     // Garde alternée (divise la part par 2)
  isInvalid: z.boolean(),           // Enfant invalide (+0.5 en plus)
})

// Schéma simplifié de simulation (revenus + options de parts)
export const simulationSchema = z.object({
  // Conjoint A
  incomeA: z
    .number({ message: 'Le revenu du conjoint A est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  partsOptionsA: partsOptionsSchema.optional(),

  // Conjoint B
  incomeB: z
    .number({ message: 'Le revenu du conjoint B est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  partsOptionsB: partsOptionsSchema.optional(),

  // Enfants à charge (commun aux deux conjoints en cas d'union)
  childrenCount: z.number().min(0).max(20).optional(),
  children: z.array(childSchema).optional(),
})

// Type inféré du schéma
export type SimulationFormData = z.infer<typeof simulationSchema>
export type PartsOptions = z.infer<typeof partsOptionsSchema>
export type ChildOptions = z.infer<typeof childSchema>

// Valeurs par défaut
export const defaultPartsOptions: PartsOptions = {
  isInvalid: false,
  isVeteran: false,
  isVeteranWidow: false,
  isSingleParent: false,
  hasRaisedChildAlone: false,
}

export const defaultSimulationValues: SimulationFormData = {
  incomeA: undefined as unknown as number,
  partsOptionsA: defaultPartsOptions,
  incomeB: undefined as unknown as number,
  partsOptionsB: defaultPartsOptions,
  childrenCount: 0,
  children: [],
}

// Fonction pour calculer les parts fiscales d'un célibataire
export function calculateSingleParts(
  options: PartsOptions,
  childrenCount: number,
  children: ChildOptions[] = []
): number {
  // Part de base pour un célibataire
  let parts = 1

  // Parts pour les enfants
  for (let i = 0; i < childrenCount; i++) {
    const child = children[i] || { isSharedCustody: false, isInvalid: false }
    
    // Part de base de l'enfant
    let childPart: number
    if (i < 2) {
      // 1er et 2ème enfant : 0.5 part
      childPart = 0.5
    } else {
      // 3ème enfant et suivants : 1 part
      childPart = 1
    }

    // Garde alternée : divise la part par 2
    if (child.isSharedCustody) {
      childPart = childPart / 2
    }

    // Enfant invalide : +0.5 part (ou +0.25 si garde alternée)
    if (child.isInvalid) {
      childPart += child.isSharedCustody ? 0.25 : 0.5
    }

    parts += childPart
  }

  // Parts supplémentaires pour le contribuable
  if (options.isInvalid) parts += 0.5
  if (options.isVeteran) parts += 0.5
  if (options.isVeteranWidow) parts += 0.5
  if (options.isSingleParent && childrenCount > 0) parts += 0.5
  if (options.hasRaisedChildAlone) parts += 0.5

  return parts
}

// Fonction pour calculer les parts fiscales d'un couple (PACS/Mariage)
export function calculateCoupleParts(
  optionsA: PartsOptions,
  optionsB: PartsOptions,
  childrenCount: number,
  children: ChildOptions[] = []
): number {
  // Part de base pour un couple
  let parts = 2

  // Parts pour les enfants
  for (let i = 0; i < childrenCount; i++) {
    const child = children[i] || { isSharedCustody: false, isInvalid: false }
    
    // Part de base de l'enfant
    let childPart: number
    if (i < 2) {
      // 1er et 2ème enfant : 0.5 part
      childPart = 0.5
    } else {
      // 3ème enfant et suivants : 1 part
      childPart = 1
    }

    // Garde alternée : divise la part par 2
    if (child.isSharedCustody) {
      childPart = childPart / 2
    }

    // Enfant invalide : +0.5 part (ou +0.25 si garde alternée)
    if (child.isInvalid) {
      childPart += child.isSharedCustody ? 0.25 : 0.5
    }

    parts += childPart
  }

  // Parts supplémentaires pour chaque conjoint
  if (optionsA.isInvalid) parts += 0.5
  if (optionsA.isVeteran) parts += 0.5
  if (optionsA.isVeteranWidow) parts += 0.5
  // Note: isSingleParent et hasRaisedChildAlone ne s'appliquent pas en couple

  if (optionsB.isInvalid) parts += 0.5
  if (optionsB.isVeteran) parts += 0.5
  if (optionsB.isVeteranWidow) parts += 0.5

  return parts
}
