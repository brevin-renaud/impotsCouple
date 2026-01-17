import * as React from 'react'
import { cn } from '@/lib/utils'
import { Tooltip } from './Tooltip'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  infoTooltip?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, infoTooltip, id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-2"
          >
            <span>{label}</span>
            {infoTooltip && (
              <Tooltip content={infoTooltip}>
                <svg 
                  className="w-4 h-4 text-orange-500 hover:text-orange-600 transition-colors"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </Tooltip>
            )}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            data-error={error ? 'true' : undefined}
            className={cn(
              'block w-full rounded-xl border bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
              'disabled:bg-stone-50 disabled:text-stone-500 disabled:cursor-not-allowed',
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-stone-200 hover:border-stone-300',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-stone-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
