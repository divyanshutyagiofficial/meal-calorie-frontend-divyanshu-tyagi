import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Toaster } from 'sonner'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data factories
export const createMockUser = (overrides = {}) => ({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  ...overrides,
})

export const createMockMealResult = (overrides = {}) => ({
  id: '1',
  dish_name: 'Apple',
  servings: 1,
  calories_per_serving: 52,
  total_calories: 52,
  source: 'USDA FoodData Central',
  timestamp: new Date().toISOString(),
  ...overrides,
})

export const createMockMealResponse = (overrides = {}) => ({
  dish_name: 'Apple, raw, with skin',
  servings: 1,
  serving_size_g: 100,
  calories_per_serving: 52,
  total_calories: 52,
  macronutrients: {
    per_serving: {
      protein_g: 0.3,
      fat_g: 0.2,
      carbohydrates_g: 14.0,
      fiber_g: 2.4,
    },
    total: {
      protein_g: 0.3,
      fat_g: 0.2,
      carbohydrates_g: 14.0,
      fiber_g: 2.4,
    },
  },
  source: 'USDA FoodData Central',
  ...overrides,
})
