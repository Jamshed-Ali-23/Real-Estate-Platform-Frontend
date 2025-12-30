import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import { TextInput, PhoneInput } from '../../components/forms'
import { agentConfig } from '../../config/agent'
import toast from 'react-hot-toast'

const settingsSchema = yup.object({
  name: yup.string().required('Name is required'),
  title: yup.string().required('Title is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  bio: yup.string().required('Bio is required').min(100, 'Bio should be at least 100 characters'),
  facebook: yup.string().url('Invalid URL').nullable(),
  instagram: yup.string().url('Invalid URL').nullable(),
  linkedin: yup.string().url('Invalid URL').nullable(),
  twitter: yup.string().url('Invalid URL').nullable(),
})

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [photoPreview, setPhotoPreview] = useState(agentConfig.photo)
  
  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNewLead: true,
    emailMessages: true,
    emailWeeklyReport: true,
    pushNewLead: true,
    pushMessages: true,
    pushAppointments: true,
    smsNewLead: false,
    smsAppointments: true,
  })

  // Website settings
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'Johnson Realty',
    tagline: 'Your Trusted Real Estate Partner',
    primaryColor: '#6366f1',
    showFeaturedProperties: true,
    showTestimonials: true,
    showNewsletterSignup: true,
    enableChat: true,
    maintenanceMode: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      name: agentConfig.name,
      title: agentConfig.title,
      email: agentConfig.email,
      phone: agentConfig.phone,
      address: typeof agentConfig.address === 'object' 
        ? `${agentConfig.address.street}, ${agentConfig.address.city}` 
        : agentConfig.address,
      bio: agentConfig.bio,
      facebook: agentConfig.social?.facebook || '',
      instagram: agentConfig.social?.instagram || '',
      linkedin: agentConfig.social?.linkedin || '',
      twitter: agentConfig.social?.twitter || '',
    }
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Profile updated successfully!')
      // In production, this would update the config/database
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] })
  }

  const handleWebsiteSettingChange = (key, value) => {
    setWebsiteSettings({ ...websiteSettings, [key]: value })
  }

  const saveNotifications = () => {
    toast.success('Notification preferences saved!')
  }

  const saveWebsiteSettings = () => {
    toast.success('Website settings saved!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'social', label: 'Social Links', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )},
    { id: 'notifications', label: 'Notifications', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )},
    { id: 'website', label: 'Website', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )},
    { id: 'password', label: 'Security', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your profile, preferences and website settings</p>
        </div>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Website
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-5 mt-4 text-white">
            <h3 className="font-semibold mb-3">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Plan</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">Pro</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Storage</span>
                <span className="text-sm font-medium">2.4 / 5 GB</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: '48%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Properties</span>
                <span className="text-sm font-medium">24 / 50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-gray-500 text-sm">Update your personal details and bio</p>
                </div>

                {/* Photo Upload */}
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                    />
                    <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 text-white rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Profile Photo</p>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                    <button type="button" className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Remove photo
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="Full Name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <TextInput
                    label="Title"
                    error={errors.title?.message}
                    {...register('title')}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <PhoneInput
                    label="Phone"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <div className="md:col-span-2">
                    <TextInput
                      label="Address"
                      error={errors.address?.message}
                      {...register('address')}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.bio ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 resize-none`}
                      {...register('bio')}
                    />
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <OutlineButton type="button">Cancel</OutlineButton>
                  <PrimaryButton type="submit" loading={isSubmitting}>
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
                  <p className="text-gray-500 text-sm">Add your social media profiles to connect with clients</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="Facebook"
                        placeholder="https://facebook.com/yourprofile"
                        error={errors.facebook?.message}
                        {...register('facebook')}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="Instagram"
                        placeholder="https://instagram.com/yourprofile"
                        error={errors.instagram?.message}
                        {...register('instagram')}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="LinkedIn"
                        placeholder="https://linkedin.com/in/yourprofile"
                        error={errors.linkedin?.message}
                        {...register('linkedin')}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="X (Twitter)"
                        placeholder="https://x.com/yourprofile"
                        error={errors.twitter?.message}
                        {...register('twitter')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <OutlineButton type="button">Cancel</OutlineButton>
                  <PrimaryButton type="submit" loading={isSubmitting}>
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-gray-500 text-sm">Manage your account security and password</p>
                </div>

                {/* Two Factor Auth */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Change Password */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="max-w-md space-y-4">
                    <TextInput
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                    />
                    <TextInput
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                    />
                    <TextInput
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-2">Password requirements:</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          At least 8 characters
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          One uppercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          One number or special character
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Windows - Chrome</p>
                          <p className="text-xs text-gray-500">Current session • Islamabad, PK</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">iPhone - Safari</p>
                          <p className="text-xs text-gray-500">Last active 2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-600 hover:text-red-700">Revoke</button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <OutlineButton type="button">Cancel</OutlineButton>
                  <PrimaryButton type="button" onClick={() => toast.success('Password updated!')}>
                    Update Password
                  </PrimaryButton>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-gray-500 text-sm">Choose how you want to be notified</p>
                </div>

                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'emailNewLead', label: 'New Lead Inquiries', desc: 'Get notified when a new lead submits a request' },
                      { key: 'emailMessages', label: 'New Messages', desc: 'Receive emails for new client messages' },
                      { key: 'emailWeeklyReport', label: 'Weekly Reports', desc: 'Get a weekly summary of your activity' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'pushNewLead', label: 'New Lead Alerts', desc: 'Instant push for new inquiries' },
                      { key: 'pushMessages', label: 'Message Alerts', desc: 'Get notified of new messages' },
                      { key: 'pushAppointments', label: 'Appointment Reminders', desc: 'Reminders before scheduled viewings' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    SMS Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'smsNewLead', label: 'Urgent Lead Alerts', desc: 'SMS for high-priority leads only' },
                      { key: 'smsAppointments', label: 'Appointment Reminders', desc: 'SMS reminders before viewings' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <OutlineButton type="button">Reset to Default</OutlineButton>
                  <PrimaryButton type="button" onClick={saveNotifications}>
                    Save Preferences
                  </PrimaryButton>
                </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Website Settings</h2>
                  <p className="text-gray-500 text-sm">Configure your public website appearance</p>
                </div>

                {/* General Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">General</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Site Name"
                      value={websiteSettings.siteName}
                      onChange={(e) => handleWebsiteSettingChange('siteName', e.target.value)}
                    />
                    <TextInput
                      label="Tagline"
                      value={websiteSettings.tagline}
                      onChange={(e) => handleWebsiteSettingChange('tagline', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={websiteSettings.primaryColor}
                        onChange={(e) => handleWebsiteSettingChange('primaryColor', e.target.value)}
                        className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteSettings.primaryColor}
                        onChange={(e) => handleWebsiteSettingChange('primaryColor', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Features Toggle */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900">Homepage Sections</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'showFeaturedProperties', label: 'Featured Properties', desc: 'Display featured listings on homepage' },
                      { key: 'showTestimonials', label: 'Testimonials', desc: 'Show client testimonials section' },
                      { key: 'showNewsletterSignup', label: 'Newsletter Signup', desc: 'Display email subscription form' },
                      { key: 'enableChat', label: 'Chat Widget', desc: 'Enable floating contact chat widget' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleWebsiteSettingChange(item.key, !websiteSettings[item.key])}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            websiteSettings[item.key] ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            websiteSettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Maintenance Mode</p>
                        <p className="text-sm text-yellow-700">When enabled, visitors will see a maintenance page</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleWebsiteSettingChange('maintenanceMode', !websiteSettings.maintenanceMode)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        websiteSettings.maintenanceMode ? 'bg-yellow-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        websiteSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <OutlineButton type="button">Preview Changes</OutlineButton>
                  <PrimaryButton type="button" onClick={saveWebsiteSettings}>
                    Save Settings
                  </PrimaryButton>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
