import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {object} { data, loading, error, refetch }
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { 
    immediate = true, 
    initialData = null,
    onSuccess,
    onError 
  } = options

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(url, { params })
      setData(response.data)
      
      if (onSuccess) {
        onSuccess(response.data)
      }
      
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
      setError(errorMessage)
      
      if (onError) {
        onError(err)
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, onSuccess, onError])

  const refetch = useCallback((params) => {
    return fetchData(params)
  }, [fetchData])

  useEffect(() => {
    if (immediate && url) {
      fetchData()
    } else {
      setLoading(false)
      setData(initialData)
    }
  }, [url, immediate, fetchData, initialData])

  return { data, loading, error, refetch }
}

export default useFetch
