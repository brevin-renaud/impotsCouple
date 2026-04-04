import { z } from 'zod'

// Schéma simplifié pour les situations particulières
// Clés courtes : i=invalide, v=ancien combattant, w=veuf combattant, p=parent isolé, r=a élevé seul
export const specialSituationsSchema = z.object({
  i: z.boolean(),  // Contribuable invalide (+0.5)
  v: z.boolean(),  // Ancien combattant 74+ ans (+0.5)
  w: z.boolean(),  // Veuf/veuve d'ancien combattant (+0.5)
  p: z.boolean(),  // Parent isolé (+0.5 pour 1er enfant)
  r: z.boolean(),  // A élevé un enfant seul 5 ans (+0.5)
})

// Alias pour compatibilité (ancien nom)
export const partsOptionsSchema = specialSituationsSchema

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
  childrenCountA: z.number().min(0).max(20).optional(),
  childrenA: z.array(childSchema).optional(),

  // Conjoint B
  incomeB: z
    .number({ message: 'Le revenu du conjoint B est requis' })
    .min(0, 'Le revenu ne peut pas être négatif')
    .max(10000000, 'Le revenu semble trop élevé'),
  partsOptionsB: partsOptionsSchema.optional(),
  childrenCountB: z.number().min(0).max(20).optional(),
  childrenB: z.array(childSchema).optional(),

  // Champs legacy pour compatibilité (seront calculés automatiquement)
  childrenCount: z.number().min(0).max(20).optional(),
  children: z.array(childSchema).optional(),

  // Consentement au traitement des données
  consentData: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter le traitement de vos données pour continuer',
  }),
})

// Type inféré du schéma
export type SimulationFormData = z.infer<typeof simulationSchema>
export type SpecialSituations = z.infer<typeof specialSituationsSchema>
// Alias pour compatibilité
export type PartsOptions = SpecialSituations
export type ChildOptions = z.infer<typeof childSchema>

// Valeurs par défaut pour les situations particulières
export const defaultSpecialSituations: SpecialSituations = {
  i: false,  // invalide
  v: false,  // ancien combattant
  w: false,  // veuf combattant
  p: false,  // parent isolé
  r: false,  // a élevé seul
}

// Alias pour compatibilité
export const defaultPartsOptions = defaultSpecialSituations

export const defaultSimulationValues: SimulationFormData = {
  incomeA: undefined as unknown as number,
  partsOptionsA: defaultPartsOptions,
  childrenCountA: 0,
  childrenA: [],
  incomeB: undefined as unknown as number,
  partsOptionsB: defaultPartsOptions,
  childrenCountB: 0,
  childrenB: [],
  childrenCount: 0,
  children: [],
  consentData: false,
}

// Fonction helper pour calculer les parts des enfants de manière cohérente
// La garde alternée est appliquée en priorité sur les parts les plus faibles (1er et 2ème enfant)
// pour maximiser l'avantage fiscal et avoir un résultat cohérent peu importe l'ordre
export function calculateChildrenParts(
  childrenCount: number,
  children: ChildOptions[] = []
): number {
  if (childrenCount === 0) return 0

  // Compter les enfants en garde alternée et invalides
  let sharedCustodyCount = 0
  let invalidFullCustodyCount = 0
  let invalidSharedCustodyCount = 0

  for (let i = 0; i < childrenCount; i++) {
    const child = children[i] || { isSharedCustody: false, isInvalid: false }
    if (child.isSharedCustody) {
      sharedCustodyCount++
      if (child.isInvalid) invalidSharedCustodyCount++
    } else {
      if (child.isInvalid) invalidFullCustodyCount++
    }
  }

  const fullCustodyCount = childrenCount - sharedCustodyCount

  // Calculer les parts de base des enfants
  // Les enfants en garde alternée sont comptés en dernier pour maximiser l'avantage
  let parts = 0

  // D'abord les enfants à charge complète
  for (let i = 0; i < fullCustodyCount; i++) {
    if (i < 2) {
      parts += 0.5  // 1er et 2ème enfant
    } else {
      parts += 1    // 3ème et suivants
    }
  }

  // Ensuite les enfants en garde alternée (comptés après les enfants à charge complète)
  for (let i = 0; i < sharedCustodyCount; i++) {
    const position = fullCustodyCount + i
    if (position < 2) {
      parts += 0.25  // 1er ou 2ème enfant en garde alternée (0.5 / 2)
    } else {
      parts += 0.5   // 3ème et suivants en garde alternée (1 / 2)
    }
  }

  // Ajouter les parts pour invalidité des enfants
  // +0.5 part pour enfant invalide à charge complète
  // +0.25 part pour enfant invalide en garde alternée
  parts += invalidFullCustodyCount * 0.5
  parts += invalidSharedCustodyCount * 0.25

  return parts
}

// Fonction pour calculer les parts fiscales d'un célibataire
export function calculateSingleParts(
  options: SpecialSituations,
  childrenCount: number,
  children: ChildOptions[] = []
): number {
  // Part de base pour un célibataire
  let parts = 1

  // Parts pour les enfants
  parts += calculateChildrenParts(childrenCount, children)

  // Parts supplémentaires pour le contribuable
  if (options.i) parts += 0.5  // invalide
  if (options.v) parts += 0.5  // ancien combattant
  if (options.w) parts += 0.5  // veuf combattant
  if (options.p && childrenCount > 0) parts += 0.5  // parent isolé
  if (options.r) parts += 0.5  // a élevé seul

  return parts
}

// Fonction pour calculer les parts fiscales d'un couple (PACS/Mariage)
export function calculateCoupleParts(
  optionsA: SpecialSituations,
  optionsB: SpecialSituations,
  childrenCount: number,
  children: ChildOptions[] = []
): number {
  // Part de base pour un couple
  let parts = 2

  // Parts pour les enfants
  parts += calculateChildrenParts(childrenCount, children)

  // Parts supplémentaires pour chaque conjoint
  if (optionsA.i) parts += 0.5  // invalide
  if (optionsA.v) parts += 0.5  // ancien combattant
  if (optionsA.w) parts += 0.5  // veuf combattant
  // Note: p (parent isolé) et r (a élevé seul) ne s'appliquent pas en couple

  if (optionsB.i) parts += 0.5
  if (optionsB.v) parts += 0.5
  if (optionsB.w) parts += 0.5

  return parts
}
