import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import { TextInput, SelectInput } from '../../components/forms'
import { PropertyCard } from '../../components/cards'
import agentConfig from '../../config/agent'
import propertyService from '../../services/propertyService'

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('buy')
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchData, setSearchData] = useState({
    location: '',
    type: '',
    budget: ''
  })

  // Fetch properties from MongoDB via API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await propertyService.getAll({ limit: 6 })
        if (response.success && response.data) {
          // Transform API data to match component format
          const properties = response.data.map(prop => ({
            id: prop._id,
            title: prop.title,
            price: prop.price,
            location: prop.address ? `${prop.address.city}, ${prop.address.state}` : 'Location N/A',
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            area: prop.area,
            type: prop.propertyType,
            featured: prop.featured,
            image: prop.images && prop.images.length > 0 ? prop.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            status: prop.status,
            listingType: prop.listingType
          }))
          setFeaturedProperties(properties)
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        // Fallback to empty array on error
        setFeaturedProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'condo', label: 'Condo' }
  ]

  const budgetOptions = [
    { value: '0-5000000', label: 'Under 50 Lac' },
    { value: '5000000-10000000', label: '50 Lac - 1 Crore' },
    { value: '10000000-20000000', label: '1 Crore - 2 Crore' },
    { value: '20000000-50000000', label: '2 Crore - 5 Crore' },
    { value: '50000000+', label: '5 Crore+' }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchData.location) params.set('location', searchData.location)
    if (searchData.type) params.set('type', searchData.type)
    if (searchData.budget) params.set('budget', searchData.budget)
    params.set('purpose', activeTab)
    navigate(`/${activeTab}?${params.toString()}`)
  }

  return (
    <div className="bg-stone-50">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920" 
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/80 to-stone-900/40"></div>
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20"
              >
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-10 h-10 rounded-full border-2 border-primary-400 object-cover"
                />
                <div>
                  <p className="text-stone-400 text-xs font-medium">Your Trusted Agent</p>
                  <p className="text-white font-semibold">{agentConfig.name}</p>
                </div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
              >
                Discover Your
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400">
                    Dream Home
                  </span>
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-stone-300 mb-10 max-w-xl leading-relaxed"
              >
                {agentConfig.tagline}. With {agentConfig.experience} of excellence in Pakistan real estate.
              </motion.p>

              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
              >
                {[
                  { value: agentConfig.stats.propertiesSold, suffix: '+', label: 'Properties' },
                  { value: agentConfig.stats.happyClients, suffix: '+', label: 'Clients' },
                  { value: agentConfig.stats.yearsExperience, suffix: '+', label: 'Years' },
                  { value: '5.0', suffix: '★', label: 'Rating' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {stat.value}<span className="text-primary-400">{stat.suffix}</span>
                    </p>
                    <p className="text-stone-400 text-xs sm:text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/properties">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2"
                  >
                    Explore Properties
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>
                <a href={`tel:${agentConfig.phone}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {agentConfig.phone}
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Search Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-luxury overflow-hidden border border-white/50">
                {/* Tabs */}
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('buy')}
                    className={`flex-1 py-5 px-6 text-center font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'buy' 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Buy
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('rent')}
                    className={`flex-1 py-5 px-6 text-center font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'rent' 
                        ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Rent
                    </span>
                  </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="p-8">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">
                    {activeTab === 'buy' ? 'Find Your Dream Home' : 'Find Your Perfect Rental'}
                  </h3>
                  <p className="text-stone-500 mb-6">Search from {agentConfig.stats.activeListings}+ exclusive listings</p>
                  
                  <div className="space-y-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Location</label>
                      <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="City, neighborhood, or address"
                          value={searchData.location}
                          onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Property Type</label>
                        <select
                          value={searchData.type}
                          onChange={(e) => setSearchData({ ...searchData, type: e.target.value })}
                          className="w-full px-4 py-4 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">All Types</option>
                          {propertyTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                          {activeTab === 'rent' ? 'Monthly Budget' : 'Price Range'}
                        </label>
                        <select
                          value={searchData.budget}
                          onChange={(e) => setSearchData({ ...searchData, budget: e.target.value })}
                          className="w-full px-4 py-4 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Any Budget</option>
                          {(activeTab === 'rent' ? [
                            { value: '0-50000', label: 'Under PKR 50,000/mo' },
                            { value: '50000-100000', label: 'PKR 50K - 1 Lac/mo' },
                            { value: '100000-200000', label: 'PKR 1 Lac - 2 Lac/mo' },
                            { value: '200000+', label: 'PKR 2 Lac+/mo' },
                          ] : budgetOptions).map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'rent' 
                          ? 'bg-gradient-to-r from-accent-500 to-accent-600 shadow-accent-500/30 hover:shadow-accent-500/50' 
                          : 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-primary-500/30 hover:shadow-primary-500/50'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Properties
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Actions - Modern Cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Buy', path: '/buy', icon: '🏠', color: 'primary', desc: 'Find homes for sale' },
              { name: 'Rent', path: '/rent', icon: '🔑', color: 'accent', desc: 'Browse rentals' },
              { name: 'Sell', path: '/sell', icon: '💰', color: 'emerald', desc: 'List your property' },
              { name: 'Invest', path: '/invest', icon: '📈', color: 'violet', desc: 'Investment options' },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className="group block bg-white rounded-2xl p-6 shadow-elegant hover:shadow-luxury transition-all duration-500 border border-stone-100 hover:border-primary-200 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-stone-100 group-hover:bg-primary-100 rounded-xl flex items-center justify-center text-3xl transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-800 group-hover:text-primary-600 transition-colors">{item.name}</h3>
                      <p className="text-sm text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Premium Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4"
              >
                Featured Listings
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800">
                Premium Properties
              </h2>
              <p className="text-stone-500 mt-4 max-w-xl text-lg">
                Handpicked properties offering exceptional value and luxury living experiences
              </p>
            </div>
            <Link to="/properties" className="mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-primary-50 text-stone-700 hover:text-primary-600 font-semibold rounded-xl transition-all duration-300"
              >
                View All Listings
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Agent - Modern Design */}
      <section className="py-24 bg-gradient-to-br from-stone-100 via-stone-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl transform -rotate-6"></div>
              <div className="relative">
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-luxury object-cover aspect-[4/5]"
                />
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-elegant max-w-[200px] sm:max-w-xs"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-bold text-stone-800 text-lg">5.0 Rating</p>
                  <p className="text-stone-500">{agentConfig.stats.happyClients}+ Happy Clients</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Your Trusted Partner
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
                Hi, I'm {agentConfig.name}
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                {agentConfig.bio.split('\n\n')[0]}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-100">
                  <p className="text-sm text-stone-500 mb-1">Experience</p>
                  <p className="font-bold text-stone-800 text-lg">{agentConfig.experience}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-100">
                  <p className="text-sm text-stone-500 mb-1">License</p>
                  <p className="font-bold text-stone-800 text-lg">{agentConfig.license}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {agentConfig.specializations.slice(0, 4).map((spec, i) => (
                    <span key={i} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
                  >
                    Learn More
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-stone-700 font-semibold rounded-xl shadow-lg border border-stone-200 hover:border-primary-300 hover:text-primary-600 transition-all"
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas - Modern Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
              Coverage Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Areas We Serve</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Specializing in premier locations across Pakistan
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agentConfig.serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/properties?location=${encodeURIComponent(area)}`}
                  className="group block bg-stone-50 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 rounded-2xl p-6 text-center transition-all duration-300 border border-transparent hover:border-primary-200"
                >
                  <div className="w-14 h-14 bg-white group-hover:bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/30">
                    <svg className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-stone-800 group-hover:text-primary-700 transition-colors">{area}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Cards */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-primary-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-xl">
              Client Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Clients Say</h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              Trusted by hundreds of satisfied homeowners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentConfig.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-300 text-sm mb-6 line-clamp-4 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-stone-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-mesh-pattern"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-primary-100 rounded-full text-sm font-semibold mb-6 backdrop-blur-xl">
              Ready to Start?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Find Your Dream Home
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing, I'm here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-primary-700 font-bold rounded-2xl shadow-luxury hover:shadow-2xl transition-all duration-300"
                >
                  Schedule Consultation
                </motion.button>
              </Link>
              <a href={`tel:${agentConfig.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
