import axios from 'axios'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  MealRequest,
  MealResponse,
} from '@/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(
  config => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage)
          if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`
          }
        } catch (e) {
          console.warn('Failed to parse auth storage:', e)
          localStorage.removeItem('auth-storage')
        }
      }
    }
    return config
  },
  error => Promise.reject(error)
)

// Handle common response errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.status, error.response?.data)

    // Handle auth failures
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage')
        // Only redirect if not already on auth pages
        if (
          !window.location.pathname.includes('/login') &&
          !window.location.pathname.includes('/register')
        ) {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

// Types are now imported from @/types

// Auth endpoints
export const authAPI = {
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data),
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
}

// Calorie endpoints
export const caloriesAPI = {
  getCalories: (data: MealRequest) =>
    api.post<MealResponse>('/get-calories', data),
}

// Helper function for quick API calls
export const quickLogin = async (email: string, password: string) => {
  return authAPI.login({ email, password })
}
