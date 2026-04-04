import LZString from 'lz-string'
import type { SpecialSituations, ChildOptions } from '@/lib/validation/schemas'
import { defaultSpecialSituations } from '@/lib/validation/schemas'

/**
 * Format de sérialisation compact pour URL (objectif < 100 caractères)
 * 
 * Structure binaire encodée:
 * - Revenus: Base36 (max 5 chars chacun pour 10M€)
 * - Situations spéciales: 1 char par personne (5 bits packés en base36)
 * - Enfants: 1 char count + 1 char par 2 enfants (2 bits par enfant)
 * 
 * Format: {incA}.{incB}.{ssA}{ssB}.{chA}{chB}{details}
 * Puis compression LZ-String pour URL
 */

// Type pour les données de simulation à sérialiser
export interface SimulationData {
  incomeA: number
  incomeB: number
  specialSituationsA: SpecialSituations
  specialSituationsB: SpecialSituations
  childrenCountA: number
  childrenCountB: number
  childrenA: ChildOptions[]
  childrenB: ChildOptions[]
}

// Résultat décodé (peut être partiel si URL corrompue)
export interface ParsedSimulation {
  valid: boolean
  data?: SimulationData
  error?: string
}

/**
 * Encode un nombre en Base36 (0-9, a-z)
 * Plus compact que Base10 pour les grands nombres
 */
function toBase36(num: number): string {
  return Math.round(num).toString(36)
}

/**
 * Décode un nombre depuis Base36
 */
function fromBase36(str: string): number {
  return parseInt(str, 36)
}

/**
 * Pack 5 booleans (situations spéciales) en un seul caractère Base36
 * i=bit0, v=bit1, w=bit2, p=bit3, r=bit4
 */
function packSpecialSituations(ss: SpecialSituations): string {
  let bits = 0
  if (ss.i) bits |= 1      // invalide
  if (ss.v) bits |= 2      // ancien combattant
  if (ss.w) bits |= 4      // veuf combattant
  if (ss.p) bits |= 8      // parent isolé
  if (ss.r) bits |= 16     // a élevé seul
  return bits.toString(36) // 0-31 = '0'-'v' (1 char)
}

/**
 * Unpack un caractère Base36 en 5 booleans
 */
function unpackSpecialSituations(char: string): SpecialSituations {
  const bits = parseInt(char, 36)
  return {
    i: (bits & 1) !== 0,
    v: (bits & 2) !== 0,
    w: (bits & 4) !== 0,
    p: (bits & 8) !== 0,
    r: (bits & 16) !== 0,
  }
}

/**
 * Pack les options d'un enfant en 2 bits
 * bit0 = isSharedCustody, bit1 = isInvalid
 */
function packChild(child: ChildOptions): number {
  let bits = 0
  if (child.isSharedCustody) bits |= 1
  if (child.isInvalid) bits |= 2
  return bits
}

/**
 * Unpack 2 bits en options enfant
 */
function unpackChild(bits: number): ChildOptions {
  return {
    isSharedCustody: (bits & 1) !== 0,
    isInvalid: (bits & 2) !== 0,
  }
}

/**
 * Pack un tableau d'enfants en chaîne compacte
 * Format: {count}{packed_pairs}
 * Chaque char Base36 contient 2 enfants (4 bits)
 */
function packChildren(count: number, children: ChildOptions[]): string {
  if (count === 0) return '0'
  
  // Count en Base36 (0-9 pour 0-9 enfants)
  let result = count.toString(36)
  
  // Pack les enfants par paires (2 enfants = 4 bits = 1 char base36)
  for (let i = 0; i < count; i += 2) {
    const child1 = children[i] || { isSharedCustody: false, isInvalid: false }
    const child2 = children[i + 1] || { isSharedCustody: false, isInvalid: false }
    const packed = packChild(child1) | (packChild(child2) << 2)
    result += packed.toString(36)
  }
  
  return result
}

/**
 * Unpack une chaîne en count + tableau d'enfants
 */
function unpackChildren(str: string): { count: number; children: ChildOptions[] } {
  if (!str || str === '0') return { count: 0, children: [] }
  
  const count = parseInt(str[0], 36)
  const children: ChildOptions[] = []
  
  let childIndex = 0
  for (let i = 1; i < str.length && childIndex < count; i++) {
    const packed = parseInt(str[i], 36)
    
    // Premier enfant de la paire
    if (childIndex < count) {
      children.push(unpackChild(packed & 3))
      childIndex++
    }
    
    // Deuxième enfant de la paire
    if (childIndex < count) {
      children.push(unpackChild((packed >> 2) & 3))
      childIndex++
    }
  }
  
  return { count, children }
}

