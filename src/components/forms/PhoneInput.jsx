import { forwardRef } from 'react'

const PhoneInput = forwardRef(({ 
  label,
  name,
  placeholder = '+1 (555) 000-0000',
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <input
          ref={ref}
          id={name}
          name={name}
          type="tel"
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 pl-12 rounded-xl border
            ${error 
              ? 'border-error focus:ring-error/20 focus:border-error' 
              : 'border-gray-200 focus:ring-primary-500/20 focus:border-primary-500'
            }
            bg-white text-gray-900 placeholder-gray-400
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

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
