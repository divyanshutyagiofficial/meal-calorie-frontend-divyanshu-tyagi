import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Quick helper for formatting numbers
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

// Date helper - could probably use date-fns but this works
export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Simple truncate function
export const truncate = (str: string, length: number = 50) => {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}

// Quick validation helpers
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Sleep function for debugging
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))