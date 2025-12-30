import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from '../../components/cards'
import { TextInput, SelectInput } from '../../components/forms'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { agentConfig } from '../../config/agent'
import propertyService from '../../services/propertyService'

const Rent = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('type') || '',
    minRent: searchParams.get('minRent') || '',
    maxRent: searchParams.get('maxRent') || '',
    bedrooms: searchParams.get('beds') || '',
    sortBy: searchParams.get('sort') || 'newest'
  })

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'farmhouse', label: 'Farmhouse' },
    { value: 'room', label: 'Room' },
    { value: 'studio', label: 'Studio' },
    { value: 'office', label: 'Office Space' },
    { value: 'shop', label: 'Shop' },
  ]

  const rentRanges = [
    { value: '', label: 'Any Rent' },
    { value: '0-30000', label: 'Under PKR 30,000/mo' },
    { value: '30000-50000', label: 'PKR 30K - 50K/mo' },
    { value: '50000-100000', label: 'PKR 50K - 1 Lac/mo' },
    { value: '100000-200000', label: 'PKR 1 Lac - 2 Lac/mo' },
    { value: '200000-500000', label: 'PKR 2 Lac - 5 Lac/mo' },
    { value: '500000+', label: 'PKR 5 Lac+/mo' },
  ]

  const bedroomOptions = [
    { value: '', label: 'Any Beds' },
    { value: 'studio', label: 'Studio' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5+ Bedrooms' },
  ]

  // Fetch rental properties from API
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true)
        const params = {
          listingType: 'rent'
        }
        
        if (filters.propertyType) params.propertyType = filters.propertyType
        if (filters.bedrooms && filters.bedrooms !== 'studio') params.bedrooms = filters.bedrooms
        if (filters.location) params.search = filters.location
        
        // Handle rent range
        if (filters.maxRent) {
          const rentRange = filters.maxRent
          if (rentRange.includes('+')) {
            params.minPrice = parseInt(rentRange.replace('+', ''))
          } else if (rentRange.includes('-')) {
            const [min, max] = rentRange.split('-').map(Number)
            if (min) params.minPrice = min
            if (max) params.maxPrice = max
          }
        }
        
        const response = await propertyService.getAll(params)
        
        if (response.success && response.data) {
          // Transform API data
          const transformedProperties = response.data.map(prop => ({
            id: prop._id,
            title: prop.title,
            price: prop.price,
            priceLabel: '/month',
            location: prop.address ? `${prop.address.city}, ${prop.address.state}` : 'Location N/A',
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            area: prop.area,
            type: prop.propertyType,
            purpose: 'rent',
            featured: prop.featured,
            image: prop.images && prop.images.length > 0 ? prop.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
          }))
          setProperties(transformedProperties)
        } else {
          setProperties([])
        }
      } catch (error) {
        console.error('Error fetching rentals:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchRentals()
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minRent: '',
      maxRent: '',
      bedrooms: '',
      sortBy: 'newest'
    })
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Premium Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              Properties for Rent
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Find Your Perfect Rental
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto"
            >
              Browse verified rental properties - apartments, houses, rooms & more
            </motion.p>
          </motion.div>

          {/* Premium Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <TextInput
                    placeholder="Search location..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
                </div>
                <SelectInput
                  options={propertyTypes}
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  placeholder="Property Type"
                />
                <SelectInput
                  options={rentRanges}
                  value={filters.maxRent}
                  onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                  placeholder="Monthly Rent"
                />
                <SelectInput
                  options={bedroomOptions}
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  placeholder="Bedrooms"
                />
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Rentals
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Browse by Category</h2>
            <p className="text-slate-600">Find the perfect rental for your needs</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🏢', label: 'Apartments', type: 'apartment', color: 'from-blue-500 to-blue-600' },
              { icon: '🏠', label: 'Houses', type: 'house', color: 'from-emerald-500 to-emerald-600' },
              { icon: '🛏️', label: 'Rooms', type: 'room', color: 'from-purple-500 to-purple-600' },
              { icon: '🏨', label: 'Studios', type: 'studio', color: 'from-pink-500 to-pink-600' },
              { icon: '🏬', label: 'Offices', type: 'office', color: 'from-amber-500 to-amber-600' },
              { icon: '🏪', label: 'Shops', type: 'shop', color: 'from-rose-500 to-rose-600' },
            ].map((cat, index) => (
              <motion.button
                key={cat.type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange('propertyType', cat.type)}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  filters.propertyType === cat.type
                    ? `border-transparent bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'border-slate-200 hover:border-emerald-300 bg-white hover:shadow-soft'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-semibold">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Properties for Rent</h2>
              <p className="text-slate-600 text-lg">
                <span className="font-bold text-emerald-600">{properties.length}</span> rentals available now
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className="text-slate-700 font-medium">Sort by:</span>
              <SelectInput
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'rent-low', label: 'Rent: Low to High' },
                  { value: 'rent-high', label: 'Rent: High to Low' },
                  { value: 'popular', label: 'Most Popular' },
                ]}
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-56"
              />
            </div>
          </motion.div>

          {/* Property Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-6 text-slate-600 font-medium">Finding available rentals...</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={filters.sortBy + filters.location}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {properties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <PropertyCard property={property} showBadge="For Rent" badgeColor="emerald" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Load More */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-soft hover:shadow-elevated border-2 border-slate-200 hover:border-emerald-500 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Load More Rentals
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Tenant Resources Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Why Choose Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Renting Made Easy</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect rental property
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Verified Listings',
                description: `All properties are personally verified by ${agentConfig.name} to ensure quality`,
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: '📝',
                title: 'Easy Application',
                description: 'Simple rental process with personalized support every step of the way',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                icon: '🤝',
                title: 'Direct Contact',
                description: 'Work directly with me to find your perfect rental home',
                color: 'from-purple-500 to-purple-600'
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-soft group-hover:shadow-elevated transition-all duration-300" />
                <div className="relative p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 text-white text-3xl shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 text-lg"
              >
                Contact Me for Rentals
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Rent
