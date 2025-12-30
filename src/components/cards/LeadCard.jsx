const LeadCard = ({ lead, onClick, draggable = false, onDragStart, onDragEnd }) => {
  const {
    name,
    email,
    phone,
    property,
    budget,
    status,
    createdAt
  } = lead

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    interested: 'bg-purple-100 text-purple-700',
    meeting: 'bg-orange-100 text-orange-700',
    closed: 'bg-green-100 text-green-700'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div
      className={`
        bg-white rounded-xl p-4 shadow-sm border border-gray-100
        hover:shadow-md transition-shadow duration-200 cursor-pointer
        ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
      `}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
            {name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{phone}</span>
        </div>
        {property && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property}</span>
          </div>
        )}
        {budget && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{budget}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>Added {formatDate(createdAt)}</span>
        <button className="text-primary-500 hover:text-primary-600 font-medium">
          View Details
        </button>
      </div>
    </div>
  )
}

export default LeadCard
