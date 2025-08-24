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
      <nav className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/calories">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </nav>
    )
  }

  // Show unauthenticated navigation
  return (
    <nav className="flex items-center gap-2">
      <Button asChild variant="ghost">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Get Started</Link>
      </Button>
    </nav>
  )
}
