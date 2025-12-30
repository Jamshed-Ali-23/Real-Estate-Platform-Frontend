import axios from 'axios'

// Production API URL - defaults to deployed Heroku backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://real-estate-platform-bf1c8ee4e0a4.herokuapp.com/api'

// Check if we're in development mode and should use local proxy
const isDevelopment = import.meta.env.DEV
const useLocalProxy = isDevelopment && import.meta.env.VITE_USE_LOCAL_PROXY === 'true'

// Use proxy only if explicitly set for local development, otherwise use production URL
const baseURL = useLocalProxy ? '/api' : API_BASE_URL

console.log(`🌐 API Configuration:`)
console.log(`   Environment: ${isDevelopment ? 'Development' : 'Production'}`)
console.log(`   Base URL: ${baseURL}`)

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout for production (Heroku can be slow on cold starts)
  withCredentials: true // Enable credentials for CORS
})

// Request interceptor to add auth token and log requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
      if (config.data) {
        console.log('📦 Request Data:', config.data)
      }
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status}`, response.data)
    }
    return response
  },
  async (error) => {
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', error.response?.status, error.response?.data || error.message)
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Only redirect if not already on login page to avoid infinite loop
      const currentPath = window.location.pathname
      if (!currentPath.includes('/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
