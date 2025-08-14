'use client'

import { motion } from 'framer-motion'
import { Book, Calendar, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BibleReading {
  id: string
  title: string
  date: string
  morningReading: string
  morningChapter: string
  eveningReading: string
  eveningChapter: string
  notes?: string
  href: string
}

// Placeholder readings - these would come from your CMS or database
const readings: BibleReading[] = [
  {
    id: '1',
    title: 'Lord\'s Day - March 17, 2024',
    date: '2024-03-17',
    morningReading: 'Psalm 23',
    morningChapter: 'The Shepherd Psalm',
    eveningReading: 'John 10:1-18',
    eveningChapter: 'The Good Shepherd',
    notes: 'Meditations on Christ as our Shepherd',
    href: '/sermons/lords-day-readings/2024-03-17'
  },
  {
    id: '2',
    title: 'Lord\'s Day - March 10, 2024',
    date: '2024-03-10',
    morningReading: 'Isaiah 53',
    morningChapter: 'The Suffering Servant',
    eveningReading: '1 Peter 2:21-25',
    eveningChapter: 'Following Christ\'s Example',
    notes: 'The substitutionary work of Christ',
    href: '/sermons/lords-day-readings/2024-03-10'
  },
  {
    id: '3',
    title: 'Lord\'s Day - March 3, 2024',
    date: '2024-03-03',
    morningReading: 'Romans 8:28-39',
    morningChapter: 'God\'s Sovereign Purpose',
    eveningReading: 'Ephesians 1:3-14',
    eveningChapter: 'Spiritual Blessings in Christ',
    notes: 'The security of the believer',
    href: '/sermons/lords-day-readings/2024-03-03'
  },
  {
    id: '4',
    title: 'Lord\'s Day - February 25, 2024',
    date: '2024-02-25',
    morningReading: 'Hebrews 11:1-16',
    morningChapter: 'The Nature of Faith',
    eveningReading: 'James 2:14-26',
    eveningChapter: 'Faith and Works',
    notes: 'Understanding biblical faith',
    href: '/sermons/lords-day-readings/2024-02-25'
  }
]

export default function LordsDayReadingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  // Get available years from readings
  const availableYears = Array.from(
    new Set(readings.map(r => new Date(r.date).getFullYear()))
  ).sort((a, b) => b - a)

  const filteredReadings = readings.filter(reading => {
    const matchesSearch = reading.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.morningReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.eveningReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.morningChapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.eveningChapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (reading.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesYear = new Date(reading.date).getFullYear() === selectedYear
    return matchesSearch && matchesYear
  })

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
              Lord's Day Bible Readings
            </h1>
            <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">
              Selected Scripture readings for morning and evening worship on the Lord's Day
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-sage/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search readings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm text-charcoal/60">Year:</span>
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full smooth-transition ${
                    selectedYear === year
                      ? 'bg-steel-blue text-white'
                      : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Readings Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {filteredReadings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Book className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <p className="text-charcoal/50 text-lg">No readings found for this period</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredReadings.map((reading, index) => (
                <motion.article
                  key={reading.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8 hover:shadow-xl smooth-transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-charcoal">
                      {reading.title}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-charcoal/60">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(reading.date).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Morning Reading */}
                    <div className="border-l-4 border-steel-blue pl-4">
                      <h3 className="font-medium text-charcoal mb-1">Morning Reading</h3>
                      <p className="text-steel-blue font-semibold">{reading.morningReading}</p>
                      <p className="text-charcoal/60 text-sm">{reading.morningChapter}</p>
                    </div>

                    {/* Evening Reading */}
                    <div className="border-l-4 border-cyber-teal pl-4">
                      <h3 className="font-medium text-charcoal mb-1">Evening Reading</h3>
                      <p className="text-cyber-teal font-semibold">{reading.eveningReading}</p>
                      <p className="text-charcoal/60 text-sm">{reading.eveningChapter}</p>
                    </div>

                    {/* Notes */}
                    {reading.notes && (
                      <div className="bg-sage/10 rounded-lg p-4">
                        <p className="text-charcoal/70 text-sm italic">
                          <FileText className="w-4 h-4 inline mr-1" />
                          {reading.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={reading.href}
                      className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                    >
                      View Details →
                    </Link>
                    <button className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal smooth-transition">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reading Plan Info */}
      <section className="py-12 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              About Lord's Day Bible Readings
            </h3>
            <p className="text-charcoal/70 mb-4">
              These selected readings are designed to complement our Lord's Day worship services. 
              The morning readings prepare our hearts for worship, while the evening readings 
              provide meditation for the close of the Lord's Day.
            </p>
            <p className="text-charcoal/70">
              Printed copies are available at the church entrance each Lord's Day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back to Sermons */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/sermons"
            className="text-steel-blue hover:text-cyber-teal smooth-transition"
          >
            ← Back to all sermons
          </Link>
        </div>
      </section>
    </div>
  )
}