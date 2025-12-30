import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from '../../components/cards'
import { TextInput, SelectInput } from '../../components/forms'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { agentConfig } from '../../config/agent'
import propertyService from '../../services/propertyService'

const Buy = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('beds') || '',
    sortBy: searchParams.get('sort') || 'newest'
  })

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'farmhouse', label: 'Farmhouse' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
  ]

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-5000000', label: 'Under 50 Lac' },
    { value: '5000000-10000000', label: '50 Lac - 1 Crore' },
    { value: '10000000-20000000', label: '1 Crore - 2 Crore' },
    { value: '20000000-50000000', label: '2 Crore - 5 Crore' },
    { value: '50000000-100000000', label: '5 Crore - 10 Crore' },
    { value: '100000000+', label: '10 Crore+' },
  ]

  const bedroomOptions = [
    { value: '', label: 'Any Beds' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5+ Bedrooms' },
  ]

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const params = {
          listingType: 'sale'
        }
        
        if (filters.propertyType) params.propertyType = filters.propertyType
        if (filters.bedrooms) params.bedrooms = filters.bedrooms
        if (filters.location) params.search = filters.location
        
        // Handle price range
        if (filters.maxPrice) {
          const priceRange = filters.maxPrice
          if (priceRange.includes('+')) {
            params.minPrice = parseInt(priceRange.replace('+', ''))
          } else if (priceRange.includes('-')) {
            const [min, max] = priceRange.split('-').map(Number)
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
            location: prop.address ? `${prop.address.city}, ${prop.address.state}` : 'Location N/A',
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            area: prop.area,
            type: prop.propertyType,
            purpose: 'sale',
            featured: prop.featured,
            image: prop.images && prop.images.length > 0 ? prop.images[0] : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
          }))
          setProperties(transformedProperties)
        } else {
          setProperties([])
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
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
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      sortBy: 'newest'
    })
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Premium Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

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
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Properties for Sale
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Buy Your Dream Property
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto"
            >
              Discover thousands of verified properties for sale across premium locations
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
                  options={priceRanges}
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="Price Range"
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
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Properties
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
            <p className="text-slate-600">Find properties that match your style</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🏠', label: 'Houses', type: 'house', color: 'from-blue-500 to-blue-600' },
              { icon: '🏢', label: 'Apartments', type: 'apartment', color: 'from-purple-500 to-purple-600' },
              { icon: '🏘️', label: 'Villas', type: 'villa', color: 'from-primary-500 to-primary-600' },
              { icon: '🏬', label: 'Commercial', type: 'commercial', color: 'from-amber-500 to-amber-600' },
              { icon: '📍', label: 'Plots', type: 'plot', color: 'from-rose-500 to-rose-600' },
              { icon: '🏛️', label: 'Penthouses', type: 'penthouse', color: 'from-indigo-500 to-indigo-600' },
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
                    : 'border-slate-200 hover:border-primary-300 bg-white hover:shadow-soft'
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Properties for Sale</h2>
              <p className="text-slate-600 text-lg">
                <span className="font-bold text-primary-600">{properties.length}</span> premium properties available
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className="text-slate-700 font-medium">Sort by:</span>
              <SelectInput
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
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
                <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
              </div>
              <p className="mt-6 text-slate-600 font-medium">Finding your perfect property...</p>
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
                      <PropertyCard property={property} showBadge="For Sale" />
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
                  className="px-12 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-soft hover:shadow-elevated border-2 border-slate-200 hover:border-primary-500 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Load More Properties
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-6 border border-white/20 text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Need Help?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
              Let {agentConfig.name} help you find your perfect property. Share your requirements and I'll do the rest.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/wanted">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  Post Your Requirement
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Contact Me Directly
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Buy
