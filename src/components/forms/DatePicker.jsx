import { forwardRef } from 'react'

const DatePicker = forwardRef(({ 
  label,
  name,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          ref={ref}
          id={name}
          name={name}
          type="date"
          className={`
            w-full px-4 py-3 pl-12 rounded-xl border
            ${error 
              ? 'border-error focus:ring-error/20 focus:border-error' 
              : 'border-gray-200 focus:ring-primary-500/20 focus:border-primary-500'
            }
            bg-white text-gray-900
            transition-all duration-200
            focus:outline-none focus:ring-4
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
