import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from '../../components/cards'
import { TextInput, SelectInput } from '../../components/forms'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import propertyService from '../../services/propertyService'

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || searchParams.get('search') || '',
    type: searchParams.get('type') || searchParams.get('propertyType') || '',
    budget: searchParams.get('budget') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    sortBy: searchParams.get('sort') || 'newest'
  })

  // Fetch properties from MongoDB via API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        
        // Build query params
        const params = {
          page,
          limit: 12,
        }
        
        if (filters.location) params.search = filters.location
        if (filters.type) params.propertyType = filters.type
        if (filters.bedrooms) params.bedrooms = filters.bedrooms
        if (filters.budget) {
          const [min, max] = filters.budget.split('-').map(Number)
          if (min) params.minPrice = min
          if (max) params.maxPrice = max
        }
        if (filters.sortBy === 'price-asc') params.sort = 'price'
        if (filters.sortBy === 'price-desc') params.sort = '-price'
        if (filters.sortBy === 'size') params.sort = '-area'
        if (filters.sortBy === 'newest') params.sort = '-createdAt'

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
            featured: prop.featured,
            image: prop.images && prop.images.length > 0 ? prop.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            status: prop.status,
            listingType: prop.listingType
          }))
          
          setAllProperties(transformedProperties)
          setProperties(transformedProperties)
          setTotalCount(response.total || transformedProperties.length)
          setHasMore(response.currentPage < response.totalPages)
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        setProperties([])
        setAllProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters, page])

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'farmhouse', label: 'Farmhouse' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ]

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-5000000', label: 'Under 50 Lac' },
    { value: '5000000-10000000', label: '50 Lac - 1 Crore' },
    { value: '10000000-20000000', label: '1 Crore - 2 Crore' },
    { value: '20000000-50000000', label: '2 Crore - 5 Crore' },
    { value: '50000000-999999999', label: '5 Crore+' }
  ]

  const bedroomOptions = [
    { value: '', label: 'Any Bedrooms' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'size', label: 'Largest First' }
  ]



  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      budget: '',
      bedrooms: '',
      sortBy: 'newest'
    })
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Premium Hero Section */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Property Listings
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Find Your Perfect Property
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-200"
            >
              Browse through our extensive collection of premium properties
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Filters Section */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
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
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            />
            <SelectInput
              options={budgetOptions}
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
            />
            <SelectInput
              options={bedroomOptions}
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            />
            <SelectInput
              options={sortOptions}
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearFilters}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-transparent hover:border-slate-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear
            </motion.button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Available Properties</h2>
            <p className="text-sm sm:text-base text-slate-600">
              Showing <span className="font-bold text-primary-600">{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
          
          {/* View Toggle (Optional future feature) */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-2 bg-white text-slate-900 rounded-lg shadow-sm font-medium text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="px-4 py-2 text-slate-600 rounded-lg font-medium text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>

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
            <p className="mt-6 text-slate-600 font-medium">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-3xl mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No properties found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div 
                key={filters.sortBy + filters.location}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load More Button */}
            {hasMore && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(page + 1)}
                  className="px-12 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-soft hover:shadow-elevated border-2 border-slate-200 hover:border-primary-500 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Load More Properties
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default Properties
