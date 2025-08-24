import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MealForm } from '../MealForm'
import * as api from '@/lib/api'

// Mock the API
vi.mock('@/lib/api', () => ({
  caloriesAPI: {
    getCalories: vi.fn(),
  },
}))

// Mock Zustand store
const mockMealStore = {
  setCurrentResult: vi.fn(),
  addToHistory: vi.fn(),
  setError: vi.fn(),
  clearError: vi.fn(),
}

vi.mock('@/stores/mealStore', () => ({
  useMealStore: () => mockMealStore,
}))

describe('MealForm', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form elements and validate inputs', async () => {
    // Test 1: Form rendering and basic validation
    render(<MealForm />)
    
    // Check form elements exist
    expect(screen.getByLabelText(/dish name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/servings/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get calories/i })).toBeInTheDocument()
    
    // Test validation - empty form
    const submitButton = screen.getByRole('button', { name: /get calories/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/dish name too short/i)).toBeInTheDocument()
    })
    
    // Test validation - minimum servings
    const dishInput = screen.getByLabelText(/dish name/i)
    const servingsInput = screen.getByLabelText(/servings/i)
    
    await user.type(dishInput, 'apple')
    await user.clear(servingsInput)
    await user.type(servingsInput, '0')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/need at least 0.1 servings/i)).toBeInTheDocument()
    })
  })

  it('should handle successful API call and display results', async () => {
    // Test 2: Successful form submission and API integration
    const mockResponse = {
      data: {
        dish_name: 'Apple, raw, with skin',
        servings: 2,
        total_calories: 104,
        calories_per_serving: 52,
        serving_size_g: 182,
        macronutrients: {
          per_serving: {
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 13.8,
            fiber: 2.4
          },
          total: {
            protein: 0.6,
            fat: 0.4,
            carbohydrates: 27.6,
            fiber: 4.8
          }
        }
      },
    }

    vi.mocked(api.caloriesAPI.getCalories).mockResolvedValue(mockResponse)

    render(<MealForm />)
    
    const dishInput = screen.getByLabelText(/dish name/i)
    const servingsInput = screen.getByLabelText(/servings/i)
    
    await user.type(dishInput, 'apple')
    await user.clear(servingsInput)
    await user.type(servingsInput, '2')
    
    const submitButton = screen.getByRole('button', { name: /get calories/i })
    await user.click(submitButton)

    // Verify API was called with correct data
    await waitFor(() => {
      expect(api.caloriesAPI.getCalories).toHaveBeenCalledWith({
        dish_name: 'apple',
        servings: 2,
      })
    })

    // Verify store was updated
    expect(mockMealStore.setCurrentResult).toHaveBeenCalledWith(
      expect.objectContaining({
        dish_name: 'Apple, raw, with skin',
        servings: 2,
        total_calories: 104,
      })
    )
    
    expect(mockMealStore.addToHistory).toHaveBeenCalled()
  })
})