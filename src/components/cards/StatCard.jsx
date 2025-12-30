const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon,
  color = 'primary'
}) => {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-yellow-50 text-yellow-600',
    error: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}>
          {icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {change}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  )
}

export default StatCard
