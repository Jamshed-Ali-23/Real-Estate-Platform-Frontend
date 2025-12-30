const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const spinner = (
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-primary-200 border-t-primary-500`}></div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
