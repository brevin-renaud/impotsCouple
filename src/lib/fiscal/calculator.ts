/**
 * FISCAL & PATRIMONIAL OPTIMIZER - v2.0
 * Intègre : IR, IFI, Charges Déductibles, Crédits d'Impôt et Alertes Juridiques
 */

import {
  TAX_BRACKETS,
  STANDARD_DEDUCTION,
  FAMILY_QUOTIENT,
  DECOTE,
  IFI,
  TAX_CREDITS,
} from './constants'
import type {
  PersonInput,
  FoyerInput,
  TaxResult,
  ScenarioResult,
  SimulationResult,
  SimulationInput,
  LegalAdvice,
  HouseholdCharges,
} from './types'

/**
 * Conseils juridiques pour l'union (PACS ou Mariage)
 */
export function getLegalAdvice(): LegalAdvice {
  return {
    succession: "✅ Exonération de droits de succession. Pour le mariage : héritage automatique. Pour le PACS : nécessite un testament.",
    reversion: "ℹ️ Pension de réversion : uniquement pour les couples mariés.",
    rupture: "⚖️ Mariage : prestation compensatoire possible. PACS : pas de prestation compensatoire."
  }
}

/**
 * Calcule l'abattement forfaitaire de 10%
 */
function calculateStandardDeduction(income: number): number {
  const deduction = income * STANDARD_DEDUCTION.rate
  return Math.min(Math.max(deduction, STANDARD_DEDUCTION.min), STANDARD_DEDUCTION.max)
}

/**
 * Calcule le Revenu Net Global (RNG) après déductions
 * Intègre : pensions alimentaires, épargne retraite (PER/PERP)
 */
function calculateRNG(person: PersonInput): number {
  // Abattement professionnel (10% ou frais réels)
  const abattement = person.fraisReels > 0 
    ? person.fraisReels 
    : calculateStandardDeduction(person.income)
  
  const netProfessionnel = Math.max(0, person.income - abattement)
  
  // Déductions du revenu global
  const deductions = person.pensionVersee + person.epargneRetraite
  
  return Math.max(0, netProfessionnel - deductions)
}

/**
 * Calcule le nombre de parts fiscales pour les enfants
 */
function calculateChildrenParts(children: number, gardeAlternee: boolean): number {
  if (children === 0) return 0

  let parts = 0
  // 2 premiers enfants : 0.5 part chacun
  const firstTwo = Math.min(children, 2)
  parts += firstTwo * FAMILY_QUOTIENT.firstTwoChildrenParts

  // Enfants suivants : 1 part chacun
  if (children > 2) {
    parts += (children - 2) * FAMILY_QUOTIENT.additionalChildParts
  }

  // Garde alternée : parts divisées par 2
  if (gardeAlternee) {
    parts = parts / FAMILY_QUOTIENT.gardeAlterneeDivisor
  }

  return parts
}

/**
 * Calcule l'impôt avec le barème progressif 2025 (revenus 2024)
 * Source: https://www.service-public.gouv.fr/particuliers/vosdroits/F1419
 */
function calculateTaxFromBrackets(quotientFamilial: number): number {
  // Barème officiel 2025 pour les revenus 2024
  const brackets = [
    { min: 0, max: 11497, rate: 0 },
    { min: 11497, max: 29315, rate: 0.11 },
    { min: 29315, max: 83823, rate: 0.30 },
    { min: 83823, max: 180294, rate: 0.41 },
    { min: 180294, max: Infinity, rate: 0.45 },
  ]

  let tax = 0
  for (const bracket of brackets) {
    if (quotientFamilial > bracket.min) {
      const taxableInBracket = Math.min(quotientFamilial, bracket.max) - bracket.min
      tax += taxableInBracket * bracket.rate
    }
  }

  return tax
}

/**
 * Applique la décote si applicable
 * Source: https://www.economie.gouv.fr/particuliers/decote-impot-revenu
 * Formule officielle: Décote = Forfait - (Impôt brut × 0.4525)
 * La décote s'applique si l'impôt brut < seuil (1964€ célibataire, 3249€ couple)
 */
function applyDecote(impotBrut: number, isCouple: boolean): number {
  const threshold = isCouple ? DECOTE.coupleThreshold : DECOTE.singleThreshold
  const forfait = isCouple ? DECOTE.coupleForfait : DECOTE.singleForfait

  // Si l'impôt brut dépasse le seuil, pas de décote
  if (impotBrut >= threshold) {
    return impotBrut
  }

  // Formule officielle: Décote = Forfait - (Impôt brut × 0.4525)
  const decote = forfait - (impotBrut * DECOTE.coefficient)
  
  // La décote ne peut pas être négative
  if (decote <= 0) {
    return impotBrut
  }

  return Math.max(0, impotBrut - decote)
}

/**
 * Plafonnement du quotient familial
 */
function applyQuotientFamilialCeiling(
  impotAvecQF: number,
  impotSansQF: number,
  halfPartsCount: number
): number {
  const maxAdvantage = halfPartsCount * FAMILY_QUOTIENT.halfPartCeiling * 2
  const actualAdvantage = impotSansQF - impotAvecQF

  if (actualAdvantage > maxAdvantage) {
    return impotSansQF - maxAdvantage
  }

  return impotAvecQF
}

