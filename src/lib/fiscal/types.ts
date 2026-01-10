// Types pour le moteur de calcul fiscal

export interface PersonInput {
  income: number           // Revenu net imposable
  fraisReels: number       // Frais réels (0 = abattement 10%)
  partsSupp: number        // Parts supplémentaires (invalidité, etc.)
  pensionVersee: number    // Pensions alimentaires versées (déductibles)
  patrimoineImmo: number   // Patrimoine immobilier (pour alerte IFI)
  epargneRetraite: number  // PER/PERP déductible
}

export interface HouseholdCharges {
  fraisGardeEnfants: number  // Crédits d'impôt garde d'enfants (50%)
  emploiDomicile: number     // Crédits d'impôt emploi à domicile (50%)
  donsAssociations: number   // Réduction d'impôt dons (66%)
}

export interface FoyerInput {
  conjointA: PersonInput
  conjointB: PersonInput
  children: number           // Nombre d'enfants
  gardeAlternee: boolean     // Garde alternée (divise les parts enfants par 2)
  charges?: HouseholdCharges // Charges déductibles et crédits d'impôt
}

export interface TaxResult {
  revenuImposable: number    // Revenu après abattement
  parts: number              // Nombre de parts fiscales
  quotientFamilial: number   // Revenu / Parts
  impotBrut: number          // Avant plafonnement et décote
  impotNet: number           // Impôt final
  credits?: number           // Crédits et réductions d'impôt
}

export interface ScenarioResult {
  label: string
  conjointA: TaxResult | null
  conjointB: TaxResult | null
  totalImpot: number
  totalParts: number
}

export interface LegalAdvice {
  succession: string
  reversion: string
  rupture: string
}

export interface SimulationResult {
  celibat: ScenarioResult    // Scénario A : imposition séparée
  pacs: ScenarioResult       // Scénario B : union PACS
  mariage: ScenarioResult    // Scénario C : union Mariage
  optimization: {
    bestScenario: 'celibat' | 'pacs' | 'mariage'
    gain: number              // Économie vs célibat
    gainPourcentage: number   // Gain en %
    message: string           // Recommandation textuelle
    timing: string            // Conseil sur le timing
  }
  alerts: {
    ifiAlert: string          // Alerte IFI si patrimoine > 1.3M€
    strategicAdvice: string   // Conseil stratégique personnalisé
  }
  legalAdvice: {
    pacs: LegalAdvice
    mariage: LegalAdvice
  }
}

export interface SimulationInput {
  incomeA: number
  fraisReelsA: number
  partsA: number
  pensionVerseeA: number
  patrimoineImmoA: number
  epargneRetraiteA: number
  incomeB: number
  fraisReelsB: number
  partsB: number
  pensionVerseeB: number
  patrimoineImmoB: number
  epargneRetraiteB: number
  children: number
  gardeAlternee: boolean
  fraisGardeEnfants: number
  emploiDomicile: number
  donsAssociations: number
}
