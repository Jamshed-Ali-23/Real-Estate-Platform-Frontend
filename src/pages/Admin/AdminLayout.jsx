import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore'
import { agentConfig } from '../../config/agent'
import toast from 'react-hot-toast'
import propertyService from '../../services/propertyService'
import leadService from '../../services/leadService'

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Real-time counts from API
  const [counts, setCounts] = useState({
    properties: 0,
    leads: 0,
    messages: 0,
    loading: true
  })

  // Fetch real counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [propertiesRes, leadsRes] = await Promise.all([
          propertyService.getAll(),
          leadService.getAll()
        ])

        setCounts({
          properties: propertiesRes.data?.length || 0,
          leads: leadsRes.data?.length || 0,
          messages: leadsRes.data?.filter(l => l.message)?.length || 0,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching counts:', error)
        setCounts(prev => ({ ...prev, loading: false }))
      }
    }

    fetchCounts()
    // Refresh counts every 30 seconds
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      badge: null
    },
    {
      name: 'Properties',
      path: '/admin/properties',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      badge: counts.properties > 0 ? counts.properties.toString() : null,
      badgeColor: 'bg-blue-500'
    },
    {
      name: 'Leads',
      path: '/admin/leads',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badge: counts.leads > 0 ? counts.leads.toString() : null,
      badgeColor: 'bg-green-500'
    },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      badge: counts.messages > 0 ? counts.messages.toString() : null,
      badgeColor: 'bg-red-500'
    },
    {
      name: 'Calendar',
      path: '/admin/calendar',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      badge: null
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      badge: null
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      badge: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white z-50 transform transition-all duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>

        {/* Logo */}
        <div className="p-5 border-b border-gray-700/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-bold text-lg">Admin Panel</span>
                <span className="block text-xs text-gray-400">Real Estate Pro</span>
              </div>
            )}
          </Link>
        </div>

        {/* Agent Profile Card */}
        {!sidebarCollapsed && (
          <div className="p-4 mx-4 mt-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-500/30"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{agentConfig.name}</p>
                <p className="text-xs text-gray-400 truncate">{agentConfig.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 mt-2 space-y-1.5">
          <p className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'text-center' : 'px-3'}`}>
            {sidebarCollapsed ? '•••' : 'Main Menu'}
          </p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/30'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center px-3' : ''}`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <span className={`transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <>
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${item.badgeColor || 'bg-gray-700 text-gray-300'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats (visible when not collapsed) */}
        {!sidebarCollapsed && (
          <div className="absolute bottom-24 left-0 right-0 px-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-300">Live Stats</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-700/50 rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-white">{counts.loading ? '...' : counts.properties}</div>
                  <div className="text-[10px] text-gray-400">Properties</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-green-400">{counts.loading ? '...' : counts.leads}</div>
                  <div className="text-[10px] text-gray-400">Leads</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-blue-400">{counts.loading ? '...' : counts.messages}</div>
                  <div className="text-[10px] text-gray-400">Messages</div>
                </div>
              </div>

              {/* Activity Indicator */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updates every 30s</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-gray-900/50">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ${sidebarCollapsed ? 'justify-center px-3' : ''}`}
            title={sidebarCollapsed ? 'Logout' : ''}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Collapse Button (Desktop) */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className={`w-5 h-5 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2.5 w-80">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search properties, leads..."
                  className="bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 w-full text-sm"
                />
                <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-200 rounded">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">

              {/* View Website */}
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">{agentConfig.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-4 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p>© 2025 {agentConfig.name}. All rights reserved.</p>
            <p>Admin Panel v2.0</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
