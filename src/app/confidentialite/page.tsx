import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
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
                <strong>Dernière mise à jour :</strong> Janvier 2025
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4">Notre engagement</h2>
              <p className="text-stone-600 mb-6">
                ImpotsCouple s&apos;engage à protéger votre vie privée. Cette politique de 
                confidentialité explique comment nous collectons, utilisons et protégeons 
                vos informations.
              </p>

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
              </ul>

              <h3 className="text-lg font-semibold text-stone-800 mb-3">
                Ce que nous collectons
              </h3>
              <p className="text-stone-600 mb-4">
                Lors d&apos;une simulation, les données suivantes sont temporairement stockées :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Revenus déclarés (anonymes)</li>
                <li>Nombre d&apos;enfants</li>
                <li>Options de calcul (frais réels, garde alternée...)</li>
                <li>Résultats de la simulation</li>
                <li>Identifiant unique (UUID) généré aléatoirement</li>
                <li>Date de création</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Durée de conservation
              </h2>
              <p className="text-stone-600 mb-6">
                Les données de simulation sont automatiquement supprimées après 
                <strong> 30 jours</strong>. Cette suppression est irréversible et 
                intervient sans action de votre part.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Finalité du traitement
              </h2>
              <p className="text-stone-600 mb-6">
                Les données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Effectuer le calcul de la simulation fiscale</li>
                <li>Permettre le partage temporaire des résultats via un lien unique</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Base légale
              </h2>
              <p className="text-stone-600 mb-6">
                Le traitement est fondé sur votre <strong>consentement</strong>, que vous 
                manifestez en utilisant le simulateur. Aucune donnée n&apos;est collectée 
                sans votre action volontaire.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Sécurité des données
              </h2>
              <p className="text-stone-600 mb-6">
                Vos données sont protégées par :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Hébergement sécurisé (Vercel + Supabase)</li>
                <li>Identifiants UUID v4 non prévisibles</li>
                <li>Suppression automatique après 30 jours</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">
                Vos droits (RGPD)
              </h2>
              <p className="text-stone-600 mb-6">
                Conformément au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li><strong>Droit d&apos;accès</strong> : consulter vos résultats via le lien de partage</li>
                <li><strong>Droit à l&apos;effacement</strong> : vos données sont supprimées automatiquement après 30 jours</li>
                <li><strong>Droit à la portabilité</strong> : vous pouvez copier/sauvegarder vos résultats</li>
              </ul>
              <p className="text-stone-600 mb-6">
                Note : étant donné l&apos;anonymat des données, nous ne pouvons pas identifier 
                le propriétaire d&apos;une simulation spécifique.
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
                Transferts de données
              </h2>
              <p className="text-stone-600 mb-6">
                Vos données peuvent être traitées par nos sous-traitants :
              </p>
              <ul className="list-disc list-inside text-stone-600 mb-6 space-y-1">
                <li><strong>Vercel</strong> (hébergement) - États-Unis</li>
                <li><strong>Supabase</strong> (base de données) - États-Unis/Europe</li>
              </ul>
              <p className="text-stone-600 mb-6">
                Ces prestataires sont conformes au RGPD et disposent de garanties appropriées.
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
