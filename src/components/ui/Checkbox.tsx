'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || React.useId()
    const descriptionId = React.useId()

    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            'h-5 w-5 rounded border-stone-300 text-orange-500',
            'focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
            'transition-colors duration-200',
            'cursor-pointer',
            className
          )}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-stone-700 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} className="text-sm text-stone-500">{description}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
