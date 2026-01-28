import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Quotient Familial 2026 : Calcul, Parts Fiscales et Plafonnement',
  description:
    'Comprendre le quotient familial en 2026 : calcul des parts fiscales, plafonnement, avantages pour les couples et familles. Guide complet avec exemples et simulateur gratuit.',
  alternates: {
    canonical: 'https://impotscouple.fr/quotient-familial',
  },
  openGraph: {
    title: 'Quotient Familial 2026 : Calcul et Parts Fiscales',
    description:
      'Guide complet sur le quotient familial : calcul des parts, plafonnement, avantages. Simulateur gratuit.',
    url: 'https://impotscouple.fr/quotient-familial',
    type: 'article',
  },
}

export default function QuotientFamilialPage() {
  const quotientJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Quotient Familial 2026 : Calcul, Parts Fiscales et Plafonnement',
    description:
      'Guide complet sur le quotient familial : calcul des parts fiscales, plafonnement, avantages pour les couples.',
    author: {
      '@type': 'Organization',
      name: 'ImpotsCouple',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ImpotsCouple',
      logo: {
        '@type': 'ImageObject',
        url: 'https://impotscouple.fr/og-image.png',
      },
    },
    datePublished: '2025-01-01',
    dateModified: '2026-01-28',
    mainEntityOfPage: 'https://impotscouple.fr/quotient-familial',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotientJsonLd) }}
      />

      <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-stone-500 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-orange-600">
                    Accueil
                  </Link>
                </li>
                <li>/</li>
                <li className="text-stone-900 font-medium">Quotient familial</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Le Quotient Familial en 2026 :{' '}
                <span className="text-orange-500">Guide Complet</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Comprenez le mécanisme des parts fiscales, leur impact sur vos impôts et
                comment optimiser votre situation familiale.
              </p>
            </header>

            {/* CTA Principal */}
            <Card variant="elevated" className="mb-12 bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculez vos parts fiscales automatiquement
                </h2>
                <p className="text-orange-100 mb-6">
                  Notre simulateur calcule votre quotient familial et compare les scénarios
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Simuler mon quotient familial
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sommaire */}
            <Card variant="outlined" className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Sommaire
                </h2>
                <nav>
                  <ul className="space-y-2 text-stone-600">
                    <li>
                      <a href="#definition" className="hover:text-orange-600">
                        1. Qu&apos;est-ce que le quotient familial ?
                      </a>
                    </li>
                    <li>
                      <a href="#calcul" className="hover:text-orange-600">
                        2. Comment se calcule le quotient familial ?
                      </a>
                    </li>
                    <li>
                      <a href="#nombre-parts" className="hover:text-orange-600">
                        3. Tableau des parts fiscales 2026
                      </a>
                    </li>
                    <li>
                      <a href="#plafonnement" className="hover:text-orange-600">
                        4. Le plafonnement du quotient familial
                      </a>
                    </li>
                    <li>
                      <a href="#exemple" className="hover:text-orange-600">
                        5. Exemple de calcul détaillé
                      </a>
                    </li>
                    <li>
                      <a href="#cas-particuliers" className="hover:text-orange-600">
                        6. Cas particuliers (garde alternée, parent isolé...)
                      </a>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>

            {/* Contenu principal */}
            <article className="prose prose-stone max-w-none">
              {/* Définition */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="definition" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    1. Qu&apos;est-ce que le quotient familial ?
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le <strong>quotient familial</strong> est un mécanisme fiscal français qui permet
                    d&apos;adapter l&apos;impôt sur le revenu à la taille du foyer. Il repose sur un système
                    de <strong>parts fiscales</strong>.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Le principe</h3>
                    <p className="text-sm text-blue-700">
                      Plus votre foyer compte de personnes (enfants, conjoint), plus vous avez de
                      parts fiscales. Votre revenu est alors divisé par ce nombre de parts avant
                      l&apos;application du barème progressif, ce qui <strong>réduit votre impôt</strong>.
                    </p>
                  </div>

                  <p className="text-stone-600">
                    Ce système permet de tenir compte des charges familiales et d&apos;assurer une
                    certaine équité entre les foyers de tailles différentes.
                  </p>
                </CardContent>
              </Card>

              {/* Calcul */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="calcul" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    2. Comment se calcule le quotient familial ?
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le calcul de l&apos;impôt avec le quotient familial se fait en 4 étapes :
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4 items-start bg-stone-50 rounded-lg p-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Déterminer le revenu net imposable</h3>
                        <p className="text-sm text-stone-600">
                          C&apos;est la somme des revenus du foyer après abattements (10% pour frais
                          professionnels par exemple).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start bg-stone-50 rounded-lg p-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Diviser par le nombre de parts</h3>
                        <p className="text-sm text-stone-600">
                          <strong>Quotient = Revenu net imposable ÷ Nombre de parts</strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start bg-stone-50 rounded-lg p-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Appliquer le barème progressif</h3>
                        <p className="text-sm text-stone-600">
                          Le barème 2026 s&apos;applique au quotient pour obtenir l&apos;impôt par part.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start bg-stone-50 rounded-lg p-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Multiplier par le nombre de parts</h3>
                        <p className="text-sm text-stone-600">
                          <strong>Impôt total = Impôt par part × Nombre de parts</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Formule résumée</h3>
                    <p className="text-sm text-orange-700 font-mono">
                      Impôt = (Revenu ÷ Parts) × Barème × Parts
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tableau des parts */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="nombre-parts" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    3. Tableau des parts fiscales 2026
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Voici le nombre de parts fiscales selon votre situation :
                  </p>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Pour les personnes seules</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-stone-100">
                          <th className="text-left p-3 font-semibold">Situation</th>
                          <th className="text-center p-3 font-semibold">Parts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3">Célibataire, divorcé(e), veuf(ve) sans enfant</td>
                          <td className="text-center p-3 font-medium">1</td>
                        </tr>
                        <tr>
                          <td className="p-3">Parent isolé + 1 enfant</td>
                          <td className="text-center p-3 font-medium">2</td>
                        </tr>
                        <tr>
                          <td className="p-3">Parent isolé + 2 enfants</td>
                          <td className="text-center p-3 font-medium">2,5</td>
                        </tr>
                        <tr>
                          <td className="p-3">Parent isolé + 3 enfants</td>
                          <td className="text-center p-3 font-medium">3,5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Pour les couples (mariés ou pacsés)</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-orange-100">
                          <th className="text-left p-3 font-semibold">Situation</th>
                          <th className="text-center p-3 font-semibold">Parts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3">Couple sans enfant</td>
                          <td className="text-center p-3 font-medium text-orange-600">2</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple + 1 enfant</td>
                          <td className="text-center p-3 font-medium text-orange-600">2,5</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple + 2 enfants</td>
                          <td className="text-center p-3 font-medium text-orange-600">3</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3">Couple + 3 enfants</td>
                          <td className="text-center p-3 font-medium text-green-600">4</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3">Couple + 4 enfants</td>
                          <td className="text-center p-3 font-medium text-green-600">5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Règle de calcul</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>1er et 2ème enfant</strong> : +0,5 part chacun</li>
                      <li>• <strong>À partir du 3ème enfant</strong> : +1 part par enfant</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Plafonnement */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="plafonnement" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    4. Le plafonnement du quotient familial
                  </h2>
                  <p className="text-stone-600 mb-4">
                    L&apos;avantage fiscal procuré par le quotient familial est <strong>plafonné</strong>.
                    Cela signifie que l&apos;économie d&apos;impôt ne peut pas dépasser un certain montant par
                    demi-part supplémentaire.
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Plafonds 2026
                  </h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>Demi-part classique</strong> : 1 759 € d&apos;avantage maximum</li>
                      <li>• <strong>Parent isolé</strong> : 4 149 € pour la première demi-part</li>
                      <li>• <strong>Personne invalide/ancien combattant</strong> : 3 512 € par demi-part</li>
                    </ul>
                  </div>

                  <p className="text-stone-600 text-sm">
                    Si l&apos;avantage calculé dépasse le plafond, votre impôt sera recalculé en appliquant
                    la réduction maximale autorisée.
                  </p>
                </CardContent>
              </Card>

              {/* Exemple */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="exemple" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    5. Exemple de calcul détaillé
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Prenons l&apos;exemple d&apos;un couple marié avec 2 enfants et un revenu net imposable
                    de 60 000 €.
                  </p>

                  <div className="bg-stone-50 rounded-lg p-6 mb-4">
                    <h3 className="font-semibold text-stone-800 mb-4">Données</h3>
                    <ul className="text-stone-600 space-y-1 mb-4">
                      <li>• Revenu net imposable : <strong>60 000 €</strong></li>
                      <li>• Nombre de parts : <strong>3</strong> (couple + 2 enfants)</li>
                    </ul>

                    <h3 className="font-semibold text-stone-800 mb-2">Calcul</h3>
                    <div className="space-y-2 text-stone-600">
                      <p>1. Quotient : 60 000 € ÷ 3 = <strong>20 000 €</strong></p>
                      <p>2. Application du barème sur 20 000 € :</p>
                      <ul className="ml-4 text-sm">
                        <li>• Tranche à 0% : 0 € à 11 294 € = 0 €</li>
                        <li>• Tranche à 11% : 11 294 € à 20 000 € = 957,66 €</li>
                      </ul>
                      <p>3. Impôt par part : <strong>957,66 €</strong></p>
                      <p>4. Impôt total : 957,66 € × 3 = <strong>2 872,98 €</strong></p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Comparaison</h3>
                    <p className="text-sm text-green-700">
                      Le même couple sans quotient familial (2 célibataires) paierait environ
                      <strong> 5 400 €</strong>. L&apos;économie est de <strong>2 527 €</strong> !
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cas particuliers */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="cas-particuliers" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    6. Cas particuliers
                  </h2>

                  <div className="space-y-6">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-stone-800 mb-2">Garde alternée</h3>
                      <p className="text-stone-600 text-sm">
                        En cas de garde alternée, chaque parent bénéficie de la <strong>moitié</strong> des
                        parts attribuées pour les enfants. Exemple : 1 enfant en garde alternée = 0,25 part
                        par parent au lieu de 0,5.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-stone-800 mb-2">Parent isolé</h3>
                      <p className="text-stone-600 text-sm">
                        Le parent qui élève seul son enfant bénéficie d&apos;une <strong>demi-part
                        supplémentaire</strong> pour le premier enfant. C&apos;est un avantage significatif
                        avec un plafonnement plus élevé (4 149 €).
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-stone-800 mb-2">Invalidité</h3>
                      <p className="text-stone-600 text-sm">
                        Les personnes titulaires d&apos;une carte d&apos;invalidité ou de mobilité inclusion
                        bénéficient d&apos;une <strong>demi-part supplémentaire</strong>, avec un plafonnement
                        avantageux de 3 512 €.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-stone-800 mb-2">Anciens combattants</h3>
                      <p className="text-stone-600 text-sm">
                        Les anciens combattants de plus de 74 ans bénéficient d&apos;une demi-part
                        supplémentaire avec un plafonnement à 3 512 €.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>

            {/* CTA Final */}
            <Card variant="elevated" className="bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Calculez votre quotient familial instantanément
                </h2>
                <p className="text-orange-100 mb-6">
                  Notre simulateur calcule automatiquement vos parts fiscales et compare tous les scénarios
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Calculer mes parts fiscales
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Liens connexes */}
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              <Link href="/pacs">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full">
                  <CardContent className="p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-medium text-stone-900">Guide PACS</h3>
                    <p className="text-sm text-stone-500">Le PACS et les impôts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/mariage">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full">
                  <CardContent className="p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="font-medium text-stone-900">Guide Mariage</h3>
                    <p className="text-sm text-stone-500">Le mariage et les impôts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full">
                  <CardContent className="p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-medium text-stone-900">FAQ</h3>
                    <p className="text-sm text-stone-500">Questions fréquentes</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
