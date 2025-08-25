'use client'

import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User, Calculator } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ClientNavigation = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) {
    // Render nothing until mounted to prevent hydration mismatch
    return null
  }

  if (isAuthenticated && user) {
    // Show authenticated navigation
    return (
      <nav className="flex items-center gap-1 sm:gap-2">
        <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
          <Link href="/dashboard">
            <User className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
          <Link href="/calories">
            <Calculator className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Calculate</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="px-2 sm:px-3">
          <LogOut className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </nav>
    )
  }

  // Show unauthenticated navigation
  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
        <Link href="/login">
          <span className="text-xs sm:text-sm">Login</span>
        </Link>
      </Button>
      <Button asChild size="sm" className="px-2 sm:px-3">
        <Link href="/register">
          <span className="text-xs sm:text-sm">Sign Up</span>
        </Link>
      </Button>
    </nav>
  )
}
