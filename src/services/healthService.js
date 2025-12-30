import api from './api'

/**
 * Health check service to verify backend connectivity
 */
const healthService = {
  /**
   * Check if the backend API is reachable and healthy
   * @returns {Promise<{success: boolean, message: string, data?: object}>}
   */
  async checkHealth() {
    try {
      const response = await api.get('/health')
      return {
        success: true,
        message: 'Backend is healthy',
        data: response.data
      }
    } catch (error) {
      console.error('❌ Health check failed:', error.message)
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Backend is unreachable',
        error: error
      }
    }
  },

  /**
   * Perform a comprehensive connectivity test
   * @returns {Promise<object>}
   */
  async runDiagnostics() {
    const results = {
      timestamp: new Date().toISOString(),
      apiUrl: api.defaults.baseURL,
      tests: {}
    }

    // Test 1: Health endpoint
    try {
      const healthResponse = await api.get('/health', { timeout: 10000 })
      results.tests.health = {
        status: 'passed',
        responseTime: healthResponse.headers?.['x-response-time'] || 'N/A',
        data: healthResponse.data
      }
    } catch (error) {
      results.tests.health = {
        status: 'failed',
        error: error.message
      }
    }

    // Test 2: Properties endpoint (public)
    try {
      const propertiesResponse = await api.get('/properties?limit=1', { timeout: 10000 })
      results.tests.properties = {
        status: 'passed',
        count: propertiesResponse.data?.count || propertiesResponse.data?.data?.length || 0
      }
    } catch (error) {
      results.tests.properties = {
        status: 'failed',
        error: error.message
      }
    }

    // Overall status
    results.overall = Object.values(results.tests).every(t => t.status === 'passed')
      ? 'healthy'
      : 'degraded'

    return results
  }
}

export default healthService
