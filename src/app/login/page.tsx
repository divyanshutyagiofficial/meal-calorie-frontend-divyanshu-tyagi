'use client'

import { AuthForm } from '@/components/AuthForm'
import { useRedirectIfAuthenticated } from '@/lib/auth'

export default function LoginPage() {
  useRedirectIfAuthenticated()

  return <AuthForm type="login" />
}
