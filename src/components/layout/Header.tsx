'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navLinks = [
    { href: '/simulateur', label: 'Simulateur', title: 'Simulateur fiscal PACS et Mariage' },
    { href: '/pacs', label: 'Guide PACS', title: 'Guide complet sur le PACS' },
    { href: '/mariage', label: 'Guide Mariage', title: 'Guide complet sur le mariage et les impôts' },
    { href: '/quotient-familial', label: 'Quotient Familial', title: 'Guide quotient familial et parts fiscales' },
    { href: '/faq', label: 'FAQ', title: 'Questions fréquentes sur les impôts en couple' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" title="ImpotsCouple - Simulateur PACS Mariage" onClick={closeMenu}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">IC</span>
            </div>
            <span className="font-semibold text-stone-900 text-sm sm:text-base">
              Impots<span className="text-orange-500">Couple</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                title={link.title}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop + Burger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/simulateur" title="Lancer une simulation gratuite" className="hidden sm:block">
              <Button size="sm">
                Simuler
              </Button>
            </Link>

            {/* Menu Burger Mobile */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 border-t border-stone-200' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-3 py-3 bg-white" aria-label="Navigation mobile">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                title={link.title}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-stone-100">
              <Link href="/simulateur" onClick={closeMenu}>
                <Button className="w-full" size="sm">
                  Simuler gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
