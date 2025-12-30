import api from './api'

const leadService = {
  async getAll(params = {}) {
    try {
      const response = await api.get('/leads', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/leads/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async create(leadData) {
    try {
      const response = await api.post('/leads', leadData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async update(id, leadData) {
    try {
      const response = await api.put(`/leads/${id}`, leadData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async updateStatus(id, status) {
    try {
      const response = await api.patch(`/leads/${id}/status`, { status })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/leads/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getByProperty(propertyId) {
    try {
      const response = await api.get(`/leads/property/${propertyId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getByStatus(status) {
    try {
      const response = await api.get('/leads', { params: { status } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async addNote(id, note) {
    try {
      const response = await api.post(`/leads/${id}/notes`, { note })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getStats() {
    try {
      const response = await api.get('/leads/stats')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Public methods (no auth required)
  async submitInquiry(inquiryData) {
    try {
      const response = await api.post('/leads/public', inquiryData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async submitListing(listingData) {
    try {
      const response = await api.post('/leads/listing', listingData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}

export default leadService
