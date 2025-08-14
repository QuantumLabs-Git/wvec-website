'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Calendar from 'react-calendar'
import { format, addMonths, subMonths } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react'
import Image from 'next/image'
import 'react-calendar/dist/Calendar.css'

interface Event {
  id: string
  title: string
  date: Date
  time: string
  location: string
  description: string
  image?: string
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Easter Sunday Service',
    date: new Date('2024-03-31'),
    time: '11:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for a special Easter celebration service with communion and baptism',
  },
  {
    id: '2',
    title: 'Good Friday Service',
    date: new Date('2024-03-29'),
    time: '7:00 PM',
    location: 'Main Sanctuary',
    description: 'A solemn service of reflection on the cross',
  },
  {
    id: '3',
    title: 'Youth Bible Study',
    date: new Date('2024-04-05'),
    time: '7:00 PM',
    location: 'Youth Hall',
    description: 'Weekly study for ages 14-18 exploring the book of Romans',
  },
]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const monthEvents = mockEvents.filter(event => 
    event.date.getMonth() === currentMonth.getMonth() &&
    event.date.getFullYear() === currentMonth.getFullYear()
  )

  const addToCalendar = (event: Event) => {
    const startDate = new Date(event.date)
    const endDate = new Date(event.date)
    endDate.setHours(endDate.getHours() + 2)

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.title.replace(/\s+/g, '-')}.ics`
    link.click()
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal mb-3 sm:mb-4">
              Church Events
            </h1>
            <p className="text-charcoal/70 text-base sm:text-lg">
              Join us for worship, fellowship, and spiritual growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Month Navigation */}
      <section className="bg-white py-6 sm:py-8 border-b border-sage/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="flex items-center space-x-1 sm:space-x-2 text-charcoal hover:text-steel-blue smooth-transition text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Previous Month</span>
              <span className="sm:hidden">Prev</span>
            </button>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-charcoal px-2 text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={handleNextMonth}
              className="flex items-center space-x-1 sm:space-x-2 text-charcoal hover:text-steel-blue smooth-transition text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Next Month</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {monthEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-20"
            >
              <CalendarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-charcoal/20 mx-auto mb-3 sm:mb-4" />
              <p className="text-charcoal/50 text-base sm:text-lg">No events scheduled for this month</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {monthEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg smooth-transition"
                >
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-sage/20 to-steel-blue/20">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
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
                    <h3 className="font-semibold text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-charcoal/70 mb-3 sm:mb-4">
                      <div className="flex items-start sm:items-center space-x-2">
                        <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="line-clamp-2">{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
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
                    <p className="text-xs sm:text-sm text-charcoal/60 mb-4 sm:mb-6">
                      {event.description}
                    </p>
                    <button
                      onClick={() => addToCalendar(event)}
                      className="flex items-center space-x-2 text-steel-blue hover:text-cyber-teal smooth-transition font-medium text-sm sm:text-base"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Add to Calendar</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-charcoal mb-4 sm:mb-6 text-center">
              Calendar View
            </h3>
            <div className="calendar-wrapper">
              <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                activeStartDate={currentMonth}
                tileClassName={({ date }) => {
                  const hasEvent = mockEvents.some(event => 
                    event.date.toDateString() === date.toDateString()
                  )
                  return hasEvent ? 'has-event' : ''
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .react-calendar {
          width: 100%;
          background: transparent;
          border: none;
          font-family: inherit;
        }
        .react-calendar__tile {
          padding: 1em 0.5em;
          background: transparent;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .react-calendar__tile:hover {
          background: rgba(132, 184, 255, 0.1);
        }
        .react-calendar__tile--active {
          background: #84B8FF !important;
          color: white;
        }
        .react-calendar__tile.has-event {
          position: relative;
        }
        .react-calendar__tile.has-event::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #73D2DE;
          border-radius: 50%;
        }
        .react-calendar__navigation button {
          color: #4B4B4B;
          font-size: 1.1em;
        }
      `}</style>
    </div>
  )
}