'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // In production, this would send the email
    // For now, we'll use mailto as a fallback
    const mailtoLink = `mailto:wvec.office@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    window.location.href = mailtoLink
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitStatus('idle')
    }, 3000)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Contact Us
            </h1>
            <p className="text-charcoal/70 text-lg">
              We'd love to hear from you and help you connect with our church family
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-charcoal mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-steel-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-charcoal mb-2">Address</h3>
                        <address className="not-italic text-charcoal/70">
                          Whiddon Valley Evangelical Church<br />
                          Stoat Park<br />
                          Whiddon Valley<br />
                          BARNSTAPLE<br />
                          Devon<br />
                          EX32 8PT<br />
                          United Kingdom
                        </address>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-steel-blue flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-charcoal mb-2">Telephone</h3>
                        <a 
                          href="tel:+447504925423" 
                          className="text-steel-blue hover:text-cyber-teal smooth-transition"
                        >
                          +44 (0)7504 925423
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-steel-blue flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-charcoal mb-2">Email</h3>
                        <a 
                          href="mailto:wvec.office@gmail.com" 
                          className="text-steel-blue hover:text-cyber-teal smooth-transition"
                        >
                          wvec.office@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glass-effect rounded-xl p-2 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.4587!2d-4.0726!3d51.0889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA1JzIwLjAiTiA0wrAwNCcyMS40Ilc!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-semibold text-charcoal mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-charcoal font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-charcoal font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-charcoal font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-charcoal font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-steel-blue text-white py-3 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}