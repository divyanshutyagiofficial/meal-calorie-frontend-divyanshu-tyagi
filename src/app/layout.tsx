import type { Metadata } from 'next'
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'
import { ClientNavigation } from '@/components/ClientNavigation'
import { Calculator } from 'lucide-react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Meal Calorie Counter | Track Your Food Nutrition',
    template: '%s | Meal Calorie Counter',
  },
  description:
    'Calculate calories and nutritional information for any dish using USDA FoodData Central API. Get accurate calorie counts, macronutrients, and meal planning insights.',
  keywords: [
    'calorie calculator',
    'nutrition tracker',
    'food calories',
    'meal planning',
    'USDA database',
    'macronutrients',
    'diet tracking',
  ],
  authors: [{ name: 'Meal Calorie Counter Team' }],
  creator: 'Meal Calorie Counter',
  publisher: 'Meal Calorie Counter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Meal Calorie Counter | Track Your Food Nutrition',
    description:
      'Calculate calories and nutritional information for any dish using our comprehensive USDA food database.',
    siteName: 'Meal Calorie Counter',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meal Calorie Counter - Track Your Food Nutrition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meal Calorie Counter | Track Your Food Nutrition',
    description:
      'Calculate calories and nutritional information for any dish using our comprehensive USDA food database.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(100%_60%_at_85%_10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(90%_70%_at_10%_95%,rgba(251,113,133,0.18),transparent_60%),radial-gradient(85%_55%_at_95%_90%,rgba(251,191,36,0.12),transparent_70%),linear-gradient(to_bottom,#0b1220_0%,#0b1325_40%,#0e1726_100%)]">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-background/30 backdrop-blur">
              <div className="app-container h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <span
                    className="font-semibold tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    CalorieIQ
                  </span>
                </div>
                <ClientNavigation />
              </div>
            </header>
            <main className="app-container py-8 md:py-12">{children}</main>
          </div>
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{ duration: 3800 }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
