import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4" title="ImpotsCouple - Accueil">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">IC</span>
              </div>
              <span className="font-semibold text-white text-sm sm:text-base">
                Impots<span className="text-orange-500">Couple</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xs">
              Simulateur fiscal gratuit et anonyme pour calculer l&apos;avantage du PACS 
              ou du mariage sur vos impôts.
            </p>
          </div>

          {/* Outils */}
          <div>
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Outil</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/simulateur" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Comparateur Pacs, Mariage, Célibataire
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Guides</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/pacs" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Guide PACS 2026
                </Link>
              </li>
              <li>
                <Link href="/mariage" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Guide Mariage 2026
                </Link>
              </li>
              <li>
                <Link href="/quotient-familial" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Quotient familial
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  FAQ Mariage et Pacs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Blog impots et fiscalité
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Informations</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/a-propos" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <a href="mailto:contact@impotscouple.fr" className="text-xs sm:text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom */}
        <div className="mt-6 sm:mt-4 pt-4 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-stone-500">
              © {currentYear} ImpotsCouple. Tous droits réservés.
            </p>
            <p className="text-[10px] sm:text-xs text-stone-500 text-center">
              Simulation à titre indicatif, basée sur le barème fiscal {currentYear}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
