import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import agentConfig from '../../config/agent'
import leadService from '../../services/leadService'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  inquiryType: yup.string().required('Please select inquiry type'),
  message: yup.string().required('Message is required').min(20, 'Message must be at least 20 characters'),
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Submit lead to MongoDB via API
      const response = await leadService.submitInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        interestedIn: data.inquiryType,
        message: data.message,
        source: 'website'
      })
      
      if (response.success) {
        toast.success('Thank you! I will get back to you within 24 hours.')
        reset()
      } else {
        toast.error(response.message || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inquiryTypes = [
    { value: 'buying', label: '🏠 Buying a Property', icon: '🏠' },
    { value: 'selling', label: '💰 Selling a Property', icon: '💰' },
    { value: 'renting', label: '🔑 Renting a Property', icon: '🔑' },
    { value: 'investing', label: '📈 Investment Inquiry', icon: '📈' },
    { value: 'valuation', label: '📊 Property Valuation', icon: '📊' },
    { value: 'other', label: '💬 Other', icon: '💬' },
  ]

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Me',
      value: agentConfig.phone,
      href: `tel:${agentConfig.phone}`,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Me',
      value: agentConfig.email,
      href: `mailto:${agentConfig.email}`,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      title: 'WhatsApp',
      value: 'Chat with me',
      href: `https://wa.me/${agentConfig.whatsapp}`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800 text-white overflow-hidden">
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
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available 24/7
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Let's Connect
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto"
            >
              Ready to start your real estate journey? I'm here to help you every step of the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative group p-8 rounded-3xl shadow-soft border border-slate-100 ${method.hoverColor} transition-all duration-300`}
              >
                <div className="absolute -top-6 left-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-sm text-slate-500 mb-1">{method.title}</p>
                  <p className="font-bold text-slate-900 text-lg">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Sidebar - Agent Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Agent Card */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 sticky top-24">
                <div className="flex items-start gap-5 mb-8">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-2xl blur-lg" />
                    <img
                      src={agentConfig.photo}
                      alt={agentConfig.name}
                      className="relative w-24 h-24 rounded-2xl object-cover ring-4 ring-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-1">{agentConfig.name}</h3>
                    <p className="text-slate-600 mb-2">{agentConfig.title}</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {agentConfig.license}
                    </div>
                  </div>
                </div>

                {/* Office Address */}
                <div className="mb-8">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    Office Location
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {agentConfig.address.street}<br />
                    {agentConfig.address.city}, {agentConfig.address.state} {agentConfig.address.zip}
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Follow Me</h4>
                  <div className="flex gap-3">
                    {agentConfig.social.facebook && (
                      <a
                        href={agentConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {agentConfig.social.instagram && (
                      <a
                        href={agentConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-100 transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    )}
                    {agentConfig.social.linkedin && (
                      <a
                        href={agentConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {agentConfig.social.youtube && (
                      <a
                        href={agentConfig.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-10 shadow-soft border border-slate-100">
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                    <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
                    Contact Form
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Send Me a Message</h2>
                  <p className="text-slate-600 text-lg">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.name ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        {...register('inquiryType')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          errors.inquiryType ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && (
                        <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.inquiryType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className={`w-full px-5 py-4 rounded-xl border-2 ${
                        errors.message ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all`}
                      placeholder="Tell me about what you're looking for..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-0.5 w-5 h-5 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor="consent" className="text-sm text-slate-600">
                      I consent to having {agentConfig.name} collect my details through this form and agree to be contacted regarding my inquiry.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full px-8 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
