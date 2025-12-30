import api from './api'

const notificationService = {
  // Get all notifications
  getNotifications: async (page = 1, limit = 20) => {
    const response = await api.get('/notifications', {
      params: { page, limit }
    })
    return response.data
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`)
    return response.data
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all')
    return response.data
  },

  // Delete notification
  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`)
    return response.data
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count')
    return response.data
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/notifications/preferences', preferences)
    return response.data
  },

  // Get notification preferences
  getPreferences: async () => {
    const response = await api.get('/notifications/preferences')
    return response.data
  }
}

export default notificationService
