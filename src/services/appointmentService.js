import api from './api'

const appointmentService = {
  // Get all appointments
  getAppointments: async (params = {}) => {
    const response = await api.get('/appointments', { params })
    return response.data
  },

  // Get single appointment
  getAppointment: async (id) => {
    const response = await api.get(`/appointments/${id}`)
    return response.data
  },

  // Create appointment/viewing request
  createAppointment: async (data) => {
    const response = await api.post('/appointments', data)
    return response.data
  },

  // Update appointment
  updateAppointment: async (id, data) => {
    const response = await api.put(`/appointments/${id}`, data)
    return response.data
  },

  // Cancel appointment
  cancelAppointment: async (id, reason = '') => {
    const response = await api.put(`/appointments/${id}/cancel`, { reason })
    return response.data
  },

  // Confirm appointment (agent)
  confirmAppointment: async (id) => {
    const response = await api.put(`/appointments/${id}/confirm`)
    return response.data
  },

  // Reschedule appointment
  rescheduleAppointment: async (id, newDateTime) => {
    const response = await api.put(`/appointments/${id}/reschedule`, { newDateTime })
    return response.data
  },

  // Get available time slots for a property
  getAvailableSlots: async (propertyId, date) => {
    const response = await api.get(`/appointments/slots/${propertyId}`, {
      params: { date }
    })
    return response.data
  },

  // Get agent's calendar
  getAgentCalendar: async (agentId, month, year) => {
    const response = await api.get(`/appointments/calendar/${agentId}`, {
      params: { month, year }
    })
    return response.data
  }
}

export default appointmentService
