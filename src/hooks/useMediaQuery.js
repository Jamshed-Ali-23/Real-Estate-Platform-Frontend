import { useState, useEffect } from 'react'

/**
 * Custom hook to detect media query matches
 * @param {string} query - Media query string
 * @returns {boolean} Whether the media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    const handleChange = (event) => {
      setMatches(event.matches)
    }

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}

// Common breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1280px)')

export default useMediaQuery
