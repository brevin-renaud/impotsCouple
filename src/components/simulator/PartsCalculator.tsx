'use client'

import { useEffect } from 'react'
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { Checkbox, Select } from '@/components/ui'
import type { SimulationFormData, ChildOptions } from '@/lib/validation/schemas'
import { calculateSingleParts, defaultPartsOptions } from '@/lib/validation/schemas'

interface PartsCalculatorProps {
  register: UseFormRegister<SimulationFormData>
  watch: UseFormWatch<SimulationFormData>
  setValue: UseFormSetValue<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
  person: 'A' | 'B'
}

export function PartsCalculator({ register, watch, setValue, errors, person }: PartsCalculatorProps) {
  const prefix = person === 'A' ? 'partsOptionsA' : 'partsOptionsB'
  const childrenCount = watch('childrenCount') || 0
  const children = watch('children') || []
  const partsOptions = watch(prefix) || defaultPartsOptions

  // Calculer les parts en temps réel
  const calculatedParts = calculateSingleParts(partsOptions, childrenCount, children)

  return (
    <div className="space-y-4 mt-4">
      <div className="border-t border-stone-200 pt-4">
        <h4 className="text-sm font-medium text-stone-700 mb-3">
          Situations particulières (optionnel)
        </h4>
        
        <div className="space-y-3">
          <Checkbox
            label="Contribuable invalide"
            description="Pension d'invalidité ≥ 40% ou carte d'invalidité/CMI (+0.5 part)"
            {...register(`${prefix}.isInvalid`)}
          />

          <Checkbox
            label="Ancien combattant (74 ans ou plus)"
            description="Titulaire de la carte du combattant (+0.5 part)"
            {...register(`${prefix}.isVeteran`)}
          />

          <Checkbox
            label="Veuf/veuve d'ancien combattant"
            description="Sous conditions (+0.5 part)"
            {...register(`${prefix}.isVeteranWidow`)}
          />

          <Checkbox
            label="Parent isolé"
            description="Célibataire, divorcé ou veuf avec enfant(s) à charge (+0.5 part pour le 1er enfant)"
            {...register(`${prefix}.isSingleParent`)}
          />

          <Checkbox
            label="A élevé seul un enfant pendant 5 ans"
            description="Même si plus d'enfant à charge actuellement (+0.5 part)"
            {...register(`${prefix}.hasRaisedChildAlone`)}
          />
        </div>
      </div>

      {/* Affichage des parts calculées */}
      <div className="bg-stone-100 rounded-lg p-3 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-600">Parts fiscales calculées :</span>
          <span className="font-semibold text-stone-900">{calculatedParts} part{calculatedParts > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}

interface ChildrenSectionProps {
  register: UseFormRegister<SimulationFormData>
  watch: UseFormWatch<SimulationFormData>
  setValue: UseFormSetValue<SimulationFormData>
  errors: FieldErrors<SimulationFormData>
}

export function ChildrenSection({ register, watch, setValue, errors }: ChildrenSectionProps) {
  const childrenCount = watch('childrenCount') || 0
  const children = watch('children') || []

  // Synchroniser le tableau des enfants avec le nombre
  useEffect(() => {
    const currentLength = children.length
    if (childrenCount > currentLength) {
      // Ajouter des enfants
      const newChildren = [...children]
      for (let i = currentLength; i < childrenCount; i++) {
        newChildren.push({ isSharedCustody: false, isInvalid: false })
      }
      setValue('children', newChildren)
    } else if (childrenCount < currentLength) {
      // Supprimer des enfants
      setValue('children', children.slice(0, childrenCount))
    }
  }, [childrenCount, children.length, setValue])

  return (
    <div className="bg-purple-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-stone-900">Enfants à charge</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Select
            label="Nombre d'enfants à charge"
            error={errors.childrenCount?.message}
            options={[
              { value: 0, label: '0 enfant' },
              { value: 1, label: '1 enfant' },
              { value: 2, label: '2 enfants' },
              { value: 3, label: '3 enfants' },
              { value: 4, label: '4 enfants' },
              { value: 5, label: '5 enfants' },
              { value: 6, label: '6 enfants' },
              { value: 7, label: '7 enfants' },
              { value: 8, label: '8 enfants' },
              { value: 9, label: '9 enfants' },
              { value: 10, label: '10 enfants ou plus' },
            ]}
            {...register('childrenCount', { valueAsNumber: true })}
          />
          <p className="mt-1.5 text-sm text-stone-500">Enfants mineurs ou majeurs rattachés au foyer fiscal</p>
        </div>

        {childrenCount > 0 && (
          <div className="border-t border-purple-200 pt-4 mt-4">
            <h4 className="text-sm font-medium text-stone-700 mb-3">
              Détails par enfant
            </h4>
            
            <div className="space-y-4">
              {Array.from({ length: childrenCount }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-600">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-stone-700">
                      {index === 0 ? '1er' : index === 1 ? '2ème' : `${index + 1}ème`} enfant
                      <span className="text-stone-400 font-normal ml-2">
                        ({index < 2 ? '0.5 part' : '1 part'} de base)
                      </span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 ml-8">
                    <Checkbox
                      label="Garde alternée"
                      description="Part divisée par 2"
                      {...register(`children.${index}.isSharedCustody`)}
                    />
                    
                    <Checkbox
                      label="Enfant invalide"
                      description="Carte mobilité inclusion mention invalidité (+0.5 part)"
                      {...register(`children.${index}.isInvalid`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Résumé des parts enfants */}
        {childrenCount > 0 && (
          <div className="bg-purple-100 rounded-lg p-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">Parts pour les enfants :</span>
              <span className="font-semibold text-purple-900">
                {calculateChildrenParts(children, childrenCount)} part{calculateChildrenParts(children, childrenCount) > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Fonction helper pour calculer les parts des enfants
function calculateChildrenParts(children: ChildOptions[], count: number): number {
  let parts = 0
  for (let i = 0; i < count; i++) {
    const child = children[i] || { isSharedCustody: false, isInvalid: false }
    let childPart = i < 2 ? 0.5 : 1
    if (child.isSharedCustody) childPart = childPart / 2
    if (child.isInvalid) childPart += child.isSharedCustody ? 0.25 : 0.5
    parts += childPart
  }
  return parts
}
