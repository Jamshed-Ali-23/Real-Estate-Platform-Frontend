import { useState, useEffect } from 'react'
import leadService from '../../services/leadService'
import toast from 'react-hot-toast'

const AdminLeads = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [sortBy, setSortBy] = useState('newest')

  // Fetch leads from API
  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await leadService.getAll()
      if (response.success && response.data) {
        // Transform API data
        const transformedLeads = response.data.map(lead => ({
          id: lead._id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone || '',
          status: lead.status || 'new',
          source: lead.source || 'website',
          interestedIn: lead.interestedIn || 'general',
          propertyInterest: lead.property?.title || '',
          message: lead.message || '',
          createdAt: lead.createdAt,
          budget: lead.budget ? `$${lead.budget.min?.toLocaleString()} - $${lead.budget.max?.toLocaleString()}` : ''
        }))
        setLeads(transformedLeads)
      } else {
        setLeads([])
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      // If unauthorized, show empty state instead of error
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await leadService.updateStatus(id, newStatus)
      if (response.success) {
        fetchLeads() // Refresh list
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus })
        }
        toast.success('Lead status updated')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await leadService.delete(id)
        if (response.success) {
          fetchLeads() // Refresh list
          setSelectedLead(null)
          toast.success('Lead deleted')
        }
      } catch (error) {
        console.error('Error deleting lead:', error)
        toast.error('Failed to delete lead')
      }
    }
  }

  // Filter and search
  let filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(l => l.status === filter)

  if (searchQuery) {
    filteredLeads = filteredLeads.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.propertyInterest && l.propertyInterest.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Sort
  filteredLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  // Calculate stats from leads
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    negotiating: leads.filter(l => l.status === 'negotiating').length,
    converted: leads.filter(l => l.status === 'converted' || l.status === 'closed').length,
    lost: leads.filter(l => l.status === 'lost').length
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days}d ago`
    return formatDate(dateString)
  }

  const statusColors = {
    new: 'bg-green-100 text-green-700 border-green-200',
    contacted: 'bg-blue-100 text-blue-700 border-blue-200',
    qualified: 'bg-purple-100 text-purple-700 border-purple-200',
    negotiating: 'bg-amber-100 text-amber-700 border-amber-200',
    converted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    lost: 'bg-red-100 text-red-700 border-red-200'
  }

  const statusIcons = {
    new: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    contacted: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    qualified: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    negotiating: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    converted: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    lost: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${selectedLead ? 'lg:mr-96' : ''}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white">`
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
              <p className="text-gray-500">Manage your potential clients</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Leads
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Leads</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-green-600">{stats.new}</p>
              <p className="text-xs text-gray-500">New</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
              <p className="text-xs text-gray-500">Contacted</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-purple-600">{stats.qualified}</p>
              <p className="text-xs text-gray-500">Qualified</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-amber-600">{stats.negotiating}</p>
              <p className="text-xs text-gray-500">Negotiating</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              <p className="text-xs text-gray-500">Converted</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-red-600">{stats.lost || 0}</p>
              <p className="text-xs text-gray-500">Lost</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-2xl font-bold text-primary-600">{stats.conversionRate}%</p>
              <p className="text-xs text-gray-500">Conversion</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1 overflow-x-auto">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'new', label: 'New' },
                  { value: 'contacted', label: 'Contacted' },
                  { value: 'qualified', label: 'Qualified' },
                  { value: 'negotiating', label: 'Negotiating' },
                  { value: 'converted', label: 'Converted' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filter === f.value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="value">Highest Value</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedLead?.id === lead.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={lead.avatar}
                    alt={lead.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <span className="text-xs text-gray-500">{getTimeAgo(lead.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{lead.propertyInterest}</p>
                    <p className="text-sm text-gray-600 truncate">{lead.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                        {statusIcons[lead.status]}
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{lead.source}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No leads found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Panel */}
      {selectedLead && (
        <div className="fixed right-0 top-0 bottom-0 w-full lg:w-96 bg-white border-l border-gray-200 shadow-xl z-40 overflow-y-auto">
          {/* Panel Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Lead Profile */}
            <div className="text-center mb-6">
              <img
                src={selectedLead.avatar}
                alt={selectedLead.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-xl font-bold text-gray-900">{selectedLead.name}</h3>
              <p className="text-gray-500">{selectedLead.source}</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium text-blue-600">Email</span>
              </a>
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs font-medium text-green-600">Call</span>
              </a>
              <button className="flex flex-col items-center gap-2 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium text-purple-600">Schedule</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm text-gray-600">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">{formatDate(selectedLead.date)}</span>
                </div>
              </div>
            </div>

            {/* Property Interest */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Interest</h4>
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium text-gray-900">{selectedLead.propertyInterest}</p>
                  <p className="text-sm text-primary-600 font-semibold">
                    {selectedLead.budget}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Message</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{selectedLead.message}</p>
            </div>

            {/* Status Update */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Update Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(statusColors).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedLead.id, status)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                      selectedLead.status === status
                        ? statusColors[status] + ' ring-2 ring-offset-1 ring-primary-500'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {statusIcons[status]}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(selectedLead.id)}
                className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
              >
                Delete Lead
              </button>
              <button className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLeads
