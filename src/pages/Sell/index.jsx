import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import { TextInput, SelectInput, PhoneInput } from '../../components/forms'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import toast from 'react-hot-toast'
import { agentConfig } from '../../config/agent'
import leadService from '../../services/leadService'

const sellSchema = yup.object({
  propertyType: yup.string().required('Property type is required'),
  purpose: yup.string().required('Please select sale or rent'),
  title: yup.string().required('Property title is required'),
  location: yup.string().required('Location is required'),
  city: yup.string().required('City is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  area: yup.number().positive('Area must be positive').required('Area is required'),
  areaUnit: yup.string().required('Area unit is required'),
  bedrooms: yup.string(),
  bathrooms: yup.string(),
  description: yup.string().required('Description is required').min(50, 'Description should be at least 50 characters'),
  name: yup.string().required('Your name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
})

const Sell = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [images, setImages] = useState([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(sellSchema),
    defaultValues: {
      purpose: 'sale',
      areaUnit: 'sqft'
    }
  })

  const propertyType = watch('propertyType')
  const purpose = watch('purpose')

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment / Flat' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot / Land' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office' },
    { value: 'shop', label: 'Shop' },
    { value: 'warehouse', label: 'Warehouse' },
  ]

  const cities = [
    { value: 'islamabad', label: 'Islamabad' },
    { value: 'lahore', label: 'Lahore' },
    { value: 'karachi', label: 'Karachi' },
    { value: 'rawalpindi', label: 'Rawalpindi' },
    { value: 'faisalabad', label: 'Faisalabad' },
    { value: 'multan', label: 'Multan' },
    { value: 'peshawar', label: 'Peshawar' },
    { value: 'quetta', label: 'Quetta' },
  ]

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages([...images, ...newImages].slice(0, 10))
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    try {
      // Submit listing to backend API
      const listingData = {
        ...data,
        images: images.map(img => img.preview),
        features: []
      }
      
      const response = await leadService.submitListing(listingData)
      
      if (response.success) {
        toast.success(`Property submitted successfully! ${agentConfig.name} will review and contact you soon.`)
        navigate('/')
      } else {
        toast.error(response.message || 'Failed to submit listing')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error(error.message || 'Something went wrong. Please try again.')
    }
  }

  const nextStep = () => setStep(s => Math.min(s + 1, 3))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
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
              List Your Property
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Sell or Rent Your Property
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto"
            >
              List your property with us and reach thousands of potential buyers and tenants. It's free and easy!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="py-16 bg-white border-b border-slate-200 -mt-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👀', title: '10K+ Views', desc: 'Monthly active users', color: 'from-blue-500 to-blue-600' },
              { icon: '🆓', title: 'Free Listing', desc: 'No hidden charges', color: 'from-emerald-500 to-emerald-600' },
              { icon: '⚡', title: 'Quick Process', desc: 'List in 5 minutes', color: 'from-purple-500 to-purple-600' },
              { icon: '🎯', title: 'Verified Leads', desc: 'Quality inquiries', color: 'from-amber-500 to-amber-600' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white rounded-3xl shadow-soft group-hover:shadow-elevated transition-all duration-300" />
                <div className="relative p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-4 text-white text-3xl shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Progress Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: 'Property Details' },
                { num: 2, label: 'Images & Description' },
                { num: 3, label: 'Contact Info' }
              ].map((s, index) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div 
                      animate={{ 
                        scale: step >= s.num ? 1.1 : 1,
                        backgroundColor: step >= s.num ? '#f59e0b' : '#e2e8f0'
                      }}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
                        step >= s.num ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step > s.num ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        s.num
                      )}
                    </motion.div>
                    <span className={`mt-3 text-sm font-semibold hidden md:block ${
                      step >= s.num ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="flex-1 mx-4 -mt-8">
                      <motion.div 
                        animate={{ 
                          scaleX: step > s.num ? 1 : 0.3,
                          backgroundColor: step > s.num ? '#f59e0b' : '#e2e8f0'
                        }}
                        transition={{ duration: 0.3 }}
                        className={`h-1 rounded-full ${
                          step > s.num ? 'bg-amber-500' : 'bg-slate-200'
                        }`}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-soft border border-slate-200 p-8 md:p-12"
              >
              {/* Step 1: Property Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
                  
                  {/* Purpose Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      purpose === 'sale' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
                    }`}>
                      <input type="radio" value="sale" {...register('purpose')} className="sr-only" />
                      <div className="text-center">
                        <span className="text-2xl block mb-1">💰</span>
                        <span className="font-semibold">Sell</span>
                      </div>
                    </label>
                    <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      purpose === 'rent' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
                    }`}>
                      <input type="radio" value="rent" {...register('purpose')} className="sr-only" />
                      <div className="text-center">
                        <span className="text-2xl block mb-1">🏠</span>
                        <span className="font-semibold">Rent Out</span>
                      </div>
                    </label>
                  </div>

                  <SelectInput
                    label="Property Type"
                    options={propertyTypes}
                    {...register('propertyType')}
                    error={errors.propertyType?.message}
                  />

                  <TextInput
                    label="Property Title"
                    placeholder="e.g., Beautiful 3 Bedroom House in Downtown"
                    {...register('title')}
                    error={errors.title?.message}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput
                      label="City"
                      options={cities}
                      {...register('city')}
                      error={errors.city?.message}
                    />
                    <TextInput
                      label="Location / Area"
                      placeholder="e.g., DHA Phase 6"
                      {...register('location')}
                      error={errors.location?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextInput
                      label={purpose === 'rent' ? 'Monthly Rent ($)' : 'Price ($)'}
                      type="number"
                      placeholder="Enter amount"
                      {...register('price')}
                      error={errors.price?.message}
                    />
                    <TextInput
                      label="Area Size"
                      type="number"
                      placeholder="Enter size"
                      {...register('area')}
                      error={errors.area?.message}
                    />
                    <SelectInput
                      label="Unit"
                      options={[
                        { value: 'sqft', label: 'Sq. Ft.' },
                        { value: 'sqm', label: 'Sq. M.' },
                        { value: 'marla', label: 'Marla' },
                        { value: 'kanal', label: 'Kanal' },
                        { value: 'acre', label: 'Acre' },
                      ]}
                      {...register('areaUnit')}
                    />
                  </div>

                  {propertyType && propertyType !== 'plot' && propertyType !== 'warehouse' && (
                    <div className="grid grid-cols-2 gap-4">
                      <SelectInput
                        label="Bedrooms"
                        options={[
                          { value: '', label: 'Select' },
                          { value: '1', label: '1' },
                          { value: '2', label: '2' },
                          { value: '3', label: '3' },
                          { value: '4', label: '4' },
                          { value: '5', label: '5' },
                          { value: '6+', label: '6+' },
                        ]}
                        {...register('bedrooms')}
                      />
                      <SelectInput
                        label="Bathrooms"
                        options={[
                          { value: '', label: 'Select' },
                          { value: '1', label: '1' },
                          { value: '2', label: '2' },
                          { value: '3', label: '3' },
                          { value: '4', label: '4' },
                          { value: '5+', label: '5+' },
                        ]}
                        {...register('bathrooms')}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Images & Description */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Images & Description</h2>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Images (Max 10)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img src={img.preview} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {images.length < 10 && (
                        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="text-sm text-gray-500 mt-1">Add Photo</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">First image will be the cover photo</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                      placeholder="Describe your property in detail. Include features, nearby amenities, and any other important information..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Property Features
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Parking', 'Garden', 'Swimming Pool', 'Gym', 'Security', 
                        'Elevator', 'Balcony', 'Furnished', 'Air Conditioning',
                        'Central Heating', 'Laundry Room', 'Storage'
                      ].map((feature) => (
                        <label key={feature} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                          <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                  <TextInput
                    label="Your Name"
                    placeholder="Enter your full name"
                    {...register('name')}
                    error={errors.name?.message}
                  />

                  <TextInput
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <PhoneInput
                    label="Phone Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">📋 What happens next?</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• I will personally review your listing within 24 hours</li>
                      <li>• I may contact you for additional details or photos</li>
                      <li>• Once approved, your property will be featured on my website</li>
                      <li>• You'll receive inquiries directly via email and phone</li>
                    </ul>
                  </div>

                  <label className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1 rounded text-amber-500" />
                    <span className="text-sm text-gray-600">
                      I agree to the <Link to="/terms" className="text-amber-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <OutlineButton type="button" onClick={prevStep}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </OutlineButton>
                ) : (
                  <div />
                )}
                
                {step < 3 ? (
                  <PrimaryButton type="button" onClick={nextStep} className="bg-amber-500 hover:bg-amber-600">
                    Next Step
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </PrimaryButton>
                ) : (
                  <PrimaryButton type="submit" disabled={isSubmitting} className="bg-amber-500 hover:bg-amber-600">
                    {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </PrimaryButton>
                )}
              </div>
            </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Sell
