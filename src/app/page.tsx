import { JsonLd } from "@/components/seo/JsonLd";
import { Button, Card, CardContent } from "@/components/ui";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit",
  description:
    "Comparez célibat vs union en 2 minutes. Calculez gratuitement votre économie d'impôts avec le PACS ou le mariage en 2026.",
  alternates: {
    canonical: "https://impotscouple.fr",
  },
  openGraph: {
    title: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit",
    description: "Comparez célibat vs union en 2 minutes. Calculez gratuitement votre économie d'impôts.",
    url: "https://impotscouple.fr",
    type: "website",
    images: [
      {
        url: "https://impotscouple.fr/social-image.png",
        width: 1200,
        height: 630,
        alt: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit",
    description: "Comparez célibat vs union en 2 minutes. Calculez gratuitement votre économie d'impôts.",
    images: ["https://impotscouple.fr/social-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />

      {/* Hero Section - Optimisé SEO */}
      <section className="relative overflow-hidden bg-linear-to-b from-orange-50 to-stone-50 pt-8 pb-12 sm:pt-16 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Simulateur PACS et Mariage 2026 - 100% gratuit
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 sm:mb-6 leading-tight">
              Simulateur fiscal PACS et Mariage :
              <span className="text-orange-500"> calculez votre économie d&apos;impôts</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-stone-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Comparez <strong>célibat vs PACS vs mariage</strong> en 2 minutes.
              Découvrez combien vous pourriez économiser chaque année grâce au quotient familial
              et à l&apos;imposition commune.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulateur">
                <Button size="lg" className="w-full sm:w-auto">
                  Calculer mon économie d&apos;impôts
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/quotient-familial">
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

      {/* Section Informative SEO - PACS vs Mariage */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4 sm:mb-6 text-center">
              PACS ou Mariage : quel impact sur vos impôts ?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <Card variant="outlined" className="hover:border-orange-300 transition-colors">
                <CardContent className="p-0 sm:p-0">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Le PACS et les impôts
                  </h3>
                  <p className="text-stone-600 mb-4">
                    Le <strong>PACS (Pacte Civil de Solidarité)</strong> permet une imposition commune
                    dès l&apos;année de signature. Les partenaires pacsés bénéficient du même quotient
                    familial que les couples mariés.
                  </p>
                  <Link href="/pacs" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">
                    En savoir plus sur le PACS
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
              <Card variant="outlined" className="hover:border-orange-300 transition-colors">
                <CardContent className="p-0 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Le Mariage et les impôts
                  </h3>
                  <p className="text-stone-600 mb-4">
                    Le <strong>mariage</strong> offre les mêmes avantages fiscaux que le PACS
                    (imposition commune, quotient familial) plus des avantages successoraux et
                    la pension de réversion.
                  </p>
                  <Link href="/mariage" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">
                    En savoir plus sur le Mariage
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-center">
              <p className="text-blue-800 text-sm sm:text-base">
                <strong>Bon à savoir :</strong> Sur le plan strictement fiscal (impôt sur le revenu),
                le PACS et le mariage sont <strong>100% identiques</strong>. Notre simulateur compare
                les deux scénarios d&apos;union avec le célibat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-linear-to-b from-stone-50 to-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 sm:mb-4">
              Comment fonctionne notre simulateur fiscal ?
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
              Un processus simple en 4 étapes pour calculer votre économie d&apos;impôts avec le PACS ou le mariage
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Vos revenus",
                description: "Renseignez les revenus nets imposables des deux conjoints (sur votre avis d'imposition)",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Situation familiale",
                description: "Indiquez le nombre d'enfants, garde alternée, parent isolé, invalidité...",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Calcul du quotient familial",
                description: "Notre algorithme calcule vos parts fiscales et compare célibat vs union",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Économie calculée",
                description: "Découvrez votre économie d'impôts annuelle et partagez vos résultats",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <Card key={index} variant="default" className="text-center hover:shadow-lg transition-shadow p-4 md:p-0">
                <CardContent className="p-3 sm:pt-6 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-orange-600">
                    {feature.icon}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-orange-500 mb-1 sm:mb-2">
                    ÉTAPE {feature.step}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-500 hidden sm:block">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-orange-50 ">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: "2 min", label: "pour simuler" },
              { value: "100%", label: "gratuit et anonyme" },
              { value: "2026", label: "barème fiscal à jour" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl sm:text-4xl font-bold text-orange-500 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-stone-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section explicative SEO */}
      <section className="py-10 sm:py-16 bg-stone-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6 sm:mb-8 text-center">
              Pourquoi se pacser ou se marier peut réduire vos impôts ?
            </h2>

            <div className="prose prose-stone max-w-none">
              <Card variant="elevated">
                <CardContent className="p-0 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-3 sm:mb-4">
                    Le mécanisme du quotient familial
                  </h3>
                  <p className="text-stone-600 mb-4">
                    En France, l&apos;impôt sur le revenu est calculé selon un <strong>barème progressif</strong> :
                    plus vous gagnez, plus votre taux d&apos;imposition augmente. Le <strong>quotient familial </strong>
                    permet de diviser vos revenus par le nombre de &quot;parts&quot; de votre foyer fiscal.
                  </p>
                  <p className="text-stone-600 mb-4">
                    <strong>Exemple concret :</strong> Un célibataire gagnant 50 000 € a 1 part fiscale.
                    S&apos;il se pacse ou se marie avec quelqu&apos;un gagnant 20 000 €, le couple a 2 parts.
                    Leurs 70 000 € sont divisés par 2 = 35 000 € par part, ce qui les place dans une
                    tranche d&apos;imposition plus basse.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      <strong>Résultat :</strong> Plus l&apos;écart de revenus entre les conjoints est important,
                      plus l&apos;économie d&apos;impôts est significative. Un couple où l&apos;un gagne beaucoup plus que
                      l&apos;autre peut économiser plusieurs milliers d&apos;euros par an.
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/quotient-familial" className="text-orange-600 hover:text-orange-700 font-medium">
                      → Tout comprendre sur le quotient familial
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-linear-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Prêt à calculer votre économie d&apos;impôts ?
          </h2>
          <p className="text-orange-100 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Découvrez en quelques clics si le PACS ou le mariage peut vous faire économiser de l&apos;argent.
          </p>
          <Link href="/simulateur">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl"
            >
              Lancer la simulation gratuite
            </Button>
          </Link>
        </div>
      </section>

      {/* Section Guides */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6 sm:mb-8 text-center">
              Nos guides pour comprendre la fiscalité des couples
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Link href="/pacs">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full p-4 md:p-4">
                  <CardContent className="p-3 sm:p-5 text-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">Guide PACS</h3>
                    <p className="text-xs sm:text-sm text-stone-500 hidden sm:block">Tout savoir sur le PACS et les impôts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/mariage">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full p-4 md:p-4">
                  <CardContent className="p-3 sm:p-5 text-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">Guide Mariage</h3>
                    <p className="text-xs sm:text-sm text-stone-500 hidden sm:block">Avantages fiscaux du mariage</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/quotient-familial">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full p-4 md:p-4">
                  <CardContent className="p-3 sm:p-5 text-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">Quotient Familial</h3>
                    <p className="text-xs sm:text-sm text-stone-500 hidden sm:block">Comprendre les parts fiscales</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card variant="outlined" className="hover:border-orange-300 transition-colors h-full p-4 md:p-4">
                  <CardContent className="p-3 sm:p-5 text-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">FAQ</h3>
                    <p className="text-xs sm:text-sm text-stone-500 hidden sm:block">Questions fréquentes</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 sm:py-16 bg-stone-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-stone-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">Confidentialité maximale - Zéro stockage</h3>
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Vos données ne sont <strong>jamais stockées sur nos serveurs</strong>. Le calcul est effectué 
                    dans votre navigateur et vos informations restent uniquement dans le lien de partage. 
                    Aucune base de données, aucun tracking.
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
