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


const taxableIncome = (income: number, parts: number): number => {
    return income / parts
}

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

const calculateTax = (income: number, parts: number, isCouple: boolean): number => {
    const quotient = taxableIncome(income, parts)
    let tax = calculateTaxFromBrackets(quotient) * parts

    const decote = isCouple ? DECOTE.couple : DECOTE.single
    if (tax > 0 && tax < decote.threshold) {
        const decoteAmount = decote.forfait - (tax * DECOTE.coefficient)
        tax = Math.max(0, tax - decoteAmount)
    }

    return Math.round(tax)
}

export const simulateFiscalScenarios = (input: SimulationInput): SimulationResult => {
    const { incomeA, incomeB, partsA, partsB } = input

    const quotientA = taxableIncome(incomeA, partsA)
    const quotientB = taxableIncome(incomeB, partsB)
    const taxA = calculateTax(incomeA, partsA, false)
    const taxB = calculateTax(incomeB, partsB, false)
    const totalTaxCelibat = taxA + taxB

    const totalIncome = incomeA + incomeB
    const totalParts = partsA + partsB
    const quotientUnion = taxableIncome(totalIncome, totalParts)
    const totalTaxUnion = calculateTax(totalIncome, totalParts, true)

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
            partsA: partsA,
            partsB: partsB,
            conjointA: {
                revenuImposable: incomeA,
                parts: partsA,
                quotientFamilial: Math.round(quotientA),
                impotNet: taxA,
            },
            conjointB: {
                revenuImposable: incomeB,
                parts: partsB,
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

