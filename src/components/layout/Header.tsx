import Link from 'next/link'
import { Button } from '@/components/ui'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-semibold text-stone-900">
              Fiscal<span className="text-orange-500">Couple</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/simulateur"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Simulateur
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Guide fiscal
            </Link>
            <Link
              href="/a-propos"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              À propos
            </Link>
          </nav>

          {/* CTA */}
          <Link href="/simulateur">
            <Button size="sm">
              Simuler gratuitement
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
