'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMealStore } from '@/stores/mealStore'
import { Calendar, Info, Utensils, Zap } from 'lucide-react'

const ResultCard = () => {
  const mealStore = useMealStore()
  const { currentResult, error } = mealStore

  if (error) {
    return (
      <Card className="w-full max-w-md border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!currentResult) {
    return (
      <Card className="w-full max-w-md border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-gray-600 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Ready to Calculate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Enter a dish name and servings to see calorie information here.
          </p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    // Could use a library like date-fns but this works fine
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card className="w-full max-w-md" data-testid="result-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Calorie Information
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(currentResult.timestamp)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Utensils className="h-4 w-4" />
            {currentResult.dish_name}
          </h3>
          <Badge variant="secondary">
            {currentResult.servings} serving
            {currentResult.servings !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-3 border bg-background/50">
            <p className="text-sm text-muted-foreground font-medium">
              Per Serving
            </p>
            <p className="text-2xl font-bold">
              {currentResult.calories_per_serving}
            </p>
            <p className="text-sm text-muted-foreground">calories</p>
          </div>

          <div className="rounded-lg p-3 border bg-background/50">
            <p className="text-sm text-muted-foreground font-medium">Total</p>
            <p className="text-2xl font-bold">{currentResult.total_calories}</p>
            <p className="text-sm text-muted-foreground">calories</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-background/50 rounded p-2 border">
          <strong>Source:</strong> {currentResult.source}
        </div>
      </CardContent>
    </Card>
  )
}

export { ResultCard }
