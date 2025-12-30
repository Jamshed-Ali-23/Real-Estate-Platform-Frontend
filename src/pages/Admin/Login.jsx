import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { PrimaryButton } from '../../components/buttons'
import { TextInput } from '../../components/forms'
import useAuthStore from '../../stores/useAuthStore'
import { agentConfig } from '../../config/agent'

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, loading: authLoading, initialized } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  // Wait for auth to initialize before checking redirect
  if (!initialized || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password)
      
      if (result.success) {
        toast.success('Welcome back!')
        navigate('/admin')
      } else {
        toast.error(result.error || 'Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-primary-500 px-6 sm:px-8 py-5 sm:py-6 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src={agentConfig.photo}
              alt={agentConfig.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Agent Login</h1>
          <p className="text-primary-100 mt-1 text-sm sm:text-base">Access your admin panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
          <div>
            <TextInput
              label="Email Address"
              type="email"
              placeholder="agent@realestate.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <PrimaryButton type="submit" fullWidth loading={isSubmitting}>
            Sign In
          </PrimaryButton>

          {/* Demo Credentials */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Demo Credentials:</p>
            <p className="text-sm font-mono text-gray-700">ahmed@khanrealestate.pk</p>
            <p className="text-sm font-mono text-gray-700">admin123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
