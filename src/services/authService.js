import api from './api'

const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  async register(name, email, password, phone = '') {
    try {
      const response = await api.post('/auth/register', { name, email, password, phone })
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  // Alias for register to maintain backward compatibility
  async signup(name, email, password) {
    return this.register(name, email, password)
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  async updateProfile(data) {
    try {
      const response = await api.put('/auth/updatedetails', data)
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/auth/updatepassword', { currentPassword, newPassword })
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgotpassword', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  async resetPassword(token, password) {
    try {
      const response = await api.put(`/auth/resetpassword/${token}`, { password })
      return response.data
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message }
    }
  },

  // Helper to get stored user
  getStoredUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Helper to check if authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}

export default authService
