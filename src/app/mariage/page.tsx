import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Mariage 2026 : Avantages Fiscaux, Impôts et Guide Complet',
  description:
    'Tout savoir sur le mariage en 2026 : avantages fiscaux, calcul des impôts, quotient familial, succession. Guide complet avec simulateur gratuit pour calculer votre économie.',
  alternates: {
    canonical: 'https://impotscouple.fr/mariage',
  },
  openGraph: {
    title: 'Mariage 2026 : Avantages Fiscaux et Guide Complet',
    description:
      'Découvrez tous les avantages fiscaux du mariage : impôts, succession, patrimoine. Simulateur gratuit pour calculer votre économie.',
    url: 'https://impotscouple.fr/mariage',
    type: 'article',
  },
}

export default function MariagePage() {
  const mariageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mariage 2026 : Avantages Fiscaux, Impôts et Guide Complet',
    description:
      'Tout savoir sur le mariage : avantages fiscaux, impôts, quotient familial, succession.',
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
    mainEntityOfPage: 'https://impotscouple.fr/mariage',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mariageJsonLd) }}
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
                <li className="text-stone-900 font-medium">Mariage</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Le Mariage en 2026 :{' '}
                <span className="text-orange-500">Guide Fiscal Complet</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Découvrez tous les avantages fiscaux du mariage : impôts, succession, 
                pension de réversion. Calculez votre économie avec notre simulateur gratuit.
              </p>
            </header>

            {/* CTA Principal */}
            <Card variant="elevated" className="mb-12 bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-4 md:p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                    <svg className="w-7 h-7 hidden md:inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  Calculez votre économie d&apos;impôts avec le mariage
                </h2>
                <p className="text-orange-100 mb-6">
                  Simulation gratuite en 2 minutes basée sur le barème fiscal 2026
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Lancer la simulation Mariage
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
                      <a href="#avantages-fiscaux" className="hover:text-orange-600">
                        1. Les avantages fiscaux du mariage
                      </a>
                    </li>
                    <li>
                      <a href="#imposition-commune" className="hover:text-orange-600">
                        2. L&apos;imposition commune des époux
                      </a>
                    </li>
                    <li>
                      <a href="#quotient-familial" className="hover:text-orange-600">
                        3. Le quotient familial pour les mariés
                      </a>
                    </li>
                    <li>
                      <a href="#succession" className="hover:text-orange-600">
                        4. Mariage et succession
                      </a>
                    </li>
                    <li>
                      <a href="#pension-reversion" className="hover:text-orange-600">
                        5. La pension de réversion
                      </a>
                    </li>
                    <li>
                      <a href="#difference-pacs" className="hover:text-orange-600">
                        6. Mariage vs PACS : que choisir ?
                      </a>
                    </li>
                    <li>
                      <a href="#regimes-matrimoniaux" className="hover:text-orange-600">
                        7. Les régimes matrimoniaux
                      </a>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>

            {/* Contenu principal */}
            <article className="prose prose-stone max-w-none">
              {/* Avantages fiscaux */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="avantages-fiscaux" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    1. Les avantages fiscaux du mariage
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le mariage offre de <strong>nombreux avantages fiscaux</strong> qui peuvent
                    considérablement réduire votre charge d&apos;impôts :
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Imposition commune
                    </h3>
                      <p className="text-sm text-green-700">
                        Déclaration unique des revenus, avantageuse si les salaires sont différents.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Quotient familial
                    </h3>
                      <p className="text-sm text-green-700">
                        2 parts de base + les parts enfants pour réduire votre taux d&apos;imposition.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Succession exonérée
                    </h3>
                      <p className="text-sm text-green-700">
                        Le conjoint survivant ne paie aucun droit de succession.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Donation avantageuse
                    </h3>
                      <p className="text-sm text-green-700">
                        Abattement de 80 724 € sur les donations entre époux.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pension de réversion
                    </h3>
                      <p className="text-sm text-green-700">
                        Le conjoint survivant peut percevoir une partie de la retraite du défunt.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Protection maximale
                    </h3>
                      <p className="text-sm text-green-700">
                        Le conjoint est héritier légal sans besoin de testament.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Exemple concret d&apos;économie
                  </h3>
                    <p className="text-sm text-blue-700">
                      Un couple où l&apos;un gagne 70 000 € et l&apos;autre 25 000 € peut économiser jusqu&apos;à
                      <strong> 3 200 € d&apos;impôts par an</strong> en se mariant. Plus l&apos;écart de revenus
                      est important, plus l&apos;économie est significative.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Imposition commune */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="imposition-commune" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    2. L&apos;imposition commune des époux
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Dès l&apos;année du mariage, les époux sont soumis à une <strong>imposition commune</strong>.
                    Ils peuvent toutefois opter pour l&apos;imposition séparée la première année.
                  </p>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Le mécanisme de l&apos;imposition commune</h3>
                  <div className="bg-stone-50 rounded-lg p-4 mb-4">
                    <ol className="list-decimal list-inside text-stone-600 space-y-2">
                      <li><strong>Addition</strong> : Tous les revenus du couple sont additionnés</li>
                      <li><strong>Division</strong> : Le total est divisé par le nombre de parts fiscales</li>
                      <li><strong>Application du barème</strong> : Le taux progressif s&apos;applique au revenu par part</li>
                      <li><strong>Multiplication</strong> : L&apos;impôt par part × nombre de parts = impôt total</li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Astuce fiscale
                  </h3>
                    <p className="text-sm text-yellow-700">
                      Pour maximiser l&apos;avantage fiscal, mariez-vous <strong>avant le 31 décembre</strong> de l&apos;année
                      en cours. Vous bénéficierez ainsi de l&apos;imposition commune sur tous vos revenus de l&apos;année.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quotient familial */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="quotient-familial" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    3. Le quotient familial pour les mariés
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le <strong>quotient familial</strong> est l&apos;un des piliers de l&apos;avantage fiscal du mariage.
                    Il permet de réduire l&apos;impôt en fonction de la composition du foyer.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-stone-100">
                          <th className="text-left p-3 font-semibold">Situation</th>
                          <th className="text-center p-3 font-semibold">Parts fiscales</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3">Couple marié sans enfant</td>
                          <td className="text-center p-3 font-medium text-orange-600">2</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple marié + 1 enfant</td>
                          <td className="text-center p-3 font-medium text-orange-600">2,5</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple marié + 2 enfants</td>
                          <td className="text-center p-3 font-medium text-orange-600">3</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple marié + 3 enfants</td>
                          <td className="text-center p-3 font-medium text-orange-600">4</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3">Couple marié + 4 enfants</td>
                          <td className="text-center p-3 font-medium text-green-600">5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-stone-600 text-sm">
                    <strong>Plafonnement 2026 :</strong> L&apos;avantage fiscal par demi-part supplémentaire est
                    plafonné à environ 1 759 €.
                  </p>
                </CardContent>
              </Card>

              {/* Succession */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="succession" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    4. Mariage et succession : une protection maximale
                  </h2>
                  <p className="text-stone-600 mb-4">
                    C&apos;est l&apos;un des <strong>avantages majeurs du mariage</strong> par rapport au PACS :
                    le conjoint survivant est automatiquement protégé.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Exonération totale
                    </h3>
                      <p className="text-sm text-green-700">
                        Le conjoint survivant ne paie <strong>aucun droit de succession</strong>, quelle
                        que soit la valeur du patrimoine transmis.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Héritier légal
                    </h3>
                      <p className="text-sm text-green-700">
                        Le conjoint est héritier de plein droit, même sans testament. Il peut choisir
                        entre l&apos;usufruit ou 1/4 en pleine propriété.
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Comparaison PACS vs Mariage</h3>
                    <p className="text-sm text-orange-700">
                      Contrairement au PACS, le mariage offre une protection automatique. Le partenaire
                      pacsé n&apos;hérite pas sans testament, même s&apos;il est exonéré de droits.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pension de réversion */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="pension-reversion" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    5. La pension de réversion : un avantage exclusif du mariage
                  </h2>
                  <p className="text-stone-600 mb-4">
                    La <strong>pension de réversion</strong> est un avantage majeur réservé aux personnes mariées.
                    Elle n&apos;existe pas pour les partenaires pacsés ou les concubins.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Qu&apos;est-ce que c&apos;est ?</h3>
                    <p className="text-sm text-blue-700">
                      Au décès d&apos;un époux, le conjoint survivant peut percevoir une partie de sa
                      retraite. Le taux varie selon les régimes :
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• <strong>Régime général</strong> : 54% de la pension du défunt</li>
                      <li>• <strong>Fonction publique</strong> : 50% de la pension</li>
                      <li>• <strong>Régimes complémentaires</strong> : 60% généralement</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Important
                  </h3>
                    <p className="text-sm text-red-700">
                      Le PACS ne donne <strong>aucun droit à la pension de réversion</strong>. C&apos;est un
                      argument majeur en faveur du mariage pour les couples proches de la retraite.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* PACS vs Mariage */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="difference-pacs" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    6. Mariage vs PACS : que choisir ?
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Sur le plan <strong>strictement fiscal</strong> (impôt sur le revenu), il n&apos;y a
                    <strong> aucune différence</strong>. Mais le mariage offre des avantages supplémentaires :
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-stone-100">
                          <th className="text-left p-3 font-semibold">Critère</th>
                          <th className="text-center p-3 font-semibold">Mariage</th>
                          <th className="text-center p-3 font-semibold">PACS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3 font-medium">Impôt sur le revenu</td>
                          <td className="text-center p-3 text-green-600">Identique</td>
                          <td className="text-center p-3 text-green-600">Identique</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Quotient familial</td>
                          <td className="text-center p-3 text-green-600">Identique</td>
                          <td className="text-center p-3 text-green-600">Identique</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3 font-medium">Héritier automatique</td>
                          <td className="text-center p-3 text-green-600 font-bold">Oui</td>
                          <td className="text-center p-3 text-red-600">Non</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3 font-medium">Pension de réversion</td>
                          <td className="text-center p-3 text-green-600 font-bold">Oui</td>
                          <td className="text-center p-3 text-red-600">Non</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Facilité de rupture</td>
                          <td className="text-center p-3 text-orange-600">Divorce</td>
                          <td className="text-center p-3 text-green-600">Déclaration simple</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Link href="/pacs" className="text-orange-600 hover:text-orange-700 font-medium">
                    → En savoir plus sur le PACS
                  </Link>
                </CardContent>
              </Card>

              {/* Régimes matrimoniaux */}
              <Card variant="elevated" className="mb-8">
                <CardContent>
                  <h2 id="regimes-matrimoniaux" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    7. Les régimes matrimoniaux et leur impact fiscal
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le choix du <strong>régime matrimonial</strong> n&apos;affecte pas directement l&apos;impôt
                    sur le revenu, mais il a des conséquences sur le patrimoine et la succession.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border border-stone-200 rounded-lg p-4">
                      <h3 className="font-semibold text-stone-800 mb-2">
                        Communauté réduite aux acquêts (régime par défaut)
                      </h3>
                      <p className="text-sm text-stone-600">
                        Les biens acquis pendant le mariage sont communs. Les biens possédés avant
                        le mariage restent propres à chacun.
                      </p>
                    </div>
                    <div className="border border-stone-200 rounded-lg p-4">
                      <h3 className="font-semibold text-stone-800 mb-2">
                        Séparation de biens
                      </h3>
                      <p className="text-sm text-stone-600">
                        Chaque époux conserve la propriété exclusive de ses biens. Recommandé si
                        l&apos;un des époux exerce une activité à risque (entrepreneur, etc.).
                      </p>
                    </div>
                    <div className="border border-stone-200 rounded-lg p-4">
                      <h3 className="font-semibold text-stone-800 mb-2">
                        Communauté universelle
                      </h3>
                      <p className="text-sm text-stone-600">
                        Tous les biens sont communs. Souvent choisi par les couples proches de
                        la retraite pour protéger le conjoint survivant.
                      </p>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm">
                    <strong>Conseil :</strong> Le choix du régime matrimonial mérite une réflexion
                    approfondie avec un notaire, surtout si vous avez un patrimoine significatif.
                  </p>
                </CardContent>
              </Card>
            </article>

            {/* CTA Final */}
            <Card variant="elevated" className="bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Le mariage est-il avantageux pour vous ?
                </h2>
                <p className="text-orange-100 mb-6">
                  Calculez en 2 minutes l&apos;économie d&apos;impôts que vous pourriez réaliser
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Calculer mon économie d&apos;impôts
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
                    <p className="text-sm text-stone-500">Tout sur le PACS et les impôts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/quotient-familial">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full">
                  <CardContent className="p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-medium text-stone-900">Quotient familial</h3>
                    <p className="text-sm text-stone-500">Comprendre les parts fiscales</p>
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
