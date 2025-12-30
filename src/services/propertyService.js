import api from './api'

const propertyService = {
  async getAll(params = {}) {
    try {
      const response = await api.get('/properties', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/properties/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async create(propertyData) {
    try {
      const response = await api.post('/properties', propertyData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async update(id, propertyData) {
    try {
      const response = await api.put(`/properties/${id}`, propertyData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/properties/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async uploadImages(id, formData) {
    try {
      const response = await api.post(`/properties/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getFeatured() {
    try {
      const response = await api.get('/properties/featured')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async search(query) {
    try {
      const response = await api.get('/properties/search', { params: { q: query } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getByAgent(agentId) {
    try {
      const response = await api.get(`/properties/agent/${agentId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}

export default propertyService
