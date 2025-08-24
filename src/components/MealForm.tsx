'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { caloriesAPI } from '@/lib/api'
import { useMealStore } from '@/stores/mealStore'
import { MealResult, MealFormData, AxiosError } from '@/types'
import { toast } from 'sonner'
import { Search, Utensils } from 'lucide-react'

const mealSchema = z.object({
  dish_name: z.string().min(2, 'Dish name too short'),
  servings: z
    .number()
    .min(0.1, 'Need at least 0.1 servings')
    .max(50, 'Max 50 servings'),
})

const MealForm = () => {
  const [loading, setLoading] = useState(false)
  const mealStore = useMealStore()
  const { setCurrentResult, addToHistory, setError, clearError } = mealStore

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  })

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = form

  const handleSubmit = async (data: MealFormData) => {
    setLoading(true)
    clearError()

    try {
      console.log('Searching for:', data.dish_name, 'servings:', data.servings)

      const res = await caloriesAPI.getCalories(data)

      // Create result
      const result = {
        id: Date.now().toString(),
        ...res.data,
        timestamp: new Date().toISOString(),
      } as MealResult

      setCurrentResult(result)
      addToHistory(result)
      toast.success('Got the calories!')
    } catch (err: unknown) {
      console.error('Calorie lookup failed:', err)

      let msg = 'Could not find calorie info'
      const axiosError = err as AxiosError
      if (axiosError.response?.data?.message) {
        msg = axiosError.response.data.message
      } else if (axiosError.response?.status === 404) {
        msg = 'Dish not found in database'
      } else if (axiosError.response?.status && axiosError.response.status >= 500) {
        msg = 'Server error - try again later'
      }

      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Calculate Calories
        </CardTitle>
        <CardDescription>
          Enter a dish name and number of servings to get calorie information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dish_name">Dish Name</Label>
            <Input
              id="dish_name"
              {...register('dish_name')}
              placeholder="e.g., chicken biryani, pasta alfredo"
              disabled={loading}
            />
            {errors.dish_name && (
              <p className="text-sm text-red-600">{errors.dish_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="servings">Number of Servings</Label>
            <Input
              id="servings"
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              {...register('servings', { valueAsNumber: true })}
              disabled={loading}
            />
            {errors.servings && (
              <p className="text-sm text-red-600">{errors.servings.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Search className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Get Calories
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { MealForm }
