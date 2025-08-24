import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthState } from '@/types'

// TODO: Maybe add role-based permissions later

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (token: string, user: User) => {
        // console.log('User logging in:', user.email) // Debug - remove before prod
        set({
          token,
          user,
          isAuthenticated: true,
        })
      },
      
      logout: () => {
        const currentUser = get().user
        console.log(`Logging out user: ${currentUser?.email || 'unknown'}`)
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },
      
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'auth-storage',
      // Only persist what we need
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
