import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site ImpotsCouple - Simulateur fiscal PACS vs Mariage.',
  openGraph: {
    title: 'Mentions légales - ImpotsCouple',
    description: 'Mentions légales du site ImpotsCouple - Simulateur fiscal PACS vs Mariage.',
    url: 'https://impotscouple.fr/mentions-legales',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Mentions légales - ImpotsCouple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentions légales - ImpotsCouple',
    description: 'Mentions légales du site ImpotsCouple.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-orange-50 to-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-6 text-center">
            Mentions légales
          </h1>

          <Card variant="elevated">
            <CardContent className="p-8 md:p-12 prose prose-stone max-w-none">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Éditeur du site</h2>
              <p className="text-stone-600 mb-6">
                Conformément à l'article 6 III-2 de la loi n°2004-575 du 21 juin 2004, l'hébergeur du site détient les informations permettant d'identifier l'éditeur du site.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">Hébergement</h2>
              <p className="text-stone-600 mb-6">
                Ce site est hébergé par Vercel Inc.<br />
                440 N Barranca Ave #4133<br />
                Covina, CA 91723<br />
                États-Unis <br />
                <b>Site web :</b> <a className="underline" href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a><br/>
                <b>Contact :</b> <a className="underline" href="mailto:privacy@vercel.com">privacy@vercel.com</a>
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">Propriété intellectuelle</h2>
              <p className="text-stone-600 mb-6">
                L&apos;ensemble du contenu de ce site (textes, graphismes, logo, icônes, images,
                clips audio et vidéo, bases de données, etc.) est protégé par le droit d&apos;auteur
                et les lois relatives à la propriété intellectuelle.
              </p>
              <p className="text-stone-600 mb-6">
                Toute reproduction, représentation, modification, publication, transmission ou
                dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé
                que ce soit, et sur quelque support que ce soit est interdite sans autorisation
                préalable écrite.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">Limitation de responsabilité</h2>
              <p className="text-stone-600 mb-6">
                Les informations contenues sur ce site sont fournies à titre indicatif et ne
                constituent en aucun cas un conseil fiscal, juridique ou financier.
              </p>
              <p className="text-stone-600 mb-6">
                Les résultats des simulations sont basés sur le barème fiscal en vigueur et
                peuvent différer de votre situation réelle. Nous vous recommandons de consulter
                un professionnel pour tout conseil personnalisé.
              </p>
              <p className="text-stone-600 mb-6">
                L&apos;éditeur ne saurait être tenu responsable des erreurs, d&apos;une absence de
                disponibilité des informations et/ou de la présence de virus sur le site.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">Liens hypertextes</h2>
              <p className="text-stone-600 mb-6">
                Les liens hypertextes présents sur ce site et pointant vers d&apos;autres ressources
                sur Internet ne sauraient engager la responsabilité de l&apos;éditeur.
              </p>

              <h2 className="text-xl font-bold text-stone-900 mb-4 mt-8">Droit applicable</h2>
              <p className="text-stone-600">
                Les présentes mentions légales sont soumises au droit français. En cas de litige,
                et après tentative de résolution amiable, les tribunaux français seront seuls
                compétents.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
