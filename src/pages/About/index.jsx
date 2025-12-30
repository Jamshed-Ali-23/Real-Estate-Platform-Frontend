import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PrimaryButton, OutlineButton } from '../../components/buttons'
import agentConfig from '../../config/agent'

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20"
              >
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                {agentConfig.experience} of Excellence
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400 bg-clip-text text-transparent">
                  {agentConfig.name.split(' ')[0]}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-primary-200 mb-4 font-medium"
              >
                {agentConfig.title}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg"
              >
                {agentConfig.tagline}. Helping families find their perfect home with personalized service and local expertise.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
                  >
                    Get In Touch
                  </motion.button>
                </Link>
                <Link to="/properties">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    View My Listings
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative max-w-lg mx-auto">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-3xl blur-2xl" />
                
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl"
                />
                
                {/* License Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl text-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Licensed Agent</p>
                      <p className="font-bold text-slate-900">{agentConfig.license}</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Rating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-xl text-slate-900 px-5 py-3 rounded-2xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold">5.0</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: agentConfig.stats.propertiesSold, suffix: '+', label: 'Properties Sold', icon: '🏠' },
              { value: agentConfig.stats.happyClients, suffix: '+', label: 'Happy Clients', icon: '😊' },
              { value: agentConfig.stats.yearsExperience, suffix: '+', label: 'Years Experience', icon: '📅' },
              { value: agentConfig.stats.activeListings, suffix: '', label: 'Active Listings', icon: '📋' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary-50 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform text-xl sm:text-2xl">
                  {stat.icon}
                </div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-slate-600 mt-1 sm:mt-2 font-medium text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                Your Trusted Real Estate Partner
              </h2>
              <div className="prose prose-lg text-slate-600 space-y-6">
                {agentConfig.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={`tel:${agentConfig.phone}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Me
                  </motion.button>
                </a>
                <a href={`mailto:${agentConfig.email}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Me
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Languages */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 hover:shadow-card transition-shadow">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </span>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agentConfig.languages.map((lang, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 hover:shadow-card transition-shadow">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-50 rounded-xl">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agentConfig.specializations.map((spec, i) => (
                    <span key={i} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 hover:shadow-card transition-shadow">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-xl">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agentConfig.serviceAreas.map((area, i) => (
                    <Link
                      key={i}
                      to={`/properties?location=${encodeURIComponent(area)}`}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
              Recognition
              <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Awards & Certifications</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentConfig.awards.map((award, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group flex items-center gap-5 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="font-semibold text-slate-900">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
              Testimonials
              <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">What My Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agentConfig.testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 relative group hover:shadow-card transition-all"
              >
                <div className="absolute top-8 right-8 w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                    <p className="text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Let me help you find your dream home or sell your property for the best price. Your real estate journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-primary-700 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule a Consultation
                </motion.button>
              </Link>
              <Link to="/properties">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Browse Properties
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
