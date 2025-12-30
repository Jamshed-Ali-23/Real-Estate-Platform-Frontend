import api from './api'

const chatService = {
  // Get all conversations for current user
  getConversations: async () => {
    const response = await api.get('/chat/conversations')
    return response.data
  },

  // Get or create conversation with another user
  getOrCreateConversation: async (participantId, propertyId = null) => {
    const response = await api.post('/chat/conversations', {
      participantId,
      propertyId
    })
    return response.data
  },

  // Get messages for a conversation
  getMessages: async (conversationId, page = 1, limit = 50) => {
    const response = await api.get(`/chat/conversations/${conversationId}/messages`, {
      params: { page, limit }
    })
    return response.data
  },

  // Send a message
  sendMessage: async (conversationId, content, attachments = []) => {
    const response = await api.post(`/chat/conversations/${conversationId}/messages`, {
      content,
      attachments
    })
    return response.data
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    const response = await api.put(`/chat/conversations/${conversationId}/read`)
    return response.data
  },

  // Get unread message count
  getUnreadCount: async () => {
    const response = await api.get('/chat/unread-count')
    return response.data
  },

  // Delete a message
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/chat/messages/${messageId}`)
    return response.data
  },

  // Upload chat attachment
  uploadAttachment: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}

export default chatService
