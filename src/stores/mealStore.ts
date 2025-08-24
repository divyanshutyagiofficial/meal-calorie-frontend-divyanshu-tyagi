import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MealResult, MealState } from '@/types'

const MAX_HISTORY = 10 

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      currentResult: null,
      mealHistory: [],
      isLoading: false,
      error: null,
      
      setCurrentResult: (result: MealResult) => {
        console.log('Setting meal result:', result.dish_name, result.total_calories)
        set({ currentResult: result, error: null })
      },
      
      addToHistory: (result: MealResult) => {
        const { mealHistory } = get()
        // Add to front, keep only MAX_HISTORY items
        set({ mealHistory: [result, ...mealHistory].slice(0, MAX_HISTORY) })
      },
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
      clearCurrentResult: () => set({ currentResult: null }),
    }),
    {
      name: 'meal-storage',
      partialize: (state) => ({ mealHistory: state.mealHistory }),
    }
  )
)
