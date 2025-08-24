'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// Dialogs are reserved for confirmations; errors use toasts only
import { authAPI } from '@/lib/api'
import {
  RegisterRequest,
  LoginRequest,
  AuthFormProps,
  LoginFormData,
  RegisterFormData,
  FieldError,
  AxiosError,
} from '@/types'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const AuthForm = ({ type }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  // Removed error state - errors now only use toasts
  const authStore = useAuthStore()
  const router = useRouter()

  const isLogin = type === 'login'
  const schema = isLogin ? loginSchema : registerSchema

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true)

    try {
      console.log(`Attempting ${isLogin ? 'login' : 'registration'}...`)

      const response = isLogin
        ? await authAPI.login(data as LoginRequest)
        : await authAPI.register(data as RegisterRequest)

      const { token, user } = response.data
      authStore.login(token, user)

      toast.success(isLogin ? 'Welcome back!' : 'Account created!')
      router.push('/dashboard')
    } catch (err: unknown) {
      console.error('Auth error:', err)

      // Handle different error formats from backend
      let errorMessage = 'Something went wrong'
      const axiosError = err as AxiosError
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message
      } else if (axiosError.response?.data?.error) {
        errorMessage = axiosError.response.data.error
      } else if (axiosError.message) {
        errorMessage = axiosError.message
      }

      // Only show toast for errors (no modal)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in your information to create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register(
                      'firstName' as keyof (LoginFormData | RegisterFormData)
                    )}
                    placeholder="John"
                    disabled={isLoading}
                  />
                  {'firstName' in errors && errors.firstName && (
                    <p className="text-sm text-red-600">
                      {(errors as Record<string, FieldError>).firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register(
                      'lastName' as keyof (LoginFormData | RegisterFormData)
                    )}
                    placeholder="Doe"
                    disabled={isLoading}
                  />
                  {'lastName' in errors && errors.lastName && (
                    <p className="text-sm text-red-600">
                      {(errors as Record<string, FieldError>).lastName.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isLogin
                  ? 'Signing In...'
                  : 'Creating Account...'
                : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push('/register')}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push('/login')}
                >
                  Sign in
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error modal removed to enforce consistent toasts for errors */}
    </div>
  )
}

export { AuthForm }