/**
 * Calcule les crédits et réductions d'impôt
 */
function calculateTaxCredits(
  charges: HouseholdCharges | undefined,
  children: number,
  revenuImposable: number
): number {
  if (!charges) return 0

  let totalCredits = 0

  // Crédit d'impôt garde d'enfants (50% plafonné)
  if (charges.fraisGardeEnfants > 0) {
    const maxCredit = children * TAX_CREDITS.gardeEnfant.plafondParEnfant
    totalCredits += Math.min(charges.fraisGardeEnfants * TAX_CREDITS.gardeEnfant.rate, maxCredit)
  }

  // Crédit d'impôt emploi à domicile (50% plafonné)
  if (charges.emploiDomicile > 0) {
    totalCredits += Math.min(
      charges.emploiDomicile * TAX_CREDITS.emploiDomicile.rate,
      TAX_CREDITS.emploiDomicile.plafondStandard
    )
  }

  // Réduction d'impôt dons aux associations (66% plafonné à 20% du RNI)
  if (charges.donsAssociations > 0) {
    const plafondDons = revenuImposable * TAX_CREDITS.donsAssociations.plafond
    totalCredits += Math.min(
      charges.donsAssociations * TAX_CREDITS.donsAssociations.rate,
      plafondDons
    )
  }

  return Math.round(totalCredits)
}

/**
 * Calcule l'impôt pour une personne seule
 */
function calculateSingleTax(person: PersonInput, charges?: HouseholdCharges): TaxResult {
  const revenuImposable = calculateRNG(person)
  const baseParts = 1
  const totalParts = baseParts + person.partsSupp

  const quotientFamilial = revenuImposable / totalParts
  const impotParPart = calculateTaxFromBrackets(quotientFamilial)
  let impotBrut = impotParPart * totalParts

  // Plafonnement QF si parts supplémentaires
  if (person.partsSupp > 0) {
    const impotSansQF = calculateTaxFromBrackets(revenuImposable)
    impotBrut = applyQuotientFamilialCeiling(impotBrut, impotSansQF, person.partsSupp)
  }

  // Décote
  let impotNet = applyDecote(impotBrut, false)

  // Crédits d'impôt
  const credits = calculateTaxCredits(charges, 0, revenuImposable)
  impotNet = Math.max(0, impotNet - credits)

  return {
    revenuImposable: Math.round(revenuImposable),
    parts: totalParts,
    quotientFamilial: Math.round(quotientFamilial),
    impotBrut: Math.round(impotBrut),
    impotNet: Math.round(impotNet),
    credits,
  }
}

/**
 * Calcule l'impôt pour un couple (PACS ou Mariage)
 */
function calculateCoupleTax(foyer: FoyerInput): TaxResult {
  const revenuA = calculateRNG(foyer.conjointA)
  const revenuB = calculateRNG(foyer.conjointB)
  const revenuImposable = revenuA + revenuB

  // Parts du couple
  const baseParts = 2
  const childrenParts = calculateChildrenParts(foyer.children, foyer.gardeAlternee)
  const additionalParts = foyer.conjointA.partsSupp + foyer.conjointB.partsSupp
  const totalParts = baseParts + childrenParts + additionalParts

  const quotientFamilial = revenuImposable / totalParts
  const impotParPart = calculateTaxFromBrackets(quotientFamilial)
  let impotBrut = impotParPart * totalParts

  // Plafonnement QF
  const extraHalfParts = childrenParts + additionalParts
  if (extraHalfParts > 0) {
    const qfSansEnfants = revenuImposable / baseParts
    const impotSansQF = calculateTaxFromBrackets(qfSansEnfants) * baseParts
    impotBrut = applyQuotientFamilialCeiling(impotBrut, impotSansQF, extraHalfParts)
  }

  // Décote
  let impotNet = applyDecote(impotBrut, true)

  // Crédits d'impôt
  const credits = calculateTaxCredits(foyer.charges, foyer.children, revenuImposable)
  impotNet = Math.max(0, impotNet - credits)

  return {
    revenuImposable: Math.round(revenuImposable),
    parts: totalParts,
    quotientFamilial: Math.round(quotientFamilial),
    impotBrut: Math.round(impotBrut),
    impotNet: Math.round(impotNet),
    credits,
  }
}

/**
 * Analyse IFI et conseil stratégique
 */
function analyzeIFI(patrimoineTotal: number): string {
  if (patrimoineTotal >= IFI.threshold) {
    return `⚠️ ALERTE IFI : Votre patrimoine immobilier total (${Math.round(patrimoineTotal).toLocaleString('fr-FR')} €) dépasse le seuil de ${IFI.threshold.toLocaleString('fr-FR')} €. Vous serez soumis à l'Impôt sur la Fortune Immobilière.`
  }
  return "✅ Pas d'impact IFI sur votre situation."
}

/**
 * Conseil stratégique personnalisé
 */
