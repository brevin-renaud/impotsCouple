import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'PACS 2026 : Guide Complet, Avantages Fiscaux et Démarches',
  description:
    'Tout savoir sur le PACS en 2026 : avantages fiscaux, impôts, quotient familial, différence avec le mariage. Guide complet avec simulateur gratuit pour calculer votre économie.',
  alternates: {
    canonical: 'https://impotscouple.fr/pacs',
  },
  openGraph: {
    title: 'PACS 2026 : Guide Complet et Avantages Fiscaux',
    description:
      'Découvrez tous les avantages du PACS : impôts, succession, patrimoine. Simulateur gratuit pour calculer votre économie fiscale.',
    url: 'https://impotscouple.fr/pacs',
    type: 'article',
  },
}

export default function PacsPage() {
  const pacsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PACS 2026 : Guide Complet, Avantages Fiscaux et Démarches',
    description:
      'Tout savoir sur le PACS : avantages fiscaux, impôts, quotient familial, différence avec le mariage.',
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
    mainEntityOfPage: 'https://impotscouple.fr/pacs',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pacsJsonLd) }}
      />

      <div className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-stone-50">
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
                <li className="text-stone-900 font-medium">PACS</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Le PACS en 2026 :{' '}
                <span className="text-orange-500">Guide Complet</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Découvrez tous les avantages du Pacte Civil de Solidarité : fiscalité,
                succession, patrimoine. Calculez votre économie d&apos;impôts avec notre
                simulateur gratuit.
              </p>
            </header>

            {/* CTA Principal */}
            <Card variant="elevated" className="mb-12 bg-gradient-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Calculez votre économie d&apos;impôts avec le PACS
                </h2>
                <p className="text-orange-100 mb-6">
                  Simulation gratuite en 2 minutes basée sur le barème fiscal 2026
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Lancer la simulation PACS
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
                        1. Qu&apos;est-ce que le PACS ?
                      </a>
                    </li>
                    <li>
                      <a href="#avantages-fiscaux" className="hover:text-orange-600">
                        2. Les avantages fiscaux du PACS
                      </a>
                    </li>
                    <li>
                      <a href="#imposition-commune" className="hover:text-orange-600">
                        3. L&apos;imposition commune
                      </a>
                    </li>
                    <li>
                      <a href="#quotient-familial" className="hover:text-orange-600">
                        4. Le quotient familial en couple pacsé
                      </a>
                    </li>
                    <li>
                      <a href="#difference-mariage" className="hover:text-orange-600">
                        5. PACS vs Mariage : les différences
                      </a>
                    </li>
                    <li>
                      <a href="#demarches" className="hover:text-orange-600">
                        6. Comment se pacser ?
                      </a>
                    </li>
                    <li>
                      <a href="#succession" className="hover:text-orange-600">
                        7. PACS et succession
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
                    1. Qu&apos;est-ce que le PACS ?
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le <strong>Pacte Civil de Solidarité (PACS)</strong> est un contrat conclu entre deux
                    personnes majeures, de sexe différent ou de même sexe, pour organiser leur vie commune.
                    Créé en 1999, il offre une alternative au mariage avec des formalités plus simples.
                  </p>
                  <p className="text-stone-600 mb-4">
                    Le PACS crée des <strong>droits et des devoirs</strong> entre les partenaires :
                  </p>
                  <ul className="list-disc list-inside text-stone-600 space-y-2 mb-4">
                    <li>Aide matérielle réciproque</li>
                    <li>Assistance mutuelle</li>
                    <li>Responsabilité solidaire des dettes de la vie courante</li>
                    <li>Imposition commune dès l&apos;année du PACS</li>
                  </ul>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                    <p className="text-stone-700 text-sm">
                      <strong>Bon à savoir :</strong> En 2024, plus de 200 000 PACS ont été conclus en
                      France, soit presque autant que de mariages.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Avantages fiscaux */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="avantages-fiscaux" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    2. Les avantages fiscaux du PACS
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le PACS offre des <strong>avantages fiscaux significatifs</strong>, identiques à ceux
                    du mariage :
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
                        Déclaration unique des revenus du couple, ce qui peut réduire significativement
                        l&apos;impôt si les revenus sont déséquilibrés.
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
                        2 parts fiscales de base pour le couple, plus les parts des enfants à charge.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Donation exonérée
                    </h3>
                      <p className="text-sm text-green-700">
                        Abattement de 80 724 € sur les donations entre partenaires pacsés.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ISF/IFI commun
                    </h3>
                      <p className="text-sm text-green-700">
                        Déclaration commune du patrimoine pour l&apos;Impôt sur la Fortune Immobilière.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Exemple concret
                  </h3>
                    <p className="text-sm text-blue-700">
                      Un couple où l&apos;un gagne 60 000 € et l&apos;autre 20 000 € peut économiser jusqu&apos;à
                      <strong> 2 500 € d&apos;impôts par an</strong> en se pacsant, grâce à l&apos;effet du
                      quotient familial.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Imposition commune */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="imposition-commune" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    3. L&apos;imposition commune
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Dès l&apos;année du PACS, vous devez faire une <strong>déclaration commune de revenus</strong>.
                    Contrairement au mariage, il n&apos;y a pas d&apos;option pour l&apos;imposition séparée la première
                    année.
                  </p>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Comment ça fonctionne ?</h3>
                  <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-4">
                    <li>Vos revenus sont additionnés</li>
                    <li>Le total est divisé par le nombre de parts fiscales</li>
                    <li>Le barème progressif est appliqué à ce &quot;revenu par part&quot;</li>
                    <li>L&apos;impôt obtenu est multiplié par le nombre de parts</li>
                  </ol>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Important
                  </h3>
                    <p className="text-sm text-yellow-700">
                      Pour bénéficier de l&apos;imposition commune sur toute l&apos;année, vous devez vous pacser
                      <strong> avant le 31 décembre</strong> de l&apos;année en cours.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quotient familial */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="quotient-familial" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    4. Le quotient familial en couple pacsé
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le <strong>quotient familial</strong> est un mécanisme qui adapte l&apos;impôt à la taille du
                    foyer fiscal. Voici le nombre de parts selon votre situation :
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-stone-100">
                          <th className="text-left p-3 font-semibold">Situation</th>
                          <th className="text-center p-3 font-semibold">Nombre de parts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3">Couple pacsé sans enfant</td>
                          <td className="text-center p-3 font-medium">2</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple pacsé + 1 enfant</td>
                          <td className="text-center p-3 font-medium">2,5</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple pacsé + 2 enfants</td>
                          <td className="text-center p-3 font-medium">3</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple pacsé + 3 enfants</td>
                          <td className="text-center p-3 font-medium">4</td>
                        </tr>
                        <tr>
                          <td className="p-3">Couple pacsé + 4 enfants</td>
                          <td className="text-center p-3 font-medium">5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-stone-600 text-sm">
                    <strong>À noter :</strong> L&apos;avantage procuré par chaque demi-part est plafonné à
                    1 759 € en 2026.
                  </p>
                </CardContent>
              </Card>

              {/* PACS vs Mariage */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="difference-mariage" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    5. PACS vs Mariage : les différences
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Sur le plan <strong>fiscal</strong>, le PACS et le mariage sont <strong>strictement
                    identiques</strong>. Les différences concernent principalement les aspects juridiques :
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-stone-100">
                          <th className="text-left p-3 font-semibold">Critère</th>
                          <th className="text-center p-3 font-semibold">PACS</th>
                          <th className="text-center p-3 font-semibold">Mariage</th>
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
                        <tr>
                          <td className="p-3 font-medium">Succession</td>
                          <td className="text-center p-3 text-orange-600">Exonéré mais pas héritier</td>
                          <td className="text-center p-3 text-green-600">Exonéré + héritier</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Pension de réversion</td>
                          <td className="text-center p-3 text-red-600">Non</td>
                          <td className="text-center p-3 text-green-600">Oui</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Rupture</td>
                          <td className="text-center p-3 text-green-600">Déclaration simple</td>
                          <td className="text-center p-3 text-orange-600">Divorce (procédure)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Link href="/mariage" className="text-orange-600 hover:text-orange-700 font-medium">
                    → En savoir plus sur le mariage
                  </Link>
                </CardContent>
              </Card>

              {/* Démarches */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="demarches" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    6. Comment se pacser ?
                  </h2>
                  <p className="text-stone-600 mb-4">
                    La procédure de PACS est simple et gratuite. Voici les étapes :
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Préparez les documents</h3>
                        <p className="text-sm text-stone-600">
                          Pièce d&apos;identité, acte de naissance de moins de 3 mois, convention de PACS
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Prenez rendez-vous</h3>
                        <p className="text-sm text-stone-600">
                          En mairie de votre domicile commun ou chez un notaire
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Signez la convention</h3>
                        <p className="text-sm text-stone-600">
                          Les deux partenaires doivent être présents et signer ensemble
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">Enregistrement</h3>
                        <p className="text-sm text-stone-600">
                          Le PACS est enregistré et mentionné sur votre acte de naissance
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700">
                      <strong>Conseil :</strong> Pacsez-vous avant le 31 décembre pour bénéficier de
                      l&apos;imposition commune dès cette année fiscale !
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Succession */}
              <Card variant="elevated" className="mb-8">
                <CardContent className="p-8">
                  <h2 id="succession" className="text-2xl font-bold text-stone-900 mb-4 scroll-mt-24">
                    7. PACS et succession
                  </h2>
                  <p className="text-stone-600 mb-4">
                    Le partenaire de PACS n&apos;est <strong>pas automatiquement héritier</strong>. Pour lui
                    transmettre votre patrimoine, vous devez rédiger un testament.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Ce qu&apos;il faut savoir</h3>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Le partenaire pacsé est exonéré de droits de succession</li>
                      <li>• Mais il n&apos;hérite pas automatiquement sans testament</li>
                      <li>• Les enfants conservent leur part réservataire</li>
                    </ul>
                  </div>

                  <p className="text-stone-600 text-sm">
                    Pour une protection optimale de votre partenaire, consultez un notaire pour établir
                    un testament ou envisagez le mariage.
                  </p>
                </CardContent>
              </Card>
            </article>

            {/* CTA Final */}
            <Card variant="elevated" className="bg-gradient-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Le PACS est-il avantageux pour vous ?
                </h2>
                <p className="text-orange-100 mb-6">
                  Calculez en 2 minutes l&apos;économie d&apos;impôts que vous pourriez réaliser en vous pacsant
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
              <Link href="/mariage">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full">
                  <CardContent className="p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="font-medium text-stone-900">Guide Mariage</h3>
                    <p className="text-sm text-stone-500">Tout sur le mariage et les impôts</p>
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
