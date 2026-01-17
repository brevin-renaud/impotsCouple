import { TAX_BRACKETS, DECOTE } from './constants'

export type Situation = 'couple' | 'single'

export interface SimulationInput {
  incomeA: number
  incomeB: number
  partsA: number
  partsB: number
}

export interface PersonDetail {
  revenuImposable: number
  parts: number
  quotientFamilial: number
  impotNet: number
}

export interface SimulationResult {
  celibat: {
    taxA: number
    taxB: number
    totalTax: number
    partsA: number
    partsB: number
    conjointA: PersonDetail
    conjointB: PersonDetail
  }
  union: {
    totalTax: number
    parts: number
    revenuImposable: number
    quotientFamilial: number
  }
  bestScenario: Situation
  gain: number
  message: string
}

/**
 * Calcule le revenu imposable par part
 */
const taxableIncome = (income: number, parts: number): number => {
  return income / parts
}

/**
 * Calcule l'impôt brut selon le barème progressif
 */
const calculateTaxFromBrackets = (quotientFamilial: number): number => {
  let remainingIncome = quotientFamilial
  let tax = 0

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome > bracket.threshold) {
      const taxableAtThisRate = remainingIncome - bracket.threshold
      tax += taxableAtThisRate * bracket.rate
      remainingIncome = bracket.threshold
    }
  }

  return tax
}

/**
 * Calcule l'impôt net après décote
 */
const calculateTax = (income: number, parts: number, isCouple: boolean): number => {
  const quotient = taxableIncome(income, parts)
  let tax = calculateTaxFromBrackets(quotient) * parts

  // Application de la décote
  const decote = isCouple ? DECOTE.couple : DECOTE.single
  if (tax > 0 && tax < decote.threshold) {
    const decoteAmount = decote.forfait - tax * DECOTE.coefficient
    tax = Math.max(0, tax - decoteAmount)
  }

  return Math.round(tax)
}

/**
 * Simule les deux scénarios et retourne les résultats complets
 */
export const simulateFiscalScenarios = (input: SimulationInput): SimulationResult => {
  const { incomeA, incomeB, partsA, partsB } = input

  // Scénario Célibat : chacun déclare séparément avec 1 part de base + parts supplémentaires
  const partsATot = 1 + partsA
  const partsBTot = 1 + partsB
  const quotientA = taxableIncome(incomeA, partsATot)
  const quotientB = taxableIncome(incomeB, partsBTot)
  const taxA = calculateTax(incomeA, partsATot, false)
  const taxB = calculateTax(incomeB, partsBTot, false)
  const totalTaxCelibat = taxA + taxB

  // Scénario Union : déclaration commune avec 2 parts de base + parts supplémentaires
  const totalIncome = incomeA + incomeB
  const totalParts = 2 + partsA + partsB
  const quotientUnion = taxableIncome(totalIncome, totalParts)
  const totalTaxUnion = calculateTax(totalIncome, totalParts, true)

  // Déterminer le meilleur scénario
  const gain = totalTaxCelibat - totalTaxUnion
  const bestScenario: Situation = gain > 0 ? 'couple' : 'single'

  let message: string
  if (gain > 0) {
    message = `L'union (PACS ou Mariage) vous permettrait d'économiser ${gain} € d'impôts par an.`
  } else if (gain < 0) {
    message = `Rester célibataires vous permettrait d'économiser ${Math.abs(gain)} € d'impôts par an.`
  } else {
    message = `Les deux situations sont fiscalement équivalentes.`
  }

  return {
    celibat: {
      taxA,
      taxB,
      totalTax: totalTaxCelibat,
      partsA: partsATot,
      partsB: partsBTot,
      conjointA: {
        revenuImposable: incomeA,
        parts: partsATot,
        quotientFamilial: Math.round(quotientA),
        impotNet: taxA,
      },
      conjointB: {
        revenuImposable: incomeB,
        parts: partsBTot,
        quotientFamilial: Math.round(quotientB),
        impotNet: taxB,
      },
    },
    union: {
      totalTax: totalTaxUnion,
      parts: totalParts,
      revenuImposable: totalIncome,
      quotientFamilial: Math.round(quotientUnion),
    },
    bestScenario,
    gain: Math.abs(gain),
    message,
  }
}

