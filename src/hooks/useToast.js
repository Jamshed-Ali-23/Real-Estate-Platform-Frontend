import { useContext, useCallback } from 'react'
import { UIContext } from '../context/UIContext'

/**
 * Custom hook for managing toast notifications
 * @returns {object} Toast methods
 */
export function useToast() {
  const { showNotification } = useContext(UIContext)

  const toast = useCallback((message, type = 'info') => {
    showNotification({ message, type })
  }, [showNotification])

  const success = useCallback((message) => {
    showNotification({ message, type: 'success' })
  }, [showNotification])

  const error = useCallback((message) => {
    showNotification({ message, type: 'error' })
  }, [showNotification])

  const warning = useCallback((message) => {
    showNotification({ message, type: 'warning' })
  }, [showNotification])

  const info = useCallback((message) => {
    showNotification({ message, type: 'info' })
  }, [showNotification])

  return {
    toast,
    success,
    error,
    warning,
    info
  }
}

export default useToast
