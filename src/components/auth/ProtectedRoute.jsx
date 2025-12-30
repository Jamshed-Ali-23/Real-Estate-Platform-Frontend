import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore'
import LoadingSpinner from '../ui/LoadingSpinner'

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, initialized, user } = useAuthStore()
  const location = useLocation()

  // Wait for auth to initialize
  if (!initialized || loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to dashboard if user doesn't have the required role
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
