import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { agentConfig } from '../../config/agent'
import useLeadStore from '../../stores/useLeadStore'
import { PrimaryButton } from '../../components/buttons'
import propertyService from '../../services/propertyService'
import leadService from '../../services/leadService'

const Dashboard = () => {
  const leads = useLeadStore(state => state.leads)
  const [timeRange, setTimeRange] = useState('week')

  // Real-time data from API
  const [apiData, setApiData] = useState({
    properties: [],
    leads: [],
    loading: true
  })

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes, leadsRes] = await Promise.all([
          propertyService.getAll(),
          leadService.getAll()
        ])

        setApiData({
          properties: propertiesRes.data || [],
          leads: leadsRes.data || [],
          loading: false
        })
      } catch (error) {
        console.error('Dashboard data fetch error:', error)
        setApiData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchData()
  }, [])

  // Calculate real stats from API data
  const totalProperties = apiData.properties.length
  const totalLeads = apiData.leads.length || leads.length
  const activeProperties = apiData.properties.filter(p => p.status === 'For Sale' || p.status === 'active').length
  const soldProperties = apiData.properties.filter(p => p.status === 'sold' || p.status === 'Sold').length

  // Sample analytics data (would come from analytics API in production)
  const viewsData = [
    { name: 'Mon', views: 420, leads: Math.max(totalLeads, 12) },
    { name: 'Tue', views: 380, leads: 8 },
    { name: 'Wed', views: 520, leads: 15 },
    { name: 'Thu', views: 480, leads: 10 },
    { name: 'Fri', views: 600, leads: 18 },
    { name: 'Sat', views: 750, leads: 22 },
    { name: 'Sun', views: 680, leads: 16 },
  ]

  // Generate property type data from actual properties
  const propertyTypeCounts = apiData.properties.reduce((acc, p) => {
    const type = p.propertyType || 'Other'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  const propertyTypeData = Object.keys(propertyTypeCounts).length > 0
    ? Object.entries(propertyTypeCounts).map(([name, value], index) => ({
      name,
      value,
      color: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'][index % 5]
    }))
    : [
      { name: 'Villa', value: 0, color: '#6366f1' },
      { name: 'Apartment', value: 0, color: '#8b5cf6' },
      { name: 'House', value: 0, color: '#a855f7' },
    ]

  const leadSourceData = [
    { name: 'Property Page', leads: apiData.leads.filter(l => l.source === 'Property Page').length || 0 },
    { name: 'Contact Form', leads: apiData.leads.filter(l => l.source === 'Contact Form').length || 0 },
    { name: 'Sell Form', leads: apiData.leads.filter(l => l.source === 'Sell Form').length || 0 },
    { name: 'Website', leads: apiData.leads.filter(l => !l.source || l.source === 'website').length || 0 },
  ]

  const monthlyData = [
    { month: 'Jul', sales: soldProperties, revenue: 1200000 },
    { month: 'Aug', sales: 0, revenue: 0 },
    { month: 'Sep', sales: 0, revenue: 0 },
    { month: 'Oct', sales: 0, revenue: 0 },
    { month: 'Nov', sales: 0, revenue: 0 },
  ]

  // Stats cards data - using REAL DATA
  const stats = [
    {
      label: 'Total Properties',
      value: apiData.loading ? '...' : totalProperties.toString(),
      change: `+${activeProperties}`,
      changeLabel: 'active listings',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Leads',
      value: apiData.loading ? '...' : totalLeads.toString(),
      change: totalLeads > 0 ? `+${totalLeads}` : '0',
      changeLabel: 'from API',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Properties Sold',
      value: apiData.loading ? '...' : soldProperties.toString(),
      change: soldProperties > 0 ? `+${soldProperties}` : '0',
      changeLabel: 'total sold',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Total Revenue',
      value: apiData.loading ? '...' : '$0',
      change: '0%',
      changeLabel: 'vs last year',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-amber-600'
    }
  ]

  // Recent leads from API
  const recentLeads = apiData.leads.length > 0
    ? apiData.leads.slice(0, 4).map((lead, index) => {
      // Handle property - it could be an object (populated) or a string
      let propertyName = 'General Inquiry'
      if (lead.property) {
        if (typeof lead.property === 'object') {
          propertyName = lead.property.title || lead.property.name || 'Property Inquiry'
        } else {
          propertyName = lead.property
        }
      } else if (lead.propertyInterest) {
        propertyName = lead.propertyInterest
      }
      
      return {
        id: lead.id || lead._id || index,
        name: lead.name || 'Unknown',
        email: lead.email || '',
        property: propertyName,
        date: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recently',
        status: lead.status || 'new',
        avatar: (lead.name || 'U').charAt(0).toUpperCase()
      }
    })
    : []

  const recentActivities = [
    { id: 1, action: 'New lead received', detail: 'John Smith inquired about Modern Luxury Villa', time: '2 hours ago', icon: '👤', color: 'bg-green-100 text-green-600' },
    { id: 2, action: 'Property viewed', detail: 'Downtown Penthouse was viewed 45 times', time: '4 hours ago', icon: '👁️', color: 'bg-blue-100 text-blue-600' },
    { id: 3, action: 'Status updated', detail: 'Seaside Beach House marked as Under Contract', time: '6 hours ago', icon: '📝', color: 'bg-purple-100 text-purple-600' },
    { id: 4, action: 'New property added', detail: 'Mountain View Cabin listed at $380,000', time: '1 day ago', icon: '🏠', color: 'bg-amber-100 text-amber-600' },
  ]

  const statusColors = {
    new: 'bg-green-100 text-green-700 border-green-200',
    contacted: 'bg-blue-100 text-blue-700 border-blue-200',
    viewing: 'bg-purple-100 text-purple-700 border-purple-200',
    negotiating: 'bg-amber-100 text-amber-700 border-amber-200',
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={agentConfig.photo}
                alt={agentConfig.name}
                className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-primary-100 text-sm font-medium">Welcome back,</p>
              <h1 className="text-3xl font-bold">{agentConfig.name}</h1>
              <p className="text-primary-100 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online • Last login: Today, 9:30 AM
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/properties">
              <PrimaryButton className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Property
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.changeLabel}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views & Leads Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Website Traffic & Leads</h2>
              <p className="text-sm text-gray-500">Views and lead conversions over time</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${timeRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Property Types</h2>
          <p className="text-sm text-gray-500 mb-4">Distribution by category</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {propertyTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Lead Sources</h2>
          <p className="text-sm text-gray-500 mb-6">Where your leads come from</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="leads" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Monthly Sales</h2>
          <p className="text-sm text-gray-500 mb-6">Properties sold per month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${(value / 1000000).toFixed(1)}M` : value,
                    name === 'revenue' ? 'Revenue' : 'Sales'
                  ]}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
              <p className="text-sm text-gray-500">Latest inquiries from potential clients</p>
            </div>
            <Link to="/admin/leads" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {lead.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 truncate">{lead.name}</h4>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[lead.status]}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{lead.property}</p>
                    <p className="text-xs text-gray-400 mt-1">{lead.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500">Your latest actions and updates</p>
          </div>
          <div className="p-4 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center text-lg flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.detail}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Property', icon: '🏠', path: '/admin/properties', color: 'from-blue-500 to-blue-600' },
            { label: 'View Leads', icon: '👥', path: '/admin/leads', color: 'from-green-500 to-green-600' },
            { label: 'Edit Profile', icon: '⚙️', path: '/admin/settings', color: 'from-purple-500 to-purple-600' },
            { label: 'View Website', icon: '🌐', path: '/', external: true, color: 'from-amber-500 to-amber-600' },
          ].map((action, index) => (
            <Link
              key={index}
              to={action.path}
              target={action.external ? '_blank' : undefined}
              className={`bg-gradient-to-br ${action.color} p-5 rounded-xl text-center hover:scale-105 transition-transform duration-300 shadow-lg`}
            >
              <span className="text-3xl block mb-2">{action.icon}</span>
              <span className="font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
