'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Calendar, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  image_url?: string
}

const AlternatingHero = () => {
  const [showServiceTimes, setShowServiceTimes] = useState(true)
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedEvent()
  }, [])

  useEffect(() => {
    // Only alternate if there's a featured event
    if (featuredEvent) {
      const interval = setInterval(() => {
        setShowServiceTimes(prev => !prev)
      }, 8000) // Switch every 8 seconds

      return () => clearInterval(interval)
    }
  }, [featuredEvent])

  const fetchFeaturedEvent = async () => {
    try {
      const response = await fetch('/api/public/featured-event')
      if (response.ok) {
        const data = await response.json()
        setFeaturedEvent(data.featuredEvent)
      }
    } catch (error) {
      console.error('Failed to fetch featured event:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    // Convert 24h to 12h format
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes}${ampm}`
  }

  // If no featured event or still loading, just show service times
  if (!featuredEvent || loading) {
    return <ServiceTimesSection />
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-ivory to-champagne/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {showServiceTimes ? (
            <motion.div
              key="service-times"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ServiceTimesSection />
            </motion.div>
          ) : (
            <motion.div
              key="featured-event"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedEventSection event={featuredEvent} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicator dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setShowServiceTimes(true)}
            className={`w-2 h-2 rounded-full transition-colors ${
              showServiceTimes ? 'bg-steel-blue' : 'bg-charcoal/20'
            }`}
            aria-label="Show service times"
          />
          <button
            onClick={() => setShowServiceTimes(false)}
            className={`w-2 h-2 rounded-full transition-colors ${
              !showServiceTimes ? 'bg-steel-blue' : 'bg-charcoal/20'
            }`}
            aria-label="Show featured event"
          />
        </div>
      </div>
    </section>
  )
}

const ServiceTimesSection = () => {
  return (
    <div className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
      <div className="flex items-center justify-center mb-6">
        <Clock className="w-8 h-8 text-steel-blue mr-3" />
        <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
          THE CHURCH IS OPEN
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <span className="text-lg sm:text-xl font-semibold text-steel-blue">11:00am Sunday</span>
          <span className="text-lg sm:text-xl text-charcoal">Morning Service</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <span className="text-lg sm:text-xl font-semibold text-steel-blue">6:30pm Sunday</span>
          <span className="text-lg sm:text-xl text-charcoal">Evening Service</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <span className="text-lg sm:text-xl font-semibold text-steel-blue">10:30am Thursday</span>
          <span className="text-lg sm:text-xl text-charcoal">Bible Study</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-6 border-t border-sage/20"
      >
        <div className="flex items-center justify-center text-charcoal/70">
          <p className="text-sm sm:text-base">
            We would love to welcome you to our services in person
          </p>
        </div>
      </motion.div>
    </div>
  )
}

const FeaturedEventSection = ({ event }: { event: Event }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes}${ampm}`
  }

  return (
    <div className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12">
      <div className="flex items-center justify-center mb-6">
        <Calendar className="w-8 h-8 text-steel-blue mr-3" />
        <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
          FEATURED EVENT
        </h2>
      </div>

      {event.image_url && (
        <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-ivory to-champagne/30">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-48 sm:h-64 object-contain"
          />
        </div>
      )}

      <div className="text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-charcoal">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-charcoal/70 text-sm sm:text-base max-w-2xl mx-auto">
            {event.description}
          </p>
        )}

        <div className="space-y-2 text-charcoal">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-steel-blue" />
            <span className="text-sm sm:text-base">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-steel-blue" />
            <span className="text-sm sm:text-base">{formatTime(event.time)}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-steel-blue" />
            <span className="text-sm sm:text-base">{event.location}</span>
          </div>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal transition-colors"
        >
          View All Events
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default AlternatingHero