/**
 * Sérialise les données de simulation en chaîne compacte
 * Format intermédiaire: incA.incB.ssAssB.chA.chB
 */
function serialize(data: SimulationData): string {
  const parts = [
    toBase36(data.incomeA),
    toBase36(data.incomeB),
    packSpecialSituations(data.specialSituationsA) + packSpecialSituations(data.specialSituationsB),
    packChildren(data.childrenCountA, data.childrenA),
    packChildren(data.childrenCountB, data.childrenB),
  ]
  
  return parts.join('.')
}

/**
 * Désérialise une chaîne compacte en données de simulation
 */
function deserialize(str: string): SimulationData {
  const parts = str.split('.')
  
  if (parts.length < 5) {
    throw new Error('Format invalide')
  }
  
  const [incA, incB, ss, chA, chB] = parts
  
  const childrenDataA = unpackChildren(chA)
  const childrenDataB = unpackChildren(chB)
  
  return {
    incomeA: fromBase36(incA),
    incomeB: fromBase36(incB),
    specialSituationsA: ss.length >= 1 ? unpackSpecialSituations(ss[0]) : defaultSpecialSituations,
    specialSituationsB: ss.length >= 2 ? unpackSpecialSituations(ss[1]) : defaultSpecialSituations,
    childrenCountA: childrenDataA.count,
    childrenCountB: childrenDataB.count,
    childrenA: childrenDataA.children,
    childrenB: childrenDataB.children,
  }
}

/**
 * Génère une URL courte contenant toute la simulation
 * Utilise LZ-String pour compression puis encode en URL-safe
 * 
 * @example
 * const url = generateTinyURL(data)
 * // => "s=N4IgDg..." (< 100 chars)
 */
export function generateTinyURL(data: SimulationData, baseUrl?: string): string {
  // 1. Sérialiser en format compact
  const serialized = serialize(data)
  
  // 2. Compresser avec LZ-String (encodage URL-safe)
  const compressed = LZString.compressToEncodedURIComponent(serialized)
  
  // 3. Construire l'URL
  const base = baseUrl || '/resultats'
  return `${base}?s=${compressed}`
}

/**
 * Génère uniquement la chaîne de simulation (sans l'URL)
 */
export function generateSimulationCode(data: SimulationData): string {
  const serialized = serialize(data)
  return LZString.compressToEncodedURIComponent(serialized)
}

/**
 * Parse une URL ou un code de simulation pour reconstruire les données
 * 
 * @example
 * const result = parseTinyURL("N4IgDg...")
 * if (result.valid) {
 *   console.log(result.data.incomeA)
 * }
 */
export function parseTinyURL(urlOrCode: string): ParsedSimulation {
  try {
    // Extraire le code 's' si c'est une URL complète
    let code = urlOrCode
    
    if (urlOrCode.includes('?s=')) {
      const match = urlOrCode.match(/[?&]s=([^&]+)/)
      if (match) {
        code = match[1]
      }
    } else if (urlOrCode.startsWith('/') || urlOrCode.startsWith('http')) {
      // URL sans paramètre s
      return { valid: false, error: 'Paramètre de simulation manquant' }
    }
    
    // Décompresser
    const decompressed = LZString.decompressFromEncodedURIComponent(code)
    
    if (!decompressed) {
      return { valid: false, error: 'Code de simulation invalide' }
    }
    
    // Désérialiser
    const data = deserialize(decompressed)
    
    // Validation basique
    if (isNaN(data.incomeA) || isNaN(data.incomeB)) {
      return { valid: false, error: 'Revenus invalides' }
    }
    
    if (data.incomeA < 0 || data.incomeB < 0) {
      return { valid: false, error: 'Les revenus ne peuvent pas être négatifs' }
    }
    
    return { valid: true, data }
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Erreur de décodage' 
    }
  }
}

/**
 * Calcule la longueur estimée de l'URL pour une simulation
 * Utile pour vérifier qu'on reste sous 100 caractères
 */
export function estimateURLLength(data: SimulationData): number {
  const url = generateTinyURL(data)
  return url.length
}

/**
 * Vérifie si une simulation peut tenir dans la limite de 100 caractères
 */
export function fitsInLimit(data: SimulationData, limit: number = 100): boolean {
  return estimateURLLength(data) <= limit
}
