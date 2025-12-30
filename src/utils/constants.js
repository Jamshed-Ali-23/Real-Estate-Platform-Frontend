// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  PHONE_MIN_LENGTH: 10
}

// Lead statuses
export const LEAD_STATUSES = {
  NEW: 'new',
  CONTACTED: 'contacted',
  INTERESTED: 'interested',
  MEETING: 'meeting',
  CLOSED: 'closed'
}

// Property types
export const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'plot', label: 'Plot' },
  { value: 'farmhouse', label: 'Farm House' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'shop', label: 'Shop' },
  { value: 'office', label: 'Office' }
]

// Budget ranges (in PKR)
export const BUDGET_RANGES = [
  { value: '0-5000000', label: 'Under 50 Lac' },
  { value: '5000000-10000000', label: '50 Lac - 1 Crore' },
  { value: '10000000-20000000', label: '1 Crore - 2 Crore' },
  { value: '20000000-50000000', label: '2 Crore - 5 Crore' },
  { value: '50000000-100000000', label: '5 Crore - 10 Crore' },
  { value: '100000000-999999999', label: '10 Crore+' }
]

// Bedroom options
export const BEDROOM_OPTIONS = [
  { value: '1', label: '1+ Bedroom' },
  { value: '2', label: '2+ Bedrooms' },
  { value: '3', label: '3+ Bedrooms' },
  { value: '4', label: '4+ Bedrooms' },
  { value: '5', label: '5+ Bedrooms' }
]

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'size-desc', label: 'Largest First' },
  { value: 'size-asc', label: 'Smallest First' }
]

// Status colors for leads
export const STATUS_COLORS = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700', solid: 'bg-blue-500' },
  contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700', solid: 'bg-yellow-500' },
  interested: { bg: 'bg-purple-100', text: 'text-purple-700', solid: 'bg-purple-500' },
  meeting: { bg: 'bg-orange-100', text: 'text-orange-700', solid: 'bg-orange-500' },
  closed: { bg: 'bg-green-100', text: 'text-green-700', solid: 'bg-green-500' }
}

// Chart colors
export const CHART_COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  purple: '#7c3aed',
  pink: '#ec4899'
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  PROPERTIES: {
    BASE: '/properties',
    FEATURED: '/properties/featured',
    SEARCH: '/properties/search'
  },
  LEADS: {
    BASE: '/leads',
    STATS: '/leads/stats'
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    LEADS: '/analytics/leads',
    CONVERSIONS: '/analytics/conversions'
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebarState'
}

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}
