import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'FAQ Impôts Couple 2026 : Questions Fréquentes PACS, Mariage, Fiscalité',
  description:
    'Réponses aux questions les plus fréquentes sur la fiscalité des couples en 2026 : PACS, mariage, quotient familial, déclaration commune, économie d\'impôts.',
  alternates: {
    canonical: 'https://impotscouple.fr/faq',
  },
  openGraph: {
    title: 'FAQ Impôts Couple 2026 : Questions Fréquentes',
    description:
      'Toutes les réponses à vos questions sur la fiscalité des couples : PACS, mariage, quotient familial.',
    url: 'https://impotscouple.fr/faq',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'FAQ Impôts Couple 2026 : Questions Fréquentes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ Impôts Couple 2026 : Questions Fréquentes',
    description: 'Toutes les réponses à vos questions sur la fiscalité des couples.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default function FaqPage() {
  const faqs = [
    {
      category: 'PACS et Mariage',
      questions: [
        {
          question: 'Quelle est la différence fiscale entre le PACS et le mariage ?',
          answer:
            'Du point de vue de l\'impôt sur le revenu, il n\'y a AUCUNE différence. Le PACS et le mariage offrent exactement les mêmes avantages : imposition commune, quotient familial identique, mêmes déductions. Les différences concernent uniquement les aspects juridiques (succession, pension de réversion, etc.).',
        },
        {
          question: 'Quand dois-je me pacser ou me marier pour payer moins d\'impôts cette année ?',
          answer:
            'Vous devez vous pacser ou vous marier AVANT le 31 décembre de l\'année en cours. Même si vous vous unissez le 31 décembre, vous bénéficierez de l\'imposition commune sur tous vos revenus de l\'année.',
        },
        {
          question: 'Est-ce toujours avantageux de se pacser ou se marier ?',
          answer:
            'Non, pas toujours. L\'avantage fiscal est maximal quand il y a une forte différence de revenus entre les conjoints. Si vous gagnez tous les deux le même salaire, l\'impact est généralement neutre. Utilisez notre simulateur pour calculer votre situation exacte.',
        },
        {
          question: 'Peut-on choisir l\'imposition séparée après le PACS ?',
          answer:
            'Non. Contrairement au mariage, le PACS impose obligatoirement l\'imposition commune dès la première année. Il n\'y a pas d\'option pour l\'imposition séparée.',
        },
      ],
    },
    {
      category: 'Quotient Familial',
      questions: [
        {
          question: 'Comment fonctionne le quotient familial ?',
          answer:
            'Le quotient familial divise vos revenus par le nombre de parts fiscales de votre foyer. Par exemple, un couple avec 2 enfants a 3 parts. Si leur revenu est de 60 000 €, le quotient est de 20 000 €. Le barème progressif s\'applique à ce montant, puis l\'impôt est multiplié par 3.',
        },
        {
          question: 'Combien de parts fiscales ai-je ?',
          answer:
            'Un célibataire a 1 part. Un couple (PACS ou marié) a 2 parts. Les 2 premiers enfants ajoutent chacun 0,5 part. À partir du 3ème enfant, chaque enfant ajoute 1 part entière. Des demi-parts supplémentaires existent pour les parents isolés, invalides, etc.',
        },
        {
          question: 'Qu\'est-ce que le plafonnement du quotient familial ?',
          answer:
            'L\'avantage fiscal procuré par chaque demi-part supplémentaire (enfants) est plafonné. En 2026, le plafond est d\'environ 1 759 € par demi-part. Cela signifie que même avec beaucoup d\'enfants, l\'économie d\'impôt ne peut pas dépasser ce montant par demi-part.',
        },
        {
          question: 'La garde alternée change-t-elle le quotient familial ?',
          answer:
            'Oui. En garde alternée, chaque parent bénéficie de la moitié des parts attribuées aux enfants. Par exemple, pour 1 enfant en garde alternée, chaque parent obtient 0,25 part au lieu de 0,5.',
        },
      ],
    },
    {
      category: 'Déclaration d\'impôts',
      questions: [
        {
          question: 'Comment déclarer mes impôts l\'année du PACS ou du mariage ?',
          answer:
            'L\'année de votre union, vous devez faire une déclaration commune. Vous renseignez les revenus des deux conjoints sur la même déclaration. Pour le PACS, c\'est obligatoire. Pour le mariage, vous pouvez opter pour l\'imposition séparée la première année uniquement.',
        },
        {
          question: 'Dois-je informer les impôts de mon PACS ou mariage ?',
          answer:
            'Oui, vous devez signaler votre changement de situation familiale dans les 60 jours sur impots.gouv.fr ou lors de votre déclaration annuelle. Cela permettra d\'ajuster votre taux de prélèvement à la source.',
        },
        {
          question: 'Qu\'est-ce que le revenu net imposable ?',
          answer:
            'Le revenu net imposable est votre revenu après déduction des frais professionnels (10% forfaitaire ou frais réels), des cotisations sociales déductibles, et de certaines charges. C\'est ce montant qui sert de base au calcul de l\'impôt.',
        },
      ],
    },
    {
      category: 'Simulateur ImpotsCouple',
      questions: [
        {
          question: 'Le simulateur est-il fiable ?',
          answer:
            'Notre simulateur utilise le barème fiscal officiel 2026 et les règles de calcul de l\'administration fiscale. Les résultats sont fournis à titre indicatif. Votre situation réelle peut varier selon des éléments non pris en compte (crédits d\'impôts, réductions, revenus exceptionnels).',
        },
        {
          question: 'Mes données sont-elles en sécurité ?',
          answer:
            'Absolument. Nous ne collectons aucune donnée personnelle identifiante (nom, email, IP). Les données de simulation sont anonymes, chiffrées et automatiquement supprimées après 30 jours. Le service est 100% conforme au RGPD.',
        },
        {
          question: 'Pourquoi le simulateur compare-t-il 3 scénarios ?',
          answer:
            'Nous comparons : 1) le célibat (imposition séparée), 2) l\'union (PACS ou mariage avec imposition commune). Comme le PACS et le mariage sont fiscalement identiques, nous affichons un seul résultat "union". Cela vous permet de voir clairement l\'économie potentielle.',
        },
        {
          question: 'Puis-je partager mes résultats ?',
          answer:
            'Oui ! Après simulation, vous obtenez un lien unique que vous pouvez partager. Ce lien est valable 30 jours. Idéal pour discuter avec votre partenaire ou un conseiller fiscal.',
        },
      ],
    },
    {
      category: 'Cas Particuliers',
      questions: [
        {
          question: 'Je suis parent isolé, ai-je un avantage fiscal ?',
          answer:
            'Oui. Un parent qui élève seul son enfant bénéficie d\'une demi-part supplémentaire pour le premier enfant (au lieu de 0,5, vous avez 1 part). Cette demi-part bénéficie d\'un plafonnement plus favorable (4 149 € au lieu de 1 759 €).',
        },
        {
          question: 'Les enfants majeurs comptent-ils dans le quotient familial ?',
          answer:
            'Un enfant majeur peut être rattaché au foyer fiscal de ses parents s\'il a moins de 21 ans, ou moins de 25 ans s\'il poursuit des études. Dans ce cas, il donne droit aux parts habituelles. Sinon, il fait sa propre déclaration.',
        },
        {
          question: 'Comment fonctionne l\'impôt en cas de divorce ou séparation ?',
          answer:
            'L\'année du divorce ou de la rupture de PACS, chaque ex-conjoint fait une déclaration séparée pour ses propres revenus. La répartition des parts liées aux enfants dépend de la garde.',
        },
        {
          question: 'Mon conjoint ne travaille pas, quel est l\'avantage ?',
          answer:
            'C\'est la situation idéale pour l\'optimisation fiscale ! Si un seul conjoint travaille, le mariage ou PACS divise son revenu par 2 parts au lieu de 1, ce qui peut considérablement réduire le taux marginal d\'imposition.',
        },
      ],
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                <li className="text-stone-900 font-medium">FAQ</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Questions Fréquentes{' '}
                <span className="text-orange-500">Impôts & Couple</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Toutes les réponses à vos questions sur la fiscalité du PACS, du mariage,
                le quotient familial et l&apos;optimisation fiscale.
              </p>
            </header>

            {/* CTA Principal */}
            <Card variant="elevated" className="mb-12 bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Vous avez une question spécifique à votre situation ?
                </h2>
                <p className="text-orange-100 mb-6">
                  Utilisez notre simulateur pour calculer précisément votre économie d&apos;impôts
                </p>
                <Link href="/simulateur">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    Calculer ma situation
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* FAQ Sections */}
            {faqs.map((section, sectionIndex) => (
              <section key={sectionIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    {sectionIndex + 1}
                  </span>
                  {section.category}
                </h2>

                <div className="space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} variant="elevated">
                      <CardContent className="p-6">
                        <details className="group">
                          <summary className="flex items-start justify-between cursor-pointer list-none">
                            <h3 className="font-semibold text-stone-900 pr-4">
                              {faq.question}
                            </h3>
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-open:rotate-180 transition-transform">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                          </summary>
                          <p className="mt-4 text-stone-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </details>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            {/* CTA Final */}
            <Card variant="elevated" className="bg-linear-to-r from-orange-500 to-orange-600 border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Vous n&apos;avez pas trouvé votre réponse ?
                </h2>
                <p className="text-orange-100 mb-6">
                  Contactez-nous ou consultez nos guides détaillés
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/simulateur">
                    <Button className="bg-white text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
                      Essayer le simulateur
                    </Button>
                  </Link>
                  <a href="mailto:contact@impotscouple.fr">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                      Nous contacter
                    </Button>
                  </a>
                </div>
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
                    <p className="text-sm text-stone-500">Tout sur le PACS</p>
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
                    <p className="text-sm text-stone-500">Tout sur le mariage</p>
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
                    <p className="text-sm text-stone-500">Parts fiscales</p>
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
