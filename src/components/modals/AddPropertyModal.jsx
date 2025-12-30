import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { PrimaryButton, OutlineButton } from '../buttons'
import { TextInput, SelectInput } from '../forms'

const propertySchema = yup.object({
  title: yup.string().required('Title is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Type is required'),
  bedrooms: yup.number().required('Bedrooms is required').positive().integer(),
  bathrooms: yup.number().required('Bathrooms is required').positive().integer(),
  sqft: yup.number().required('Square feet is required').positive().integer(),
  description: yup.string().required('Description is required'),
})

const AddPropertyModal = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedImages, setSelectedImages] = useState([])
  const [features, setFeatures] = useState([])
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(propertySchema)
  })

  const handleClose = () => {
    reset()
    setCurrentStep(1)
    setSelectedImages([])
    setFeatures([])
    onClose()
  }

  const handleFormSubmit = async (data) => {
    try {
      // Parse location into city and state
      const locationParts = data.location.split(',').map(s => s.trim())
      const city = locationParts[0] || 'Unknown'
      const state = locationParts[1] || 'Unknown'
      
      const propertyData = {
        title: data.title,
        description: data.description,
        price: data.price,
        propertyType: data.type,
        status: 'For Sale',
        listingType: 'sale',
        featured: false,
        address: {
          street: '',
          city: city,
          state: state,
          zipCode: '',
          country: 'USA'
        },
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.sqft,
        features: features,
        images: selectedImages.length > 0 ? selectedImages : [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        views: 0
      }
      
      await onSubmit(propertyData)
      toast.success('Property added successfully!')
      handleClose()
    } catch (error) {
      toast.error('Failed to add property')
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImages(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleFeature = (feature) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const availableFeatures = [
    'Parking', 'Garden', 'Swimming Pool', 'Gym', 
    'Security', 'Elevator', 'Balcony', 'Furnished',
    'Pet Friendly', 'Air Conditioning', 'Heating', 'Fireplace'
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
          onClick={handleClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
              <p className="text-sm text-gray-500">Fill in the details below</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-xs mt-1 ${
                      currentStep >= step ? 'text-primary-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step === 1 ? 'Basic Info' : step === 2 ? 'Images' : 'Features'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                      currentStep > step ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <TextInput
                        label="Property Title"
                        placeholder="Modern Luxury Villa"
                        error={errors.title?.message}
                        {...register('title')}
                      />
                    </div>

                    <TextInput
                      label="Price ($)"
                      type="number"
                      placeholder="850000"
                      error={errors.price?.message}
                      {...register('price')}
                    />

                    <TextInput
                      label="Location"
                      placeholder="DHA Islamabad"
                      error={errors.location?.message}
                      {...register('location')}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select
                        {...register('type')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.type ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all`}
                      >
                        <option value="">Select Type</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Cabin">Cabin</option>
                        <option value="Condo">Condo</option>
                      </select>
                      {errors.type && (
                        <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
                      )}
                    </div>

                    <TextInput
                      label="Bedrooms"
                      type="number"
                      placeholder="3"
                      error={errors.bedrooms?.message}
                      {...register('bedrooms')}
                    />

                    <TextInput
                      label="Bathrooms"
                      type="number"
                      placeholder="2"
                      error={errors.bathrooms?.message}
                      {...register('bathrooms')}
                    />

                    <TextInput
                      label="Square Feet"
                      type="number"
                      placeholder="2500"
                      error={errors.sqft?.message}
                      {...register('sqft')}
                    />

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the property..."
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.description ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none`}
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Images */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Property Images
                    </label>
                    
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-primary-600 font-medium mb-1">Click to upload images</span>
                        <span className="text-sm text-gray-500">or drag and drop</span>
                        <span className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</span>
                      </label>
                    </div>

                    {/* Selected Images Grid */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            {index === 0 && (
                              <span className="absolute top-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs font-bold rounded-lg">
                                Main
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Features */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Features
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableFeatures.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            features.includes(feature)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                              features.includes(feature)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}>
                              {features.includes(feature) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium ${
                              features.includes(feature) ? 'text-primary-700' : 'text-gray-700'
                            }`}>
                              {feature}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
              {currentStep > 1 ? (
                <OutlineButton
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Previous
                </OutlineButton>
              ) : (
                <OutlineButton type="button" onClick={handleClose}>
                  Cancel
                </OutlineButton>
              )}

              {currentStep < 3 ? (
                <PrimaryButton
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                >
                  Next
                </PrimaryButton>
              ) : (
                <PrimaryButton type="submit" loading={isSubmitting}>
                  Add Property
                </PrimaryButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPropertyModal
