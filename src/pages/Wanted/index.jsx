import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextInput, SelectInput, TextArea } from '../../components/forms'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import { agentConfig } from '../../config/agent'

const Wanted = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    listingType: '',
    location: '',
    minBudget: '',
    maxBudget: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    requirements: '',
    timeline: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const propertyTypes = [
    { value: '', label: 'Select Property Type' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'farmhouse', label: 'Farmhouse' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
  ]

  const listingTypes = [
    { value: '', label: 'Select Purpose' },
    { value: 'buy', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
  ]

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: '0-2000000', label: 'Under 20 Lac' },
    { value: '2000000-5000000', label: '20 Lac - 50 Lac' },
    { value: '5000000-10000000', label: '50 Lac - 1 Crore' },
    { value: '10000000-20000000', label: '1 Crore - 2 Crore' },
    { value: '20000000-50000000', label: '2 Crore - 5 Crore' },
    { value: '50000000-100000000', label: '5 Crore - 10 Crore' },
    { value: '100000000+', label: '10 Crore+' },
  ]

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5+ Bedrooms' },
  ]

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1 Bathroom' },
    { value: '2', label: '2 Bathrooms' },
    { value: '3', label: '3 Bathrooms' },
    { value: '4+', label: '4+ Bathrooms' },
  ]

  const timelineOptions = [
    { value: '', label: 'Select Timeline' },
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3months', label: '1-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: '6+months', label: '6+ Months' },
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        listingType: '',
        location: '',
        minBudget: '',
        maxBudget: '',
        bedrooms: '',
        bathrooms: '',
        minArea: '',
        maxArea: '',
        requirements: '',
        timeline: ''
      })
    }, 1500)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      listingType: '',
      location: '',
      minBudget: '',
      maxBudget: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      requirements: '',
      timeline: ''
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-200">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Request Submitted!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for sharing your requirements. {agentConfig.name} will review your request and get back to you soon with matching properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Another Request
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all duration-300"
              >
                Back to Home
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Property Wanted
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Looking for a Property?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto"
            >
              Tell us what you're looking for and let {agentConfig.name} find the perfect match for you
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Precise Matching',
                description: 'Our AI-powered system finds properties that match your exact requirements'
              },
              {
                icon: '⚡',
                title: 'Quick Response',
                description: 'Get personalized property suggestions within 24 hours'
              },
              {
                icon: '🔒',
                title: 'Confidential & Secure',
                description: 'Your information is safe and used only to find your perfect property'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Share Your Requirements</h2>
                <p className="text-primary-100 mt-2">Fill in the details below and we'll help you find your dream property</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                    <TextInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                    <TextInput
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                    <SelectInput
                      label="Timeline"
                      options={timelineOptions}
                      value={formData.timeline}
                      onChange={(e) => handleChange('timeline', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Property Requirements */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Property Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput
                      label="Property Type"
                      options={propertyTypes}
                      value={formData.propertyType}
                      onChange={(e) => handleChange('propertyType', e.target.value)}
                      required
                    />
                    <SelectInput
                      label="Looking To"
                      options={listingTypes}
                      value={formData.listingType}
                      onChange={(e) => handleChange('listingType', e.target.value)}
                      required
                    />
                    <TextInput
                      label="Preferred Location"
                      placeholder="e.g., South Delhi, Gurgaon"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                    />
                    <SelectInput
                      label="Budget Range"
                      options={budgetRanges}
                      value={formData.maxBudget}
                      onChange={(e) => handleChange('maxBudget', e.target.value)}
                      required
                    />
                    <SelectInput
                      label="Bedrooms"
                      options={bedroomOptions}
                      value={formData.bedrooms}
                      onChange={(e) => handleChange('bedrooms', e.target.value)}
                    />
                    <SelectInput
                      label="Bathrooms"
                      options={bathroomOptions}
                      value={formData.bathrooms}
                      onChange={(e) => handleChange('bathrooms', e.target.value)}
                    />
                    <TextInput
                      label="Min Area (sq ft)"
                      type="number"
                      placeholder="e.g., 1000"
                      value={formData.minArea}
                      onChange={(e) => handleChange('minArea', e.target.value)}
                    />
                    <TextInput
                      label="Max Area (sq ft)"
                      type="number"
                      placeholder="e.g., 2000"
                      value={formData.maxArea}
                      onChange={(e) => handleChange('maxArea', e.target.value)}
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Additional Details
                  </h3>
                  <TextArea
                    label="Specific Requirements"
                    placeholder="Please share any specific requirements, preferences, or features you're looking for (e.g., parking, gym, swimming pool, gated community, etc.)"
                    value={formData.requirements}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                    rows={6}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all duration-300"
                  >
                    Reset Form
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {[
                { step: '1', title: 'Submit Form', desc: 'Share your requirements with us' },
                { step: '2', title: 'Review', desc: 'We analyze your needs' },
                { step: '3', title: 'Match', desc: 'Find perfect properties' },
                { step: '4', title: 'Connect', desc: 'Get personalized suggestions' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Wanted
