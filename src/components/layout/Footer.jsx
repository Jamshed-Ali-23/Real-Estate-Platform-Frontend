import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import agentConfig from '../../config/agent'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Buy', path: '/buy', icon: '🔑' },
    { name: 'Rent', path: '/rent', icon: '📋' },
    { name: 'Sell', path: '/sell', icon: '💰' },
    { name: 'Properties', path: '/properties', icon: '🏘️' },
    { name: 'About', path: '/about', icon: '👤' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ]

  const services = [
    { name: 'Buyer Representation', path: '/buy' },
    { name: 'Seller Representation', path: '/sell' },
    { name: 'Property Valuation', path: '/contact' },
    { name: 'Investment Consulting', path: '/contact' },
    { name: 'Relocation Services', path: '/contact' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-slate-400">Get the latest property listings and market insights delivered to your inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Agent Info - 5 columns */}
          <div className="lg:col-span-5">
            {/* Logo & Agent */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur-lg opacity-50" />
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="relative w-16 h-16 rounded-xl object-cover ring-2 ring-white/20"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {agentConfig.name}
                </h3>
                <p className="text-primary-400 font-medium">{agentConfig.title}</p>
              </div>
            </div>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              {agentConfig.tagline}. Specializing in premium properties across {agentConfig.serviceAreas.slice(0, 3).join(', ')}, and surrounding areas. Your trusted partner in finding the perfect home.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a 
                href={`tel:${agentConfig.phone}`}
                className="group flex items-center gap-4 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="font-medium">{agentConfig.phone}</span>
              </a>
              <a 
                href={`mailto:${agentConfig.email}`}
                className="group flex items-center gap-4 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="font-medium">{agentConfig.email}</span>
              </a>
              <div className="group flex items-center gap-4 text-slate-300">
                <span className="flex items-center justify-center w-10 h-10 bg-primary-500/10 rounded-xl">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="font-medium">{agentConfig.address.city}, {agentConfig.address.state}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {agentConfig.social.facebook && (
                <a
                  href={agentConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {agentConfig.social.instagram && (
                <a
                  href={agentConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {agentConfig.social.linkedin && (
                <a
                  href={agentConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {agentConfig.social.youtube && (
                <a
                  href={agentConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas - 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
              Service Areas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {agentConfig.serviceAreas.map((area) => (
                <Link
                  key={area}
                  to={`/properties?location=${encodeURIComponent(area)}`}
                  className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-sm group-hover:translate-x-1 transition-transform">{area}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <p className="text-slate-400 text-xs sm:text-sm">
                © {currentYear} {agentConfig.name}. All rights reserved.
              </p>
              <span className="hidden md:block w-1 h-1 bg-slate-600 rounded-full" />
              <p className="text-slate-500 text-xs">
                {agentConfig.license}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Agent Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
