'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Users, Zap, Shield } from 'lucide-react'

const CounterBubble = () => {
  const [value, setValue] = useState(2000)
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let rafId: number
    const start = performance.now()
    const duration = 2000
    const from = 2000
    const to = 1000
    const differenece = from - to

    const easeOutQuad = (t: number) => t * (2 - t)

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutQuad(progress);
      const current = Math.round(from - differenece * eased);
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(to);
        setFading(true);
        setTimeout(() => setHidden(true), 2000);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [])

  if (hidden) return null

  return (
    <div
      className={`absolute w-20 left-10 -top-3 rounded-full px-2.5 py-1 flex items-center justify-center border border-white/25 shadow-md transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'var(--accent-amber)' }}
    >
      <span className="text-[20px] font-[600] leading-none tracking-tight" style={{ color: '#0b1220' }}>{value}</span>
    </div>
  )
}

const HomePage = () => {
  const auth = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push('/dashboard')
    }
  }, [auth.isAuthenticated, router])

  if (auth.isAuthenticated) return null

  return (
    <div className="min-h-screen">

      <div className="py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-3xl" />
              <div className="relative bg-background/60 border border-white/10 p-4 rounded-2xl shadow-lg">
                <Calculator className="h-12 w-12 text-primary" />
                <CounterBubble />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Meal Calorie Count
            <span className="text-primary"> Generator</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get accurate calorie information for any dish using the USDA FoodData Central API.
            Track your nutrition with precision and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/login')}
              className="text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <Card className="text-center hover:shadow-md transition-all hover:-translate-y-0.5 glass-panel">
            <CardHeader>
              <div className="bg-primary/15 border border-primary/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <Zap className="h-6 w-6" style={{ color: 'var(--accent-amber)' }} />
              </div>
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Get calorie information in seconds using our fast USDA API integration
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-all hover:-translate-y-0.5 glass-panel">
            <CardHeader>
              <div className="bg-primary/15 border border-primary/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <Shield className="h-6 w-6" style={{ color: 'var(--accent-pink)' }} />
              </div>
              <CardTitle>USDA Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                All nutrition data comes from the trusted USDA FoodData Central database
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-all hover:-translate-y-0.5 glass-panel">
            <CardHeader>
              <div className="bg-primary/15 border border-primary/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Personal Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Keep track of your calorie searches with your personal dashboard
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="glass-panel p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/15 text-primary border border-primary/20 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground text-sm">Sign up with your email to get started</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/15 text-primary border border-primary/20 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Enter Dish Name</h3>
              <p className="text-muted-foreground text-sm">Type any dish name like "chicken biryani"</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/15 text-primary border border-primary/20 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Set Servings</h3>
              <p className="text-muted-foreground text-sm">Specify the number of servings you want</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/15 text-primary border border-primary/20 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground text-sm">View detailed calorie information instantly</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to start tracking your calories?
          </h2>
          <Button
            size="lg"
            onClick={() => router.push('/register')}
            className="text-lg px-8 py-3"
          >
            Create Your Free Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
