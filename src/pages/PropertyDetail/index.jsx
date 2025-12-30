import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import { TextInput, PhoneInput } from '../../components/forms'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useLeadStore from '../../stores/useLeadStore'
import { agentConfig } from '../../config/agent'
import propertyService from '../../services/propertyService'
import leadService from '../../services/leadService'

const leadSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  message: yup.string()
})

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const addLead = useLeadStore(state => state.addLead)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(leadSchema)
  })

  // Fetch property from MongoDB via API
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await propertyService.getById(id)
        
        if (response.success && response.data) {
          const prop = response.data
          // Transform API data to match component expectations
          const transformedProperty = {
            id: prop._id,
            title: prop.title,
            price: prop.price,
            location: prop.address ? `${prop.address.city}, ${prop.address.state}` : 'Location N/A',
            address: prop.address ? `${prop.address.street}, ${prop.address.city}, ${prop.address.state} ${prop.address.zipCode}` : 'Address N/A',
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            area: prop.area,
            type: prop.propertyType,
            featured: prop.featured,
            yearBuilt: prop.yearBuilt || 2020,
            garage: prop.parking || 2,
            description: prop.description,
            features: prop.features || [],
            images: prop.images && prop.images.length > 0 ? prop.images : [
              'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200'
            ],
            agent: {
              name: agentConfig.name,
              phone: agentConfig.phone,
              email: agentConfig.email,
              image: agentConfig.avatar
            }
          }
          setProperty(transformedProperty)
        } else {
          setProperty(null)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const onSubmit = async (data) => {
    try {
      // Submit lead to backend API
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || `Interested in: ${property.title}`,
        propertyId: property.id,
        interestedIn: 'buying',
        source: 'website'
      }
      
      const response = await leadService.submitInquiry(leadData)
      
      if (response.success) {
        // Also add to local store for quick UI update
        addLead({
          ...data,
          property: property.title,
          budget: `$${property.price.toLocaleString()}`,
          source: 'Property Page'
        })
        setSubmitted(true)
        toast.success('Thank you! We will contact you soon.')
        reset()
      } else {
        toast.error(response.message || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Property inquiry error:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/properties">
            <PrimaryButton>Browse All Properties</PrimaryButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Premium Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm overflow-x-auto">
            <Link to="/" className="text-slate-500 hover:text-primary-500 transition-colors whitespace-nowrap">Home</Link>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/properties" className="text-slate-500 hover:text-primary-500 transition-colors whitespace-nowrap">Properties</Link>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-medium truncate max-w-[150px] sm:max-w-none">{property.title}</span>
          </nav>
        </div>
      </motion.div>

      {/* Premium Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Main Image */}
          <motion.div 
            className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-white/20"
            >
              <span className="text-sm font-bold text-slate-900">{activeImage + 1} / {property.images.length}</span>
            </motion.div>
            
            {/* Navigation Arrows */}
            {activeImage > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImage(activeImage - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
            {activeImage < property.images.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImage(activeImage + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveImage(index + 1)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative h-32 sm:h-44 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden ${
                  activeImage === index + 1 ? 'ring-4 ring-primary-500 shadow-lg' : 'shadow-soft hover:shadow-elevated'
                } transition-all duration-300`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent ${
                  activeImage === index + 1 ? 'opacity-0' : 'opacity-100'
                } transition-opacity`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-soft border border-slate-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs sm:text-sm font-semibold mb-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.type}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">{property.title}</h1>
                  <p className="text-slate-600 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{property.address}</span>
                  </p>
                </div>
                <div className="text-right w-full sm:w-auto">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">${property.price.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-primary-100 mt-1">Listed Price</p>
                  </div>
                </div>
              </div>

              {/* Premium Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
                {[
                  { icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  ), value: property.bedrooms, label: 'Bedrooms', color: 'from-blue-500 to-blue-600' },
                  { icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  ), value: property.bathrooms, label: 'Bathrooms', color: 'from-purple-500 to-purple-600' },
                  { icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  ), value: property.area, label: 'Sq Ft', color: 'from-emerald-500 to-emerald-600' },
                  { icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ), value: property.yearBuilt, label: 'Year Built', color: 'from-amber-500 to-amber-600' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl" />
                    <div className="relative text-center p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-3 shadow-lg`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {stat.icon}
                        </svg>
                      </div>
                      <p className="font-bold text-2xl text-slate-900">{stat.value}</p>
                      <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-soft border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Property Description</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">{property.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-soft border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Features & Amenities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 hover:shadow-soft transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Lead Form & Agent */}
          <div className="space-y-6">
            {/* Lead Capture Form */}
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-28">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interested in this property?</h3>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h4>
                  <p className="text-gray-600 mb-4">Our agent will contact you shortly.</p>
                  <OutlineButton onClick={() => setSubmitted(false)}>
                    Send Another Inquiry
                  </OutlineButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <TextInput
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <PhoneInput
                    label="Phone"
                    placeholder="+1 (555) 000-0000"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="I'm interested in scheduling a viewing..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 resize-none"
                      {...register('message')}
                    ></textarea>
                  </div>
                  <PrimaryButton type="submit" fullWidth loading={isSubmitting}>
                    Request Information
                  </PrimaryButton>
                </form>
              )}
            </div>

            {/* Agent Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center gap-4">
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{agentConfig.name}</h4>
                  <p className="text-sm text-gray-500">{agentConfig.title}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${agentConfig.phone}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agentConfig.phone}
                </a>
                <a
                  href={`mailto:${agentConfig.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {agentConfig.email}
                </a>
              </div>
              <Link to="/about" className="block mt-4">
                <OutlineButton fullWidth>View Agent Profile</OutlineButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
