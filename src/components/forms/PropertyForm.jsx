import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { propertyService } from '../../services'

const propertySchema = yup.object({
  title: yup.string().required('Title is required').min(10, 'Title must be at least 10 characters'),
  description: yup.string().required('Description is required').min(50, 'Description must be at least 50 characters'),
  type: yup.string().required('Property type is required'),
  status: yup.string().required('Status is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  area: yup.number().required('Area is required').positive('Area must be positive'),
  bedrooms: yup.number().min(0, 'Bedrooms cannot be negative'),
  bathrooms: yup.number().min(0, 'Bathrooms cannot be negative'),
  parkingSpaces: yup.number().min(0, 'Parking spaces cannot be negative'),
  yearBuilt: yup.number().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('Zip code is required'),
    country: yup.string().required('Country is required')
  })
})

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'office', label: 'Office Space' }
]

const propertyStatuses = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' }
]

const amenitiesList = [
  'Swimming Pool', 'Garden', 'Garage', 'Air Conditioning', 'Heating',
  'Gym', 'Security System', 'Elevator', 'Balcony', 'Terrace',
  'Fireplace', 'Laundry Room', 'Storage', 'Pet Friendly', 'Furnished',
  'Smart Home', 'Solar Panels', 'EV Charging', 'Sauna', 'Home Office'
]

function PropertyForm({ property = null, onSuccess, onCancel }) {
  const [step, setStep] = useState(1)
  const [images, setImages] = useState(property?.images || [])
  const [uploading, setUploading] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState(property?.amenities || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(propertySchema),
    defaultValues: property || {
      title: '',
      description: '',
      type: 'house',
      status: 'for-sale',
      price: '',
      area: '',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 1,
      yearBuilt: new Date().getFullYear(),
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  })

  // Image dropzone
  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true)
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        const response = await propertyService.uploadImage(formData)
        return response.url
      })
      
      const uploadedUrls = await Promise.all(uploadPromises)
      setImages(prev => [...prev, ...uploadedUrls])
    } catch (error) {
      console.error('Failed to upload images:', error)
    } finally {
      setUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const propertyData = {
        ...data,
        images,
        amenities: selectedAmenities
      }

      if (property) {
        await propertyService.updateProperty(property.id, propertyData)
      } else {
        await propertyService.createProperty(propertyData)
      }
      
      onSuccess?.()
    } catch (error) {
      console.error('Failed to save property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { id: 1, title: 'Basic Info', icon: '📋' },
    { id: 2, title: 'Details', icon: '🏠' },
    { id: 3, title: 'Location', icon: '📍' },
    { id: 4, title: 'Amenities', icon: '✨' },
    { id: 5, title: 'Images', icon: '📸' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id)}
                className={`flex flex-col items-center ${step >= s.id ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 ${
                  step === s.id ? 'bg-primary text-white' : step > s.id ? 'bg-primary/20 text-primary' : 'bg-gray-100'
                }`}>
                  {s.icon}
                </span>
                <span className="text-xs font-medium hidden sm:block">{s.title}</span>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-12 sm:w-24 h-0.5 mx-2 ${step > s.id ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g., Luxurious 4-Bedroom Villa with Ocean View"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  {...register('description')}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Describe the property in detail..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    {propertyStatuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      {...register('price')}
                      type="number"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="500000"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft) *</label>
                  <input
                    {...register('area')}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="2500"
                  />
                  {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setValue('bedrooms', Math.max(0, (watch('bedrooms') || 0) - 1))}
                      className="w-10 h-10 rounded-l-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      {...register('bedrooms')}
                      type="number"
                      className="w-full h-10 border-y border-gray-300 text-center focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('bedrooms', (watch('bedrooms') || 0) + 1)}
                      className="w-10 h-10 rounded-r-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setValue('bathrooms', Math.max(0, (watch('bathrooms') || 0) - 1))}
                      className="w-10 h-10 rounded-l-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      {...register('bathrooms')}
                      type="number"
                      className="w-full h-10 border-y border-gray-300 text-center focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('bathrooms', (watch('bathrooms') || 0) + 1)}
                      className="w-10 h-10 rounded-r-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setValue('parkingSpaces', Math.max(0, (watch('parkingSpaces') || 0) - 1))}
                      className="w-10 h-10 rounded-l-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      {...register('parkingSpaces')}
                      type="number"
                      className="w-full h-10 border-y border-gray-300 text-center focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('parkingSpaces', (watch('parkingSpaces') || 0) + 1)}
                      className="w-10 h-10 rounded-r-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                <input
                  {...register('yearBuilt')}
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="2020"
                />
                {errors.yearBuilt && <p className="mt-1 text-sm text-red-500">{errors.yearBuilt.message}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Property Location</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  {...register('address.street')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="123 Main Street"
                />
                {errors.address?.street && <p className="mt-1 text-sm text-red-500">{errors.address.street.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    {...register('address.city')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Islamabad"
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-500">{errors.address.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                  <input
                    {...register('address.state')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Punjab"
                  />
                  {errors.address?.state && <p className="mt-1 text-sm text-red-500">{errors.address.state.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code *</label>
                  <input
                    {...register('address.zipCode')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="90001"
                  />
                  {errors.address?.zipCode && <p className="mt-1 text-sm text-red-500">{errors.address.zipCode.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    {...register('address.country')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="United States"
                  />
                  {errors.address?.country && <p className="mt-1 text-sm text-red-500">{errors.address.country.message}</p>}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Map will be displayed here</p>
                  <p className="text-sm">Click to pin exact location</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Amenities */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Amenities & Features</h2>
              <p className="text-gray-600">Select all amenities that apply to this property</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenitiesList.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedAmenities.includes(amenity)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>{selectedAmenities.length}</strong> amenities selected
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Images */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
              <p className="text-gray-600">Upload high-quality images of your property (max 10 images, 5MB each)</p>
              
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {uploading ? (
                  <p className="text-primary">Uploading...</p>
                ) : isDragActive ? (
                  <p className="text-primary">Drop the images here...</p>
                ) : (
                  <>
                    <p className="text-gray-600">Drag & drop images here, or click to select</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </>
                )}
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Property ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      {index === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onCancel?.()}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            {step > 1 ? '← Previous' : 'Cancel'}
          </button>
          
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {property ? 'Update Property' : 'Publish Property'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default PropertyForm
