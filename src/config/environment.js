// Environment configuration
// This file centralizes all environment-related settings

const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://real-estate-platform-bf1c8ee4e0a4.herokuapp.com/api',
    timeout: 30000, // 30 seconds
  },
  
  // Socket Configuration
  socket: {
    url: import.meta.env.VITE_SOCKET_URL || 'https://real-estate-platform-bf1c8ee4e0a4.herokuapp.com',
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Real Estate Platform',
    env: import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },
  
  // Feature flags
  features: {
    enableChat: true,
    enableNotifications: true,
    enableAnalytics: true,
  },
  
  // Debug settings
  debug: {
    logApiCalls: import.meta.env.DEV,
    logSocketEvents: import.meta.env.DEV,
  }
}

// Log configuration on startup (only in development)
if (config.app.isDevelopment) {
  console.log('🔧 App Configuration:', {
    environment: config.app.env,
    apiUrl: config.api.baseUrl,
    socketUrl: config.socket.url
  })
}

export default config