function getStrategicAdvice(
  personA: PersonInput,
  personB: PersonInput,
  patrimoineTotal: number,
  gainFiscal: number
): string {
  // IFI annule le gain fiscal
  if (patrimoineTotal >= IFI.threshold && gainFiscal < 5000) {
    return "⚠️ PRUDENCE : Le coût de l'IFI pourrait annuler votre gain sur l'impôt sur le revenu. Consultez un CGP."
  }

  // Fort écart de revenus
  const ecartRevenus = Math.abs(personA.income - personB.income)
  if (ecartRevenus > 20000 && gainFiscal > 2000) {
    return "✅ FAVORABLE : L'écart de revenus justifie une union rapide pour optimiser votre fiscalité."
  }

  // Gain fiscal marginal
  if (gainFiscal < 500) {
    return "⚖️ NEUTRE : Gain fiscal faible, décidez selon vos critères de protection juridique et patrimoniale."
  }

  // Gain modéré
  if (gainFiscal >= 500 && gainFiscal < 2000) {
    return "💡 INTÉRESSANT : Gain fiscal modéré. Prenez en compte également les aspects juridiques."
  }

  // Fort gain
  return "🎯 TRÈS AVANTAGEUX : Fort gain fiscal. L'union est financièrement pertinente."
}

/**
 * Simulation complète avec tous les scénarios
 */
export function simulateFiscalScenarios(input: SimulationInput): SimulationResult {
  const personA: PersonInput = {
    income: input.incomeA,
    fraisReels: input.fraisReelsA,
    partsSupp: input.partsA,
    pensionVersee: input.pensionVerseeA || 0,
    patrimoineImmo: input.patrimoineImmoA || 0,
    epargneRetraite: input.epargneRetraiteA || 0,
  }

  const personB: PersonInput = {
    income: input.incomeB,
    fraisReels: input.fraisReelsB,
    partsSupp: input.partsB,
    pensionVersee: input.pensionVerseeB || 0,
    patrimoineImmo: input.patrimoineImmoB || 0,
    epargneRetraite: input.epargneRetraiteB || 0,
  }

  const charges: HouseholdCharges | undefined = 
    (input.fraisGardeEnfants || input.emploiDomicile || input.donsAssociations)
      ? {
          fraisGardeEnfants: input.fraisGardeEnfants || 0,
          emploiDomicile: input.emploiDomicile || 0,
          donsAssociations: input.donsAssociations || 0,
        }
      : undefined

  // Scénario 1 : Célibat (imposition séparée)
  const taxA = calculateSingleTax(personA, charges)
  const taxB = calculateSingleTax(personB, charges)
  const celibat: ScenarioResult = {
    label: 'Célibat',
    conjointA: taxA,
    conjointB: taxB,
    totalImpot: taxA.impotNet + taxB.impotNet,
    totalParts: taxA.parts + taxB.parts,
  }

  // Scénario 2 : Union (PACS ou Mariage - fiscalement identiques)
  const foyer: FoyerInput = {
    conjointA: personA,
    conjointB: personB,
    children: input.children,
    gardeAlternee: input.gardeAlternee,
    charges,
  }
  const coupleTax = calculateCoupleTax(foyer)
  
  const union: ScenarioResult = {
    label: 'Union',
    conjointA: null,
    conjointB: null,
    totalImpot: coupleTax.impotNet,
    totalParts: coupleTax.parts,
  }

  // Analyse IFI
  const patrimoineTotal = personA.patrimoineImmo + personB.patrimoineImmo
  const ifiAlert = analyzeIFI(patrimoineTotal)

  // Optimisation : comparaison Célibat vs Union
  const gainUnion = celibat.totalImpot - union.totalImpot
  const bestScenario: 'celibat' | 'union' = gainUnion > 0 ? 'union' : 'celibat'
  const gain = Math.max(0, gainUnion)
  const gainPourcentage = celibat.totalImpot > 0 
    ? (gain / celibat.totalImpot) * 100 
    : 0

  let message = ''
  let timing = ''

  if (bestScenario === 'celibat') {
    message = "Rester célibataire est fiscalement plus avantageux dans votre situation."
    timing = "Pas d'urgence à vous unir sur le plan fiscal."
  } else {
    const economy = Math.round(gain)
    message = `L'union vous permet d'économiser ${economy.toLocaleString('fr-FR')} € par an.`
    
    if (gain > 3000) {
      timing = "⏰ Agissez rapidement : le gain fiscal est significatif !"
    } else if (gain > 1000) {
      timing = "📅 À envisager cette année pour optimiser vos impôts."
    } else {
      timing = "💡 Gain modéré, d'autres critères peuvent primer."
    }
  }

  const strategicAdvice = getStrategicAdvice(personA, personB, patrimoineTotal, gain)

  return {
    celibat,
    union,
    optimization: {
      bestScenario,
      gain: Math.round(gain),
      gainPourcentage: Math.round(gainPourcentage * 10) / 10,
      message,
      timing,
    },
    alerts: {
      ifiAlert,
      strategicAdvice,
    },
    legalAdvice: getLegalAdvice(),
  }
}
