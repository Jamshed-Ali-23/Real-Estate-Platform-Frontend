import api from './api'

const agentService = {
  // Get all agents
  getAgents: async (params = {}) => {
    const response = await api.get('/agents', { params })
    return response.data
  },

  // Get single agent
  getAgent: async (id) => {
    const response = await api.get(`/agents/${id}`)
    return response.data
  },

  // Get agent's properties
  getAgentProperties: async (agentId, params = {}) => {
    const response = await api.get(`/agents/${agentId}/properties`, { params })
    return response.data
  },

  // Get agent dashboard stats
  getAgentStats: async () => {
    const response = await api.get('/agents/dashboard/stats')
    return response.data
  },

  // Update agent profile
  updateAgentProfile: async (data) => {
    const response = await api.put('/agents/profile', data)
    return response.data
  },

  // Upload agent profile photo
  uploadProfilePhoto: async (file) => {
    const formData = new FormData()
    formData.append('photo', file)
    const response = await api.post('/agents/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  // Get agent's leads
  getAgentLeads: async (params = {}) => {
    const response = await api.get('/agents/leads', { params })
    return response.data
  },

  // Get agent's appointments
  getAgentAppointments: async (params = {}) => {
    const response = await api.get('/agents/appointments', { params })
    return response.data
  },

  // Get agent's earnings
  getAgentEarnings: async (period = 'month') => {
    const response = await api.get('/agents/earnings', { params: { period } })
    return response.data
  },

  // Verify agent (admin)
  verifyAgent: async (agentId) => {
    const response = await api.put(`/agents/${agentId}/verify`)
    return response.data
  },

  // Get top agents
  getTopAgents: async (limit = 10) => {
    const response = await api.get('/agents/top', { params: { limit } })
    return response.data
  }
}

export default agentService
