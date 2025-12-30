import api from './api'

const reviewService = {
  // Get reviews for a property
  getPropertyReviews: async (propertyId, page = 1, limit = 10) => {
    const response = await api.get(`/reviews/property/${propertyId}`, {
      params: { page, limit }
    })
    return response.data
  },

  // Get reviews for an agent
  getAgentReviews: async (agentId, page = 1, limit = 10) => {
    const response = await api.get(`/reviews/agent/${agentId}`, {
      params: { page, limit }
    })
    return response.data
  },

  // Create a review
  createReview: async (data) => {
    const response = await api.post('/reviews', data)
    return response.data
  },

  // Update a review
  updateReview: async (id, data) => {
    const response = await api.put(`/reviews/${id}`, data)
    return response.data
  },

  // Delete a review
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`)
    return response.data
  },

  // Reply to a review (agent/owner)
  replyToReview: async (reviewId, reply) => {
    const response = await api.post(`/reviews/${reviewId}/reply`, { reply })
    return response.data
  },

  // Report a review
  reportReview: async (reviewId, reason) => {
    const response = await api.post(`/reviews/${reviewId}/report`, { reason })
    return response.data
  },

  // Get user's reviews
  getMyReviews: async () => {
    const response = await api.get('/reviews/my-reviews')
    return response.data
  }
}

export default reviewService
