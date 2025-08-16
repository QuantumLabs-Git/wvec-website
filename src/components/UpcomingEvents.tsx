'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description?: string
  category?: string
  is_published?: boolean
  image?: string
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/public/events')
      if (response.ok) {
        const data = await response.json()
        // Get only the next 3 upcoming events
        const upcomingEvents = data.events
          .filter((event: Event) => new Date(event.date) >= new Date())
          .slice(0, 3)
        setEvents(upcomingEvents)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-3 sm:mb-4">
            Upcoming Events
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            Join us for worship, fellowship, and growth
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-champagne border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60">Loading events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">No upcoming events at the moment.</p>
            <p className="text-sm text-white/40 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg smooth-transition group"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-black to-white/10">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 smooth-transition"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src="/images/logo.png"
                      alt="WVEC Logo"
                      width={60}
                      height={60}
                      className="opacity-30 sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                    />
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3">
                  {event.title}
                </h3>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
                  <div className="flex items-start sm:items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="line-clamp-2">{format(new Date(event.date), 'EEEE, d MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4 line-clamp-2">
                  {event.description}
                </p>
                <button className="text-sm sm:text-base text-champagne hover:text-champagne/80 smooth-transition font-medium">
                  Add to Calendar
                </button>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 bg-champagne text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-champagne/80 smooth-transition text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View All Events</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default UpcomingEvents