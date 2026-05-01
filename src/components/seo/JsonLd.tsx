export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://impotscouple.fr/#website",
        url: "https://impotscouple.fr",
        name: "ImpotsCouple",
        description:
          "Simulateur fiscal gratuit pour comparer Célibat et Union en France",
        inLanguage: "fr-FR",
      },
      {
        "@type": "FinancialService",
        "@id": "https://impotscouple.fr/#service",
        name: "Simulateur Fiscal Couple",
        description:
          "Calculez et comparez l'impact fiscal du célibat et de l'union. Service gratuit et anonyme.",
        serviceType: "Tax Calculation",
        provider: {
          "@type": "Organization",
          name: "ImpotsCouple",
        },
        areaServed: {
          "@type": "Country",
          name: "France",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://impotscouple.fr/simulateur",
          serviceType: "Online",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://impotscouple.fr/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Le PACS et le mariage ont-ils le même impact fiscal ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, du point de vue de l'impôt sur le revenu, le PACS et le mariage sont équivalents. Les deux permettent une imposition commune dès l'année de l'union et donnent droit à 2 parts fiscales de base. Le mariage offre des avantages supplémentaires : pension de réversion, succession exonérée et protection du conjoint.",
            },
          },
          {
            "@type": "Question",
            name: "Comment calculer ses impôts en couple marié ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pour calculer vos impôts après le mariage, additionnez les revenus des deux conjoints, divisez par 2 (quotient familial), appliquez le barème progressif 2026, puis multipliez par 2. Notre simulateur gratuit effectue ce calcul en 2 minutes et compare avec la situation de célibat.",
            },
          },
          {
            "@type": "Question",
            name: "Qu'est-ce que le quotient familial et comment affecte-t-il mes impôts ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Le quotient familial divise votre revenu imposable par le nombre de parts de votre foyer (2 pour un couple, +0,5 par enfant pour les 2 premiers, +1 à partir du 3ème). Plus vous avez de parts, plus votre revenu imposable par part est faible, et moins vous payez d'impôts grâce au barème progressif. L'avantage par demi-part est plafonné à 1 759 € en 2026.",
            },
          },
          {
            "@type": "Question",
            name: "Quand faut-il se marier ou se pacser pour optimiser ses impôts ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pour bénéficier de l'imposition commune sur une année entière, il faut se marier ou se pacser avant le 31 décembre de l'année en cours. L'avantage fiscal s'applique alors sur tous les revenus de l'année. Plus l'écart de revenus entre conjoints est important, plus l'économie d'impôts est significative.",
            },
          },
          {
            "@type": "Question",
            name: "Combien peut-on économiser d'impôts avec le mariage ou le PACS ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "L'économie d'impôts dépend de l'écart de revenus entre les conjoints. Si les revenus sont très différents, l'économie peut atteindre plusieurs milliers d'euros par an. Utilisez notre simulateur gratuit pour calculer votre économie personnalisée en fonction de vos revenus réels.",
            },
          },
          {
            "@type": "Question",
            name: "Mes données sont-elles sécurisées ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vos données ne sont jamais stockées sur nos serveurs. Le calcul est effectué dans votre navigateur et vos informations restent uniquement dans le lien de partage. Aucune base de données, confidentialité maximale.",
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
