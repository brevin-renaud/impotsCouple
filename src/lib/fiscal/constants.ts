// Constantes fiscales France - Barème 2025 (revenus 2024)
// Source: service-public.gouv.fr et economie.gouv.fr
// À mettre à jour chaque année selon la loi de finances

export const FISCAL_YEAR = 2024

// Tranches d'imposition 2025 (revenus 2024)
// Source: https://www.service-public.gouv.fr/particuliers/vosdroits/F1419
export const TAX_BRACKETS = [
  { threshold: 180294, rate: 0.45 },
  { threshold: 83823, rate: 0.41 },
  { threshold: 29315, rate: 0.30 },
  { threshold: 11497, rate: 0.11 },
  { threshold: 0, rate: 0.00 },
] as const

// Abattement forfaitaire de 10%
// Source: https://www.service-public.gouv.fr/particuliers/vosdroits/F1989
export const STANDARD_DEDUCTION = {
  rate: 0.10,
  min: 504,   // Plancher 2025 (revenus 2024)
  max: 14673, // Plafond 2025 (revenus 2024)
} as const

// Quotient familial
// Source: https://www.economie.gouv.fr/particuliers/quotient-familial
export const FAMILY_QUOTIENT = {
  // Plafond avantage par demi-part (2025)
  halfPartCeiling: 792,
  // Parts pour enfants
  firstTwoChildrenParts: 0.5, // par enfant
  additionalChildParts: 1,    // à partir du 3ème
  // Garde alternée
  gardeAlterneeDivisor: 2,
} as const

// Décote 2025 (revenus 2024)
// Source: https://www.economie.gouv.fr/particuliers/decote-impot-revenu
// Formule: Décote = Forfait - (Impôt brut × 0.4525)
export const DECOTE = {
  singleThreshold: 1964,   // Seuil célibataire (si impôt brut < ce seuil)
  coupleThreshold: 3249,   // Seuil couple (si impôt brut < ce seuil)
  singleForfait: 890,      // Forfait célibataire
  coupleForfait: 1471,     // Forfait couple
  coefficient: 0.4525,     // Coefficient multiplicateur
} as const

// Contribution exceptionnelle sur les hauts revenus (CEHR)
export const CEHR = {
  single: [
    { threshold: 500000, rate: 0.04 },
    { threshold: 250000, rate: 0.03 },
  ],
  couple: [
    { threshold: 1000000, rate: 0.04 },
    { threshold: 500000, rate: 0.03 },
  ],
} as const

// Impôt sur la Fortune Immobilière (IFI)
export const IFI = {
  threshold: 1300000,     // Seuil d'assujettissement
  abattement: 800000,     // Abattement résidence principale (30%)
} as const

// Crédits et réductions d'impôt
export const TAX_CREDITS = {
  gardeEnfant: {
    rate: 0.50,           // 50% des dépenses
    plafondParEnfant: 1750, // Max par enfant < 6 ans
    ageLimite: 6,
  },
  emploiDomicile: {
    rate: 0.50,           // 50% des dépenses
    plafondStandard: 6000, // Plafond standard
    plafondPremiere: 15000, // Première année
  },
  donsAssociations: {
    rate: 0.66,           // 66% des dons
    plafond: 0.20,        // 20% du revenu imposable
  },
} as const
