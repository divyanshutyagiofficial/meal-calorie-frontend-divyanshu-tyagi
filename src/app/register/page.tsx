'use client'

import { AuthForm } from '@/components/AuthForm'
import { useRedirectIfAuthenticated } from '@/lib/auth'

export default function RegisterPage() {
  useRedirectIfAuthenticated()

  return <AuthForm type="register" />
}
