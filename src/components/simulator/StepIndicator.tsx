'use client'

import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {labels.map((label, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center gap-2',
                stepNumber <= currentStep ? 'opacity-100' : 'opacity-40'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
                  isCompleted && 'bg-orange-500 text-white',
                  isCurrent && 'bg-orange-500 text-white ring-4 ring-orange-100',
                  !isCompleted && !isCurrent && 'bg-stone-200 text-stone-500'
                )}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center max-w-[80px]',
                  isCurrent ? 'text-orange-600' : 'text-stone-500'
                )}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
