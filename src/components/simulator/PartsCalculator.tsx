'use client'

import { useEffect, useState } from 'react'
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
  const childrenCountKey = person === 'A' ? 'childrenCountA' : 'childrenCountB'
  const childrenKey = person === 'A' ? 'childrenA' : 'childrenB'
  
  const childrenCount = watch(childrenCountKey) || 0
  const children = watch(childrenKey) || []
  const partsOptions = watch(prefix) || defaultPartsOptions

  const [expandedChildren, setExpandedChildren] = useState<Set<number>>(new Set())

  // Synchroniser le tableau des enfants avec le nombre
  useEffect(() => {
    const currentLength = children.length
    if (childrenCount > currentLength) {
      const newChildren = [...children]
      for (let i = currentLength; i < childrenCount; i++) {
        newChildren.push({ isSharedCustody: false, isInvalid: false })
      }
      setValue(childrenKey, newChildren)
    } else if (childrenCount < currentLength) {
      setValue(childrenKey, children.slice(0, childrenCount))
      setExpandedChildren(prev => {
        const newSet = new Set(prev)
        for (let i = childrenCount; i < currentLength; i++) {
          newSet.delete(i)
        }
        return newSet
      })
    }
  }, [childrenCount, children.length, setValue, childrenKey])

  const toggleChildDetails = (index: number) => {
    const isCurrentlyExpanded = expandedChildren.has(index)
    
    if (isCurrentlyExpanded) {
      const newChildren = [...children]
      newChildren[index] = { isSharedCustody: false, isInvalid: false }
      setValue(childrenKey, newChildren)
      setExpandedChildren(prev => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    } else {
      setExpandedChildren(prev => {
        const newSet = new Set(prev)
        newSet.add(index)
        return newSet
      })
    }
  }

  // Calculer les parts en temps réel
  const calculatedParts = calculateSingleParts(partsOptions, childrenCount, children)

  return (
    <div className="space-y-4 mt-4">
      {/* Section Enfants */}
      <div className="border-t border-stone-200 pt-4">
        <h4 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Enfants à charge
        </h4>
        
        <div className="space-y-3">
          <div>
            <Select
              label="Nombre d'enfants"
              error={errors[childrenCountKey]?.message}
              options={[
                { value: 0, label: '0 enfant' },
                { value: 1, label: '1 enfant' },
                { value: 2, label: '2 enfants' },
                { value: 3, label: '3 enfants' },
                { value: 4, label: '4 enfants' },
                { value: 5, label: '5 enfants' },
                { value: 6, label: '6 enfants ou plus' },
              ]}
              {...register(childrenCountKey, { valueAsNumber: true })}
            />
            <p className="mt-1 text-xs text-stone-500">Enfants rattachés au foyer fiscal du conjoint {person}</p>
          </div>

          {childrenCount > 0 && (
            <div className="bg-stone-50 rounded-lg p-3 space-y-2">
              <p className="text-xs text-stone-600 mb-2">
                Cliquez sur <span className="font-medium">+</span> pour préciser une situation particulière (garde alternée, invalidité).
              </p>
              
              {Array.from({ length: childrenCount }).map((_, index) => {
                const isExpanded = expandedChildren.has(index)
                const child = children[index] || { isSharedCustody: false, isInvalid: false }
                const hasSpecialOptions = child.isSharedCustody || child.isInvalid
                
                return (
                  <div key={index} className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-stone-50 transition-colors"
                      onClick={() => toggleChildDetails(index)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-stone-100 rounded-full flex items-center justify-center text-xs font-medium text-stone-600">
                          {index + 1}
                        </span>
                        <span className="text-xs font-medium text-stone-700">
                          Enfant {index + 1}
                          <span className="text-stone-400 font-normal ml-1">
                            ({index < 2 ? '0.5' : '1'} part)
                          </span>
                        </span>
                        {hasSpecialOptions && !isExpanded && (
                          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                            Modifié
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isExpanded 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <svg 
                          className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-45' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-stone-100 bg-stone-50/50">
                        <div className="space-y-2 ml-7">
                          <Checkbox
                            label="Garde alternée"
                            description="Part divisée par 2"
                            {...register(`${childrenKey}.${index}.isSharedCustody`)}
                          />
                          
                          <Checkbox
                            label="Enfant invalide"
                            description="+0.5 part supplémentaire"
                            {...register(`${childrenKey}.${index}.isInvalid`)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Section Situations particulières */}
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
