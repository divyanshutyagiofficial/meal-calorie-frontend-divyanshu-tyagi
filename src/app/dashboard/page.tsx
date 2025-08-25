'use client'

import { useRequireAuth } from '@/lib/auth'
import { useAuthStore } from '@/stores/authStore'
import { useMealStore } from '@/stores/mealStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { LogOut, Plus, History, User, Utensils } from 'lucide-react'

const DashboardPage = () => {
  const isAuthenticated = useRequireAuth()
  const auth = useAuthStore()
  const meals = useMealStore()
  const router = useRouter()

  if (!isAuthenticated) return null

  function handleLogout() {
    auth.logout()
    router.push('/login')
  }

  // Quick date formatter
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Helper for stats calculation
  const getAvgCalories = () => {
    if (meals.mealHistory.length === 0) return 0
    const total = meals.mealHistory.reduce(
      (sum, meal) => sum + meal.total_calories,
      0
    )
    return Math.round(total / meals.mealHistory.length)
  }

  return (
    <div className="min-h-screen p-0 md:p-4">
      <div className="app-container space-y-6">
        {/* Header */}
        <div className="bg-card/60 backdrop-blur border rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/15 p-2 rounded-xl border border-primary/20 flex-shrink-0">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h1
                  className="text-lg sm:text-2xl font-bold text-foreground truncate"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Welcome back, {auth.user?.firstName}!
                </h1>
                <p className="text-sm text-muted-foreground truncate">{auth.user?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="self-start sm:self-auto">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
            onClick={() => router.push('/calories')}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Plus
                  className="h-5 w-5"
                  style={{ color: 'var(--accent-amber)' }}
                />
                Calculate Calories
              </CardTitle>
              <CardDescription>
                Look up calorie information for any dish
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Utensils className="mr-2 h-4 w-4" />
                Start Calculation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <History
                  className="h-5 w-5"
                  style={{ color: 'var(--accent-pink)' }}
                />
                Recent Searches
              </CardTitle>
              <CardDescription>
                Your last {meals.mealHistory.length} calorie lookups
              </CardDescription>
            </CardHeader>
            <CardContent>
              {meals.mealHistory.length === 0 ? (
                <p className="text-muted-foreground text-sm">No searches yet</p>
              ) : (
                <div className="space-y-2">
                  {meals.mealHistory.slice(0, 3).map(meal => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-2 bg-secondary rounded gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{meal.dish_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(meal.timestamp)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0 text-xs">
                        {meal.total_calories} cal
                      </Badge>
                    </div>
                  ))}
                  {meals.mealHistory.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{meals.mealHistory.length - 3} more searches
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        {meals.mealHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
              <CardDescription>Quick overview of your tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-secondary p-3 sm:p-4 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Total Searches
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {meals.mealHistory.length}
                  </p>
                </div>
                <div className="bg-secondary p-3 sm:p-4 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Avg Calories
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{getAvgCalories()}</p>
                </div>
                <div className="bg-secondary p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                  <p className="text-sm font-medium text-primary">Latest</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {meals.mealHistory[0]?.total_calories || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">cal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
