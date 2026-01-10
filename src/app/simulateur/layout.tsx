import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulateur Fiscal PACS vs Mariage',
  description:
    'Calculez gratuitement l\'impact fiscal du PACS et du mariage sur vos impôts. Comparez les 3 scénarios : célibat, PACS et mariage.',
}

export default function SimulateurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
