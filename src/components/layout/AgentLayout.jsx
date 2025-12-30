import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'
import { useNotifications } from '../../context/NotificationContext'

function AgentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const { unreadCount: chatUnread } = useChat()
  const { unreadCount: notifUnread } = useNotifications()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/agent', icon: '📊', label: 'Dashboard', end: true },
    { path: '/agent/properties', icon: '🏠', label: 'Properties' },
    { path: '/agent/leads', icon: '👥', label: 'Leads' },
    { path: '/agent/appointments', icon: '📅', label: 'Appointments' },
    { path: '/agent/messages', icon: '💬', label: 'Messages', badge: chatUnread },
    { path: '/agent/analytics', icon: '📈', label: 'Analytics' },
    { path: '/agent/earnings', icon: '💰', label: 'Earnings' },
    { path: '/agent/settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="fixed left-0 top-0 h-screen bg-white border-r shadow-sm z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              RealEstate Pro
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="font-medium flex-1">{item.label}</span>
              )}
              {sidebarOpen && item.badge > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500">Agent</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifUnread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {notifUnread}
                  </span>
                )}
              </button>

              {/* Profile Menu */}
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AgentLayout
