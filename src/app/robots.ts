import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fiscalcouple.fr'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/resultats/',  // Ne pas indexer les résultats individuels
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
