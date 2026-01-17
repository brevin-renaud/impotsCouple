import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-stone-600 max-w-sm">
              Simulateur fiscal gratuit et anonyme pour comparer l&apos;impact du célibat et de l&apos;union sur vos impôts.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/simulateur" className="text-sm text-stone-600 hover:text-orange-500 transition-colors">
                  Simulateur
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-stone-600 hover:text-orange-500 transition-colors">
                  Guide fiscal
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-stone-600 hover:text-orange-500 transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-stone-600 hover:text-orange-500 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-stone-600 hover:text-orange-500 transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-500">
              © {currentYear} FiscalCouple. Tous droits réservés.
            </p>
            <p className="text-xs text-stone-400">
              ⚠️ Simulation à titre indicatif uniquement, non contractuelle.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
