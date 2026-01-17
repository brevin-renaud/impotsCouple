import { TAX_BRACKETS, DECOTE } from './constants2'

const enum Situation {
    Couple = "couple",
    Single = "single"
}

const taxableIncome = (income: number, parts: number): number => {
    return income / parts
}

const incomeBruteToNet = (bruteIncome: number, parts: number, isCouple?: boolean): number => {
    let remainingIncome = taxableIncome(bruteIncome, parts)
    let tax = 0

    for (const bracket of TAX_BRACKETS) {
        if (remainingIncome > bracket.threshold) {
            const taxableAtThisRate = remainingIncome - bracket.threshold
            tax += taxableAtThisRate * bracket.rate
            remainingIncome = bracket.threshold
        }
    }

    const decote = isCouple ? DECOTE[Situation.Couple] : DECOTE[Situation.Single]

    tax -= remainingIncome < decote.threshold ? 0 : decote.forfait - tax * DECOTE.coefficient

    return bruteIncome - tax
}

const situationComparator = (incomeA: number, incomeB: number, partsA: number, partsB: number): Situation => {
    const incomeNetA = incomeBruteToNet(incomeA, partsA)
    const incomeNetB = incomeBruteToNet(incomeB, partsB)

    const incomeCouple = incomeA + incomeB
    const partsCouple = partsA + partsB

    const incomeNetCouple = incomeBruteToNet(incomeCouple, partsCouple, true)


    const unionEffect = (incomeNetA + incomeNetB) - incomeNetCouple

    return unionEffect < 0 ? Situation.Couple : Situation.Single
}

