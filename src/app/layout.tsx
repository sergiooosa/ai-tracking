import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Dashboard de Reportes | Análisis de Leads con IA',
  description: 'Sistema avanzado de reportes y análisis de leads. Métricas en tiempo real y gestión inteligente de datos.',
  keywords: 'reportes, leads, análisis, dashboard, CRM, Go High Level',
  authors: [{ name: 'Analytics Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
