'use client'

import { motion } from 'framer-motion'
import { Clock, Calendar, Users, Heart, AlertCircle } from 'lucide-react'

export default function ServiceTimesPage() {
  const schedule = [
    {
      day: 'Sunday',
      icon: Heart,
      color: 'from-steel-blue/20 to-cyber-teal/20',
      services: [
        { time: '10:30 AM', title: 'Prayer Meeting' },
        { time: '11:00 AM', title: 'Worship Service' },
        { time: '3:00 - 4:00 PM', title: 'Bible Class', note: 'Age 14+' },
        { time: '3:00 - 4:00 PM', title: 'Sunday School', note: 'Age 4+' },
        { time: '6:30 PM', title: 'Worship Service' },
      ]
    },
    {
      day: 'Monday',
      icon: Users,
      color: 'from-sage/30 to-champagne/20',
      services: [
        { time: '6:00 PM', title: 'The One Way Bible Club', note: 'Age 4+' },
      ]
    },
    {
      day: 'Tuesday',
      icon: Clock,
      color: 'from-champagne/20 to-sage/20',
      services: [
        { time: '7:30 PM', title: 'Prayer Meeting', note: 'Please note 3 times a year we have a Church members\' only meeting' },
      ]
    },
    {
      day: 'Thursday',
      icon: Calendar,
      color: 'from-steel-blue/20 to-sage/20',
      services: [
        { time: '10:30 AM', title: 'Bible Study' },
        { time: '7:00 PM', title: 'Seekers', note: 'Age 10+ (by invitation - term time only)' },
      ]
    },
  ]

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
              Service Times
            </h1>
            <p className="text-charcoal/70 text-lg">
              Join us for worship, fellowship, and spiritual growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {schedule.map((day, index) => {
              const Icon = day.icon
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-charcoal" />
                    </div>
                    <h2 className="text-2xl font-semibold text-charcoal">
                      {day.day}
                    </h2>
                  </div>

                  <div className="space-y-4 ml-20">
                    {day.services.map((service, serviceIndex) => (
                      <motion.div
                        key={serviceIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (index * 0.1) + (serviceIndex * 0.05) }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-sage/20 last:border-0"
                      >
                        <div className="flex items-start sm:items-center space-x-4">
                          <span className="text-steel-blue font-semibold min-w-[120px]">
                            {service.time}
                          </span>
                          <div>
                            <span className="text-charcoal font-medium">
                              {service.title}
                            </span>
                            {service.note && (
                              <p className="text-charcoal/60 text-sm mt-1">
                                {service.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-steel-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Please Note
                </h3>
                <p className="text-charcoal/70">
                  The Church operates a Child Protection Policy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}