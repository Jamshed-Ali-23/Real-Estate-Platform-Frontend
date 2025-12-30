import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PrimaryButton, OutlineButton } from '../buttons'
import agentConfig from '../../config/agent'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
    { name: 'Properties', path: '/properties' },
    { name: 'Sell', path: '/sell' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-elegant border-b border-stone-100'
            : 'bg-white/90 backdrop-blur-lg'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300"
              >
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent-500 rounded-full border-2 border-white animate-pulse"></div>
              </motion.div>
              <div className="hidden xs:block sm:block">
                <span className="text-lg sm:text-xl font-bold text-stone-800">{agentConfig.name.split(' ')[0]}</span>
                <span className="text-lg sm:text-xl font-bold text-primary-600"> Estates</span>
                <p className="text-[10px] sm:text-xs text-stone-500 -mt-0.5 font-medium">Premium Real Estate</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-1.5 ${isActive(link.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-stone-600 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <motion.svg
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    )}
                    {isActive(link.path) && !link.dropdown && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Premium Dropdown */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-luxury border border-stone-100 overflow-hidden py-2"
                      >
                        <div className="absolute top-0 left-6 w-4 h-4 bg-white border-l border-t border-stone-100 transform -translate-y-2 rotate-45"></div>
                        {link.dropdown.map((item, index) => (
                          <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent hover:text-primary-600 transition-all duration-200"
                            >
                              <span className="text-lg">{item.icon}</span>
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">

              {/* Phone Button */}
              <motion.a
                href={`tel:${agentConfig.phone}`}
                whileHover={{ scale: 1.02 }}
                className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-stone-50 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
              >
                <div className="p-1.5 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm text-stone-700 group-hover:text-primary-600">{agentConfig.phone}</span>
              </motion.a>

              {/* CTA Button */}
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-stone-700 hover:bg-stone-100 rounded-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-stone-100 shadow-elegant overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all ${isActive(link.path)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-stone-700 hover:bg-stone-50'
                        }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-500 hover:text-primary-600 transition-colors"
                          >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <a
                    href={`tel:${agentConfig.phone}`}
                    className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-xl"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Call Now</p>
                      <p className="font-semibold text-stone-800">{agentConfig.phone}</p>
                    </div>
                  </a>
                  <Link to="/contact" className="block">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg transition-all">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-stone-900/60 backdrop-blur-sm flex items-start justify-center pt-24"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties by location, type, or features..."
                    autoFocus
                    className="w-full pl-14 pr-14 py-5 bg-white rounded-2xl text-lg text-stone-900 placeholder-stone-400 border-0 shadow-luxury focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Quick Search Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 bg-white rounded-2xl shadow-elegant p-6"
              >
                <p className="text-sm text-stone-500 mb-4 font-medium">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['DHA Islamabad', 'Bahria Town', 'F-7 Islamabad', 'Gulberg Lahore', 'Clifton Karachi'].map((term) => (
                    <motion.button
                      key={term}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchQuery(term)
                        navigate(`/properties?search=${encodeURIComponent(term)}`)
                        setSearchOpen(false)
                      }}
                      className="px-4 py-2 bg-stone-100 hover:bg-primary-50 hover:text-primary-600 text-stone-700 rounded-full text-sm font-medium transition-all"
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar
