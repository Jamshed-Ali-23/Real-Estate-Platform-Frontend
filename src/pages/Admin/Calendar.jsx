import { useState } from 'react'
import toast from 'react-hot-toast'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [view, setView] = useState('month') // month, week, day

  // Sample appointments/events
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Property Viewing - Modern Villa',
      client: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      property: 'Modern Luxury Villa',
      date: '2025-12-02',
      time: '10:00 AM',
      duration: 60,
      type: 'viewing',
      status: 'confirmed',
      notes: 'Client is interested in the pool area'
    },
    {
      id: 2,
      title: 'Client Meeting - Downtown Penthouse',
      client: 'Emily Brown',
      email: 'emily.b@email.com',
      phone: '+1 (555) 234-5678',
      property: 'Downtown Penthouse',
      date: '2025-12-02',
      time: '2:00 PM',
      duration: 45,
      type: 'meeting',
      status: 'confirmed',
      notes: 'Discuss financing options'
    },
    {
      id: 3,
      title: 'Property Viewing - Beach House',
      client: 'Michael Davis',
      email: 'mdavis@email.com',
      phone: '+1 (555) 345-6789',
      property: 'Seaside Beach House',
      date: '2025-12-03',
      time: '11:00 AM',
      duration: 60,
      type: 'viewing',
      status: 'pending',
      notes: 'Cash buyer, serious interest'
    },
    {
      id: 4,
      title: 'Contract Signing',
      client: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 456-7890',
      property: 'Contemporary Apartment',
      date: '2025-12-05',
      time: '3:00 PM',
      duration: 90,
      type: 'signing',
      status: 'confirmed',
      notes: 'Bring all documents for closing'
    },
    {
      id: 5,
      title: 'Open House Event',
      client: 'Public Event',
      email: '',
      phone: '',
      property: 'Mountain View Cabin',
      date: '2025-12-07',
      time: '12:00 PM',
      duration: 180,
      type: 'open-house',
      status: 'confirmed',
      notes: 'Marketing materials ready'
    },
  ])

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    client: '',
    email: '',
    phone: '',
    property: '',
    date: '',
    time: '',
    duration: 60,
    type: 'viewing',
    notes: ''
  })

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      })
    }
    
    return days
  }

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const getAppointmentsForDate = (date) => {
    const dateKey = formatDateKey(date)
    return appointments.filter(apt => apt.date === dateKey)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const typeColors = {
    viewing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    meeting: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    signing: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    'open-house': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
    other: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
  }

  const statusColors = {
    confirmed: 'bg-green-500',
    pending: 'bg-amber-500',
    cancelled: 'bg-red-500'
  }

  const handleAddAppointment = (e) => {
    e.preventDefault()
    const appointment = {
      id: Date.now(),
      ...newAppointment,
      status: 'pending'
    }
    setAppointments([...appointments, appointment])
    setNewAppointment({
      title: '',
      client: '',
      email: '',
      phone: '',
      property: '',
      date: '',
      time: '',
      duration: 60,
      type: 'viewing',
      notes: ''
    })
    setShowModal(false)
    toast.success('Appointment scheduled successfully!')
  }

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id))
      toast.success('Appointment cancelled')
    }
  }

  const handleStatusChange = (id, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ))
    toast.success('Appointment status updated')
  }

  const days = getDaysInMonth(currentDate)
  const todayAppointments = getAppointmentsForDate(new Date())
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500">Manage your appointments and viewings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Appointment
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.type === 'viewing').length}</p>
              <p className="text-xs text-gray-500">Viewings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.type === 'meeting').length}</p>
              <p className="text-xs text-gray-500">Meetings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'confirmed').length}</p>
              <p className="text-xs text-gray-500">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Calendar Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {daysOfWeek.map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day.date)
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`min-h-24 p-2 border-b border-r border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !day.isCurrentMonth ? 'bg-gray-50/50' : ''
                  } ${selectedDate && formatDateKey(selectedDate) === formatDateKey(day.date) ? 'bg-primary-50' : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(day.date) 
                      ? 'w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center' 
                      : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {day.day}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div
                        key={apt.id}
                        className={`text-xs px-1.5 py-0.5 rounded truncate ${typeColors[apt.type]?.bg} ${typeColors[apt.type]?.text}`}
                      >
                        {apt.time} {apt.title.split(' - ')[0]}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 pl-1">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Today's Schedule</h3>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {todayAppointments.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No appointments today</p>
                </div>
              ) : (
                todayAppointments.map(apt => (
                  <div key={apt.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-12 rounded-full ${statusColors[apt.status]}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{apt.time}</p>
                        <p className="text-sm text-gray-600">{apt.title}</p>
                        <p className="text-xs text-gray-400">{apt.client}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Upcoming</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {upcomingAppointments.map(apt => (
                <div key={apt.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[apt.type]?.bg}`}>
                        {apt.type === 'viewing' && (
                          <svg className={`w-5 h-5 ${typeColors[apt.type]?.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                        {apt.type === 'meeting' && (
                          <svg className={`w-5 h-5 ${typeColors[apt.type]?.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        {apt.type === 'signing' && (
                          <svg className={`w-5 h-5 ${typeColors[apt.type]?.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {apt.type === 'open-house' && (
                          <svg className={`w-5 h-5 ${typeColors[apt.type]?.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{apt.title}</p>
                        <p className="text-xs text-gray-500">{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {apt.time}</p>
                        <p className="text-xs text-gray-400">{apt.client}</p>
                      </div>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${statusColors[apt.status]}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">New Appointment</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleAddAppointment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Property Viewing - Villa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newAppointment.client}
                    onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="viewing">Property Viewing</option>
                    <option value="meeting">Client Meeting</option>
                    <option value="signing">Contract Signing</option>
                    <option value="open-house">Open House</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <input
                  type="text"
                  value={newAppointment.property}
                  onChange={(e) => setNewAppointment({ ...newAppointment, property: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Property name"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({ ...newAppointment, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
