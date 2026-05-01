'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)
  const tooltipId = React.useId()

  const open = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setIsVisible(true)
  }

  const close = () => {
    closeTimeout.current = setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className={cn('inline-flex', className)}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={() => setIsVisible(false)}
        aria-label="Plus d'informations"
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </button>

      {isVisible && (
        <div
          id={tooltipId}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-stone-900 text-white text-xs rounded-lg shadow-lg max-w-sm whitespace-normal w-48"
          role="tooltip"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="relative">
            {content}
            <div aria-hidden="true" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  )
}
