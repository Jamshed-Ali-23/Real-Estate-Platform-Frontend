import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { ChatWidget } from './components/chat'
import useAuthStore from './stores/useAuthStore'

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'))
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Property category pages
const Buy = lazy(() => import('./pages/Buy'))
const Rent = lazy(() => import('./pages/Rent'))
const Sell = lazy(() => import('./pages/Sell'))
const Wanted = lazy(() => import('./pages/Wanted'))

// Admin pages
const Login = lazy(() => import('./pages/Admin/Login'))
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const AdminProperties = lazy(() => import('./pages/Admin/Properties'))
const AdminLeads = lazy(() => import('./pages/Admin/Leads'))
const AdminAnalytics = lazy(() => import('./pages/Admin/Analytics'))
const AdminCalendar = lazy(() => import('./pages/Admin/Calendar'))
const AdminMessages = lazy(() => import('./pages/Admin/Messages'))
const AdminSettings = lazy(() => import('./pages/Admin/Settings'))

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, initialized } = useAuthStore()
  
  // Wait for auth to initialize
  if (!initialized || loading) {
    return <LoadingSpinner fullScreen />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'
  
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* All Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/wanted" element={<Wanted />} />
        </Route>

        {/* Agent Login - support both /login and /admin/login */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      
      {/* Global Chat Widget - Contact Agent (hidden on admin routes) */}
      {!isAdminRoute && <ChatWidget />}
    </Suspense>
  )
}

export default App
