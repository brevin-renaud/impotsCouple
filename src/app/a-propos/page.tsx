import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'

export const metadata: Metadata = {
  title: 'À propos de ImpotsCouple - Simulateur Fiscal Gratuit',
  description: 'Découvrez ImpotsCouple, le simulateur fiscal gratuit et anonyme pour comparer PACS, mariage et célibat. Notre mission : rendre la fiscalité des couples accessible à tous.',
  alternates: {
    canonical: 'https://impotscouple.fr/a-propos',
  },
  openGraph: {
    title: 'À propos de ImpotsCouple - Simulateur Fiscal Gratuit',
    description: 'Découvrez notre mission : rendre la fiscalité des couples accessible à tous avec un simulateur gratuit et anonyme.',
    url: 'https://impotscouple.fr/a-propos',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'À propos de ImpotsCouple - Simulateur Fiscal Gratuit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de ImpotsCouple - Simulateur Fiscal Gratuit',
    description: 'Découvrez notre mission : rendre la fiscalité des couples accessible à tous.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-6 text-center">
            À propos de ImpotsCouple
          </h1>

          <Card variant="elevated">
            <CardContent className="p-8 md:p-12 prose prose-stone max-w-none">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Notre mission</h2>
              <p className="text-stone-600 mb-6">
                ImpotsCouple est né d&apos;un constat simple : beaucoup de couples se demandent si le PACS 
                ou le mariage pourrait leur faire économiser des impôts, mais les calculs sont complexes 
                et les informations souvent confuses.
              </p>
              <p className="text-stone-600 mb-6">
                Notre mission est de rendre la fiscalité des couples <strong>accessible à tous</strong>, 
                grâce à un outil gratuit, simple et respectueux de votre vie privée.
              </p>

              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Comment ça marche ?</h2>
              <p className="text-stone-600 mb-6">
                Notre simulateur utilise le barème officiel de l&apos;impôt sur le revenu français 
                pour calculer et comparer trois scénarios :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-2">
                <li><strong>Célibat</strong> : chaque personne est imposée séparément</li>
                <li><strong>PACS</strong> : imposition commune du couple</li>
                <li><strong>Mariage</strong> : imposition commune (identique au PACS fiscalement)</li>
              </ul>
              <p className="text-stone-600 mb-6">
                En quelques clics, vous obtenez une comparaison claire et des recommandations 
                personnalisées pour optimiser votre situation.
              </p>

              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Respect de votre vie privée</h2>
              <p className="text-stone-600 mb-6">
                La confidentialité est au cœur de notre approche. Nous ne collectons 
                <strong> aucune donnée personnelle identifiante</strong> :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-2">
                <li>Pas de nom, pas d&apos;email</li>
                <li>Pas d&apos;adresse IP enregistrée</li>
                <li>Pas de cookies de tracking</li>
                <li>Suppression automatique des simulations après 30 jours</li>
              </ul>

              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Avertissement</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-stone-600">
                <p className="mb-2">
                  <strong>Information importante :</strong>
                </p>
                <p>
                  Les résultats de ce simulateur sont fournis à titre indicatif uniquement et ne 
                  constituent en aucun cas un conseil fiscal ou juridique. Chaque situation est unique 
                  et peut comporter des spécificités non prises en compte par cet outil.
                </p>
                <p className="mt-2">
                  Pour une analyse personnalisée de votre situation, nous vous recommandons de consulter 
                  un conseiller fiscal ou un notaire.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Contact</h2>
              <p className="text-stone-600">
                Une question, une suggestion ? N&apos;hésitez pas à nous contacter via 
                l&apos;adresse : <a href="mailto:contact@impotscouple.fr" className="text-orange-600 hover:text-orange-700">contact@impotscouple.fr</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
