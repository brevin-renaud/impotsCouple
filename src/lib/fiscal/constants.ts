export const FISCAL_YEAR = 2025

export const TAX_BRACKETS = [
    { threshold: 181918, rate: 0.45 },
    { threshold: 84578, rate: 0.41 },
    { threshold: 29580, rate: 0.30 },
    { threshold: 11601, rate: 0.11 },
    { threshold: 0, rate: 0 },
];

type DecoteSituation = {
    threshold: number
    forfait: number
}

export const DECOTE: { single: DecoteSituation; couple: DecoteSituation; coefficient: number } = {
    single: {
        threshold: 1982,
        forfait: 897,
    },
    couple: {
        threshold: 3277,
        forfait: 1483,
    },
    coefficient: 0.4525,
}

export const FAMILY_QUOTIENT = {
    halfPartCeiling: 792,
    firstTwoChildrenParts: 0.5,
    additionalChildParts: 1,
    gardeAlterneeDivisor: 2,
}

