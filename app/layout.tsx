import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Objectif App - Atteignez vos objectifs',
  description: 'Plateforme de gestion d\'objectifs et de suivi de progression',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}