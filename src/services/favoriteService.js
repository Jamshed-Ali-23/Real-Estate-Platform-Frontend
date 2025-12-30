import api from './api'

const favoriteService = {
  // Get user's favorites/wishlist
  getFavorites: async () => {
    const response = await api.get('/favorites')
    return response.data
  },

  // Add property to favorites
  addFavorite: async (propertyId) => {
    const response = await api.post('/favorites', { propertyId })
    return response.data
  },

  // Remove from favorites
  removeFavorite: async (propertyId) => {
    const response = await api.delete(`/favorites/${propertyId}`)
    return response.data
  },

  // Check if property is in favorites
  isFavorite: async (propertyId) => {
    const response = await api.get(`/favorites/check/${propertyId}`)
    return response.data
  },

  // Get favorite count for a property
  getFavoriteCount: async (propertyId) => {
    const response = await api.get(`/favorites/count/${propertyId}`)
    return response.data
  }
}

export default favoriteService
