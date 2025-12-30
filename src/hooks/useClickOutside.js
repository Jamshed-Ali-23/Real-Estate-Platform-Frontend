import { useEffect, useRef } from 'react'

/**
 * Custom hook to detect clicks outside of an element
 * @param {Function} callback - Callback to run when clicking outside
 * @param {boolean} enabled - Whether the hook is enabled
 * @returns {object} Ref to attach to the element
 */
export function useClickOutside(callback, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback, enabled])

  return ref
}

export default useClickOutside
