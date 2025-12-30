import { useState } from 'react'
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days')

  // Traffic data
  const trafficData = [
    { date: '01 Nov', visitors: 1200, pageViews: 3400, sessions: 1800 },
    { date: '05 Nov', visitors: 1400, pageViews: 3900, sessions: 2100 },
    { date: '10 Nov', visitors: 1100, pageViews: 3100, sessions: 1700 },
    { date: '15 Nov', visitors: 1600, pageViews: 4200, sessions: 2400 },
    { date: '20 Nov', visitors: 1800, pageViews: 4800, sessions: 2700 },
    { date: '25 Nov', visitors: 2100, pageViews: 5400, sessions: 3000 },
    { date: '29 Nov', visitors: 2400, pageViews: 6200, sessions: 3500 },
  ]

  // Conversion funnel
  const funnelData = [
    { stage: 'Website Visits', value: 10000, color: '#6366f1' },
    { stage: 'Property Views', value: 6500, color: '#8b5cf6' },
    { stage: 'Contact Inquiries', value: 850, color: '#a855f7' },
    { stage: 'Scheduled Viewings', value: 320, color: '#d946ef' },
    { stage: 'Closed Deals', value: 45, color: '#ec4899' },
  ]

  // Top properties
  const topProperties = [
    { name: 'Modern Luxury Villa', views: 1245, leads: 28, conversion: '2.2%' },
    { name: 'Downtown Penthouse', views: 986, leads: 22, conversion: '2.3%' },
    { name: 'Seaside Beach House', views: 876, leads: 18, conversion: '2.1%' },
    { name: 'Contemporary Apartment', views: 654, leads: 12, conversion: '1.8%' },
    { name: 'Mountain View Cabin', views: 543, leads: 15, conversion: '2.8%' },
  ]

  // Traffic sources
  const trafficSources = [
    { name: 'Google Search', value: 45, color: '#4285f4' },
    { name: 'Direct', value: 25, color: '#34a853' },
    { name: 'Social Media', value: 18, color: '#ea4335' },
    { name: 'Referral', value: 8, color: '#fbbc05' },
    { name: 'Email', value: 4, color: '#9333ea' },
  ]

  // Device breakdown
  const deviceData = [
    { name: 'Desktop', value: 52, color: '#6366f1' },
    { name: 'Mobile', value: 38, color: '#10b981' },
    { name: 'Tablet', value: 10, color: '#f59e0b' },
  ]

  // Lead performance
  const leadPerformance = [
    { month: 'Jul', newLeads: 45, converted: 8 },
    { month: 'Aug', newLeads: 52, converted: 12 },
    { month: 'Sep', newLeads: 38, converted: 6 },
    { month: 'Oct', newLeads: 65, converted: 15 },
    { month: 'Nov', newLeads: 78, converted: 18 },
  ]

  // Key metrics
  const metrics = [
    { label: 'Total Visitors', value: '12.4K', change: '+18%', trend: 'up' },
    { label: 'Page Views', value: '45.2K', change: '+24%', trend: 'up' },
    { label: 'Avg. Session', value: '4m 32s', change: '+8%', trend: 'up' },
    { label: 'Bounce Rate', value: '42.3%', change: '-5%', trend: 'down' },
    { label: 'Lead Conv. Rate', value: '3.2%', change: '+0.4%', trend: 'up' },
    { label: 'Avg. Response Time', value: '2.4h', change: '-18%', trend: 'down' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your website performance and lead metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-medium text-gray-500 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${
              metric.trend === 'up' 
                ? metric.label.includes('Bounce') || metric.label.includes('Response') ? 'text-red-500' : 'text-green-500'
                : metric.label.includes('Bounce') || metric.label.includes('Response') ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.trend === 'up' ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Website Traffic</h2>
            <p className="text-sm text-gray-500">Visitors, page views, and sessions over time</p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
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
              <Area type="monotone" dataKey="visitors" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" name="Visitors" />
              <Area type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPageViews)" name="Page Views" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Conversion Funnel</h2>
          <p className="text-sm text-gray-500 mb-6">Track visitor journey from first visit to closed deal</p>
          <div className="space-y-4">
            {funnelData.map((item, index) => {
              const percentage = (item.value / funnelData[0].value) * 100
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${percentage}%`, backgroundColor: item.color }}
                    >
                      <span className="text-xs font-bold text-white">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Traffic Sources</h2>
          <p className="text-sm text-gray-500 mb-4">Where your visitors come from</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {trafficSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-sm text-gray-600">{source.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Performance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Lead Performance</h2>
          <p className="text-sm text-gray-500 mb-6">New leads vs converted leads</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadPerformance}>
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
                />
                <Legend />
                <Bar dataKey="newLeads" fill="#6366f1" radius={[4, 4, 0, 0]} name="New Leads" />
                <Bar dataKey="converted" fill="#10b981" radius={[4, 4, 0, 0]} name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Device Breakdown</h2>
          <p className="text-sm text-gray-500 mb-6">How visitors access your site</p>
          <div className="flex items-center justify-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: device.color }}></div>
                  <div>
                    <p className="font-semibold text-gray-900">{device.name}</p>
                    <p className="text-sm text-gray-500">{device.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Top Performing Properties</h2>
          <p className="text-sm text-gray-500">Properties with most views and leads</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProperties.map((property, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{property.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{property.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{property.leads}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      {property.conversion}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                        style={{ width: `${(property.views / topProperties[0].views) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics
