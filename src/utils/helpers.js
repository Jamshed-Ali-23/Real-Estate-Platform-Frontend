// Format currency - Pakistani Rupees
export const formatCurrency = (amount, currency = 'PKR') => {
  // For PKR, use custom formatting with lacs/crores
  if (currency === 'PKR') {
    if (amount >= 10000000) {
      return `PKR ${(amount / 10000000).toFixed(2)} Crore`
    } else if (amount >= 100000) {
      return `PKR ${(amount / 100000).toFixed(2)} Lac`
    } else {
      return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format date
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

// Format relative time
export const formatRelativeTime = (date) => {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now - then) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(date)
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Generate initials
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s()-]{10,}$/
  return phoneRegex.test(phone)
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Format number with K/M suffix
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

// Sort array by key
export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1
    }
    return a[key] < b[key] ? 1 : -1
  })
}

// Filter empty values from object
export const filterEmptyValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
}

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

// Get query params from URL
export const getQueryParams = (url) => {
  const params = new URLSearchParams(url.split('?')[1])
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

// Build query string
export const buildQueryString = (params) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}
