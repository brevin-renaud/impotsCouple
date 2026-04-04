import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | ImpotsCouple',
  description: 'Politique de confidentialité et protection des données personnelles de ImpotsCouple.',
  openGraph: {
    title: 'Politique de confidentialité - ImpotsCouple',
    description: 'Politique de confidentialité et protection des données personnelles de ImpotsCouple.',
    url: 'https://impotscouple.fr/confidentialite',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Politique de confidentialité - ImpotsCouple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de confidentialité - ImpotsCouple',
    description: 'Politique de confidentialité et protection des données personnelles.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-6 text-center">
            Politique de confidentialité
          </h1>

          <Card variant="elevated">
            <CardContent className="p-8 md:p-12 prose prose-stone max-w-none">
              <p className="text-stone-600 mb-6">
                <strong>Dernière mise à jour :</strong> Avril 2026
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4">Notre engagement : Zéro stockage</h2>
              <p className="text-stone-600 mb-6">
                ImpotsCouple fonctionne en mode <strong>100% stateless</strong> : vos données 
                ne sont <strong>jamais stockées sur nos serveurs</strong>. Le calcul est effectué 
                localement dans votre navigateur et vos informations sont uniquement transportées 
                dans l&apos;URL de partage (compressée et encodée).
              </p>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-800">Confidentialité maximale</p>
                    <p className="text-green-700 text-sm">
                      Aucune base de données, aucun stockage serveur, aucun tracking. 
                      Vos données financières restent entièrement sous votre contrôle.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Comment ça fonctionne ?
              </h2>
              <ol className="list-decimal list-inside text-stone-600 mb-6 space-y-2">
                <li>Vous saisissez vos revenus dans le simulateur</li>
                <li>Le calcul est effectué <strong>dans votre navigateur</strong></li>
                <li>Les résultats sont affichés immédiatement</li>
                <li>Si vous partagez : vos données sont <strong>compressées dans l&apos;URL</strong></li>
                <li>Quand quelqu&apos;un ouvre le lien : les données sont décodées côté client</li>
              </ol>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Données collectées
              </h2>
              
              <h3 className="text-lg font-semibold text-stone-800 mb-3">
                Ce que nous NE collectons PAS
              </h3>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Nom, prénom ou identité</li>
                <li>Adresse email</li>
                <li>Adresse postale</li>
                <li>Numéro de téléphone</li>
                <li>Adresse IP (non enregistrée)</li>
                <li>Cookies de suivi publicitaire</li>
                <li><strong>Revenus ou données fiscales</strong> (jamais stockés)</li>
              </ul>

              <h3 className="text-lg font-semibold text-stone-800 mb-3">
                Ce qui transite dans l&apos;URL de partage
              </h3>
              <p className="text-stone-600 mb-4">
                Si vous choisissez de partager vos résultats, les données suivantes sont encodées dans l&apos;URL :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Revenus déclarés (compressés)</li>
                <li>Nombre d&apos;enfants</li>
                <li>Options de calcul</li>
              </ul>
              <p className="text-stone-600 mb-6">
                Ces données sont <strong>uniquement dans l&apos;URL</strong> et ne transitent jamais par nos serveurs pour stockage.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Durée de conservation
              </h2>
              <p className="text-stone-600 mb-6">
                <strong>Aucune durée</strong> : nous ne conservons aucune donnée. Le lien de partage 
                fonctionne tant que vous le conservez. Si vous perdez le lien, les données sont perdues 
                car elles n&apos;existent nulle part ailleurs.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Sécurité
              </h2>
              <p className="text-stone-600 mb-6">
                Vos données sont protégées par :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Compression et encodage des données dans l&apos;URL</li>
                <li>Calculs effectués côté client (navigateur)</li>
                <li>Aucune persistance serveur</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Vos droits (RGPD)
              </h2>
              <p className="text-stone-600 mb-6">
                Comme nous ne stockons aucune donnée personnelle, les droits RGPD classiques 
                (accès, rectification, effacement) ne s&apos;appliquent pas de manière traditionnelle. 
                Vous avez un <strong>contrôle total</strong> : supprimez simplement le lien de partage 
                pour effacer toute trace de vos données.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Cookies
              </h2>
              <p className="text-stone-600 mb-6">
                Ce site n&apos;utilise <strong>aucun cookie de tracking ou publicitaire</strong>. 
                Seuls des cookies techniques strictement nécessaires au fonctionnement 
                peuvent être utilisés.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Hébergement
              </h2>
              <p className="text-stone-600 mb-6">
                Le site est hébergé sur <strong>Vercel</strong> (infrastructure Edge). 
                Aucune base de données n&apos;est utilisée pour les simulations.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Contact
              </h2>
              <p className="text-stone-600 mb-6">
                Pour toute question relative à cette politique de confidentialité, 
                contactez-nous à : <a href="mailto:privacy@impotscouple.fr" className="text-orange-600 hover:text-orange-700">privacy@impotscouple.fr</a>
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Modifications
              </h2>
              <p className="text-stone-600">
                Cette politique peut être mise à jour occasionnellement. La date de 
                dernière modification est indiquée en haut de cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
