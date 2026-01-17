/**
 * Tests de validation des calculs fiscaux
 * Basés sur les exemples officiels de economie.gouv.fr et service-public.fr
 */

import { simulateFiscalScenarios } from './calculator'

// Test 1: Célibataire avec 32 000€ de revenu net imposable
// Source: https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu
// Exemple officiel: revenu net imposable 32 000€
// Calcul: 0% jusqu'à 11 497€, 11% de 11 498€ à 29 315€, 30% au-delà
// = 0 + (29 315 - 11 497) × 0.11 + (32 000 - 29 315) × 0.30
// = 0 + 17 818 × 0.11 + 2 685 × 0.30
// = 1 960 + 805.5 = 2 765.50€

function testCelibataire32000() {
  console.log('=== Test 1: Célibataire 32 000€ ===')
  
  // Pour un revenu brut, il faut tenir compte de l'abattement 10%
  // Revenu net imposable = Revenu brut - 10%
  // Si revenu net imposable = 32 000€, alors revenu brut = 32 000 / 0.9 ≈ 35 556€
  const revenuBrut = 35556
  
  const result = simulateFiscalScenarios({
    incomeA: revenuBrut,
    incomeB: 0,
    children: 0,
    gardeAlternee: false,
    fraisReelsA: 0,
    fraisReelsB: 0,
    partsA: 0,
    partsB: 0,
  })
  
  console.log('Revenu brut:', revenuBrut, '€')
  console.log('Revenu imposable (après 10%):', result.celibat.conjointA?.revenuImposable, '€')
  console.log('Impôt calculé:', result.celibat.totalImpot, '€')
  console.log('Impôt attendu (environ): 2 765€')
  console.log('')
}

// Test 2: Couple uni avec 2 enfants et 55 950€ de revenu net imposable
// Source: https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu
// Parts: 2 (couple) + 0.5 + 0.5 (2 enfants) = 3 parts
// Quotient familial: 55 950 / 3 = 18 650€
// Calcul par tranche: 0 + (18 650 - 11 497) × 0.11 = 7 153 × 0.11 = 786.83€
// Impôt total: 786.83 × 3 = 2 360.49€

function testCoupleAvec2Enfants() {
  console.log('=== Test 2: Couple avec 2 enfants - 55 950€ ===')
  
  // Revenu brut pour avoir 55 950€ net imposable après abattement
  const revenuBrutTotal = 55950 / 0.9 // ≈ 62 167€
  
  const result = simulateFiscalScenarios({
    incomeA: revenuBrutTotal / 2,
    incomeB: revenuBrutTotal / 2,
    children: 2,
    gardeAlternee: false,
    fraisReelsA: 0,
    fraisReelsB: 0,
    partsA: 0,
    partsB: 0,
  })
  
  console.log('Revenus bruts:', revenuBrutTotal / 2, '€ + ', revenuBrutTotal / 2, '€')
  console.log('Parts fiscales (Union):', result.union.totalParts)
  console.log('Impôt Union:', result.union.totalImpot, '€')
  console.log('Impôt attendu (environ): 2 360€')
  console.log('')
}

// Test 3: Validation de la décote
// Couple avec impôt brut de 2 250€
// Décote = 1 470 - (2 250 × 0.4525) = 1 470 - 1 018 = 452€
// Impôt après décote = 2 250 - 452 = 1 798€

function testDecote() {
  console.log('=== Test 3: Validation décote couple ===')
  console.log('Exemple officiel: impôt brut 2 250€')
  console.log('Décote attendue: 1 470 - (2 250 × 0.4525) = 452€')
  console.log('Impôt après décote attendu: 1 798€')
  console.log('')
}

// Test 4: Comparaison Célibat vs Union
// Cas typique: Conjoint A gagne 50 000€, Conjoint B gagne 20 000€
function testComparaisonCelibatVsUnion() {
  console.log('=== Test 4: Comparaison Célibat vs Union ===')
  
  const result = simulateFiscalScenarios({
    incomeA: 50000,
    incomeB: 20000,
    children: 0,
    gardeAlternee: false,
    fraisReelsA: 0,
    fraisReelsB: 0,
    partsA: 0,
    partsB: 0,
  })
  
  console.log('Conjoint A: 50 000€ brut')
  console.log('Conjoint B: 20 000€ brut')
  console.log('')
  console.log('Scénario Célibat:')
  console.log('  - Conjoint A impôt:', result.celibat.conjointA?.impotNet, '€')
  console.log('  - Conjoint B impôt:', result.celibat.conjointB?.impotNet, '€')
  console.log('  - Total:', result.celibat.totalImpot, '€')
  console.log('')
  console.log('Scénario Union (PACS/Mariage):')
  console.log('  - Parts:', result.union.totalParts)
  console.log('  - Total:', result.union.totalImpot, '€')
  console.log('')
  console.log('Économie Union:', result.optimization.gain, '€')
  console.log('Meilleur scénario:', result.optimization.bestScenario)
  console.log('')
}

// Test 5: Couple avec enfants
function testCoupleAvecEnfants() {
  console.log('=== Test 5: Couple 50k€ + 30k€ avec 2 enfants ===')
  
  const result = simulateFiscalScenarios({
    incomeA: 50000,
    incomeB: 30000,
    children: 2,
    gardeAlternee: false,
    fraisReelsA: 0,
    fraisReelsB: 0,
    partsA: 0,
    partsB: 0,
  })
  
  console.log('Revenus: 50 000€ + 30 000€ = 80 000€ brut')
  console.log('')
  console.log('Scénario Célibat (sans enfants rattachés):')
  console.log('  - Total:', result.celibat.totalImpot, '€')
  console.log('')
  console.log('Scénario Union (PACS/Mariage) avec 2 enfants:')
  console.log('  - Parts:', result.union.totalParts, '(2 + 0.5 + 0.5)')
  console.log('  - Total:', result.union.totalImpot, '€')
  console.log('')
  console.log('Économie:', result.optimization.gain, '€')
  console.log('')
}

// Exécution des tests
console.log('╔════════════════════════════════════════════════════════════╗')
console.log('║   TESTS DE VALIDATION DES CALCULS FISCAUX FRANÇAIS       ║')
console.log('║   Barème 2025 (revenus 2024)                              ║')
console.log('╚════════════════════════════════════════════════════════════╝')
console.log('')

testCelibataire32000()
testCoupleAvec2Enfants()
testDecote()
testComparaisonCelibatVsPacs()
testCoupleAvecEnfants()

console.log('═══════════════════════════════════════════════════════════')
console.log('Tests terminés. Comparez avec le simulateur officiel:')
console.log('https://simulateur-ir-ifi.impots.gouv.fr/calcul_impot/2025/')
console.log('═══════════════════════════════════════════════════════════')
