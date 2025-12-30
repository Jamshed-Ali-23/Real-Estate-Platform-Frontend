import api from './api'

const analyticsService = {
  async getDashboardStats() {
    try {
      const response = await api.get('/analytics/dashboard')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getLeadTrends(period = '30') {
    try {
      const response = await api.get('/analytics/leads/trends', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getPropertyViews(period = '30') {
    try {
      const response = await api.get('/analytics/properties/views', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getConversionStats(period = '30') {
    try {
      const response = await api.get('/analytics/conversions', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getTrafficSources(period = '30') {
    try {
      const response = await api.get('/analytics/traffic/sources', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getPropertyPerformance(period = '30') {
    try {
      const response = await api.get('/analytics/properties/performance', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getAgentPerformance(agentId, period = '30') {
    try {
      const response = await api.get(`/analytics/agents/${agentId}`, { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getRevenueStats(period = '30') {
    try {
      const response = await api.get('/analytics/revenue', { params: { period } })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async exportReport(type, params = {}) {
    try {
      const response = await api.get(`/analytics/export/${type}`, { 
        params,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}

export default analyticsService
