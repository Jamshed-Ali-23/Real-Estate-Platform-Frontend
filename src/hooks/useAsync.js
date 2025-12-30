import { useState, useCallback } from 'react'

/**
 * Custom hook for handling async operations with loading and error states
 * @param {Function} asyncFunction - Async function to execute
 * @param {object} options - Options
 * @returns {object} { execute, loading, error, data, reset }
 */
export function useAsync(asyncFunction, options = {}) {
  const { immediate = false, onSuccess, onError } = options
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFunction(...args)
      setData(result)
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
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
  }, [asyncFunction, onSuccess, onError])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  return { execute, loading, error, data, reset }
}

export default useAsync
