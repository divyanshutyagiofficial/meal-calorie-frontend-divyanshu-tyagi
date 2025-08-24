'use client'

import { useRequireAuth } from '@/lib/auth'
import { useAuthStore } from '@/stores/authStore'
import { MealForm } from '@/components/MealForm'
import { ResultCard } from '@/components/ResultCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calculator } from 'lucide-react'
import Head from 'next/head'

export default function CaloriesPage() {
  const isAuthenticated = useRequireAuth()
  const { user } = useAuthStore()
  const router = useRouter()

  if (!isAuthenticated) {
    return null // Will redirect via useRequireAuth
  }

  return (
    <>
      <Head>
        <title>Calorie Calculator | Meal Calorie Counter</title>
        <meta name="description" content="Calculate calories and nutritional information for your meals using our comprehensive food database. Get accurate calorie counts per serving with detailed macronutrient breakdown." />
        <meta name="keywords" content="calorie calculator, nutrition facts, food calories, meal planning, macronutrients, USDA food database, diet tracking" />
        <meta name="author" content="Meal Calorie Counter" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Calorie Calculator - Track Your Meal Nutrition" />
        <meta property="og:description" content="Discover the calorie content and nutritional value of any dish. Search thousands of foods and get instant calorie calculations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/calories" />
        <meta property="og:image" content="https://your-domain.com/images/calorie-calculator-preview.jpg" />
        <meta property="og:site_name" content="Meal Calorie Counter" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calorie Calculator | Meal Calorie Counter" />
        <meta name="twitter:description" content="Calculate calories and nutritional information for your meals using our comprehensive food database." />
        <meta name="twitter:image" content="https://your-domain.com/images/calorie-calculator-preview.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Structured Data for Better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Meal Calorie Calculator",
            "description": "Calculate calories and nutritional information for meals and foods",
            "url": "https://your-domain.com/calories",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Calorie calculation",
              "Nutritional analysis", 
              "USDA food database search",
              "Macronutrient breakdown",
              "Serving size calculations"
            ]
          })}
        </script>
      </Head>
      
      <div className="min-h-screen p-4">
        <div className="app-container space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-card/60 backdrop-blur border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-amber-500" />
              <h1 className="text-2xl font-bold text-foreground">Calorie Calculator</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="font-semibold text-foreground">{user?.firstName}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <MealForm />
            
            <div className="glass-panel p-4 shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">How it works:</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Enter the name of any dish or food item</li>
                <li>2. Specify the number of servings</li>
                <li>3. Get detailed calorie information from USDA database</li>
                <li>4. View both per-serving and total calories</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard />
          </div>
        </div>

        {/* Tips */}
        <div className="glass-panel p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">💡 Tips for better results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Be specific:</p>
              <p>Use "grilled chicken breast" instead of just "chicken"</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Common dishes work best:</p>
              <p>Try "pasta alfredo", "chicken biryani", or "caesar salad"</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Include cooking method:</p>
              <p>"Baked salmon" vs "fried salmon" have different calories</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Decimal servings allowed:</p>
              <p>Use 0.5 for half a serving or 1.5 for one and a half</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
