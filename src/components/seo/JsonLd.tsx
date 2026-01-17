export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://fiscalcouple.fr/#website",
        url: "https://fiscalcouple.fr",
        name: "FiscalCouple",
        description:
          "Simulateur fiscal gratuit pour comparer Célibat et Union en France",
        inLanguage: "fr-FR",
      },
      {
        "@type": "FinancialService",
        "@id": "https://fiscalcouple.fr/#service",
        name: "Simulateur Fiscal Couple",
        description:
          "Calculez et comparez l'impact fiscal du célibat et de l'union. Service gratuit et anonyme.",
        serviceType: "Tax Calculation",
        provider: {
          "@type": "Organization",
          name: "FiscalCouple",
        },
        areaServed: {
          "@type": "Country",
          name: "France",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://fiscalcouple.fr/simulateur",
          serviceType: "Online",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://fiscalcouple.fr/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Le PACS et le mariage ont-ils le même impact fiscal ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, du point de vue fiscal, le PACS et le mariage sont équivalents. Les deux permettent une imposition commune dès l'année de l'union. C'est pourquoi notre simulateur compare célibat vs union.",
            },
          },
          {
            "@type": "Question",
            name: "Quand faut-il s'unir pour optimiser ses impôts ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pour bénéficier de l'imposition commune sur une année entière, il faut se pacser ou se marier avant le 31 décembre de l'année en cours. L'avantage fiscal s'applique alors sur tous les revenus de l'année.",
            },
          },
          {
            "@type": "Question",
            name: "Mes données sont-elles sécurisées ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nous ne collectons aucune donnée personnelle identifiante (nom, email, IP). Les données de simulation sont anonymes et automatiquement supprimées après 30 jours. Le service est conforme au RGPD.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
