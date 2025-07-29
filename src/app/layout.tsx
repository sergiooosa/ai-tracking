import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'AI Tracking Revolution | Análisis Inteligente Instantáneo',
  description: 'Sistema revolucionario de tracking automático con IA. Análisis instantáneo, feedback personalizado y tracking sin esfuerzo.',
  keywords: 'AI, tracking, análisis, feedback, inteligencia artificial, automatización',
  authors: [{ name: 'AI Tracking Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen`}>
        <div className="relative">
          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/10 to-gray-950 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
