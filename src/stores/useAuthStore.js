import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authService from '../services/authService'

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      loading: true,
      error: null,
      initialized: false,
      
      // Login with API
      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const response = await authService.login(email, password)
          if (response.success) {
            set({
              isAuthenticated: true,
              user: response.data,
              loading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ loading: false, error: response.message })
            return { success: false, error: response.message }
          }
        } catch (error) {
          const errorMessage = error.message || 'Login failed'
          set({ loading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      // Register with API
      register: async (name, email, password, phone = '') => {
        set({ loading: true, error: null })
        try {
          const response = await authService.register(name, email, password, phone)
          if (response.success) {
            set({
              isAuthenticated: true,
              user: response.data,
              loading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ loading: false, error: response.message })
            return { success: false, error: response.message }
          }
        } catch (error) {
          const errorMessage = error.message || 'Registration failed'
          set({ loading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },
      
      // Logout
      logout: async () => {
        await authService.logout()
        set({
          isAuthenticated: false,
          user: null,
          error: null
        })
      },

      // Refresh user data from API
      refreshUser: async () => {
        if (!get().isAuthenticated) return
        try {
          const response = await authService.getProfile()
          if (response.success) {
            set({ user: response.data })
          }
        } catch (error) {
          // If token is invalid, logout
          get().logout()
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
      
      // Check if logged in
      isLoggedIn: () => get().isAuthenticated,

      // Initialize auth state from localStorage
      initialize: async () => {
        const token = localStorage.getItem('token')
        const storedUser = authService.getStoredUser()
        
        if (!token) {
          set({ isAuthenticated: false, user: null, loading: false, initialized: true })
          return
        }

        // We have a token, validate it by fetching profile
        try {
          const response = await authService.getProfile()
          if (response.success) {
            set({
              isAuthenticated: true,
              user: response.data,
              loading: false,
              initialized: true
            })
          } else {
            // Token invalid
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            set({ isAuthenticated: false, user: null, loading: false, initialized: true })
          }
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          set({ isAuthenticated: false, user: null, loading: false, initialized: true })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        // Don't persist isAuthenticated - we validate on init
      })
    }
  )
)

// Initialize auth on store creation
useAuthStore.getState().initialize()

export default useAuthStore
