import { JsonLd } from "@/components/seo/JsonLd";
import { Button, Card, CardContent } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <JsonLd />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-stone-50 pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              100% gratuit et anonyme
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
              PACS ou Mariage ?
              <span className="text-orange-500"> Calculez votre économie d&apos;impôts</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Comparez en 2 minutes l&apos;impact fiscal du célibat, PACS et mariage.
              Découvrez combien vous pourriez économiser chaque année.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulateur">
                <Button size="lg" className="w-full sm:w-auto">
                  Lancer la simulation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Comprendre le quotient familial
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-10 translate-x-1/3 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Un processus simple en 4 étapes pour obtenir votre simulation personnalisée
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Vos revenus",
                description: "Renseignez les revenus nets imposables des deux conjoints",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Situation familiale",
                description: "Indiquez le nombre d'enfants et la situation de garde",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Calcul instantané",
                description: "Notre algorithme compare les 3 scénarios fiscaux",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Résultats détaillés",
                description: "Découvrez l'option la plus avantageuse et partagez",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <Card key={index} variant="default" className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange-600">
                    {feature.icon}
                  </div>
                  <div className="text-xs font-semibold text-orange-500 mb-2">
                    ÉTAPE {feature.step}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-stone-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "2 min", label: "pour simuler" },
              { value: "100%", label: "gratuit et anonyme" },
              { value: "3", label: "scénarios comparés" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à optimiser vos impôts ?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Découvrez en quelques clics si le PACS ou le mariage peut vous faire économiser de l&apos;argent.
          </p>
          <Link href="/simulateur">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl"
            >
              Commencer la simulation gratuite
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-stone-100 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Respect de votre vie privée</h3>
                  <p className="text-stone-600 text-sm">
                    Nous ne collectons aucune donnée personnelle identifiante. Pas de nom, pas d&apos;email,
                    pas d&apos;adresse IP. Vos données de simulation sont anonymes et automatiquement supprimées
                    après 30 jours. Conforme RGPD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
