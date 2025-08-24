'use client'

import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Auth guard hook - redirects if not authenticated
export const useAuthGuard = (redirectTo = '/login') => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to:', redirectTo)
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, redirectTo])

  return isAuthenticated
}

// Alias for cleaner usage
export const useRequireAuth = () => useAuthGuard()

// Opposite - redirect if already authenticated
export const useRedirectIfAuthenticated = (redirectTo = '/dashboard') => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, redirectTo])
}
