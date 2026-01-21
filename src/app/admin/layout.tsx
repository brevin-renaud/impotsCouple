import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administration | FiscalCouple',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      {children}
    </div>
  )
}
