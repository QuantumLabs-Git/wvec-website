'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, Calendar, FileText, Download, Printer } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    date: string
  }>
}

export default function LordsDayReadingPage({ params }: PageProps) {
  const [date, setDate] = React.useState<string>('')
  
  React.useEffect(() => {
    params.then(p => setDate(p.date))
  }, [])
  
  // This is a placeholder - in production, you would fetch the reading data
  const reading = {
    date: date,
    title: `Lord's Day Bible Reading - ${date}`,
    morningReading: 'Morning Scripture Reference',
    morningChapter: 'Morning Chapter Title',
    morningText: 'The morning reading text will be displayed here...',
    eveningReading: 'Evening Scripture Reference',
    eveningChapter: 'Evening Chapter Title',
    eveningText: 'The evening reading text will be displayed here...',
    notes: 'Additional notes and meditation thoughts for the Lord\'s Day'
  }

  if (!reading) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Link */}
            <Link 
              href="/sermons/lords-day-bible-readings" 
              className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Lord's Day Readings
            </Link>

            {/* Reading Header */}
            <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-6">
              {reading.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-charcoal/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(reading.date).toLocaleDateString('en-GB', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                <span>Bible Reading</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-steel-blue text-white rounded-lg hover:bg-steel-blue/90 smooth-transition">
                <Printer className="w-5 h-5" />
                Print Reading
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-sage/20 text-charcoal rounded-lg hover:bg-sage/30 smooth-transition">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>

            {/* Morning Reading */}
            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-charcoal mb-4">
                Morning Reading
              </h2>
              <div className="border-l-4 border-steel-blue pl-6 mb-6">
                <h3 className="text-xl font-medium text-steel-blue mb-2">
                  {reading.morningReading}
                </h3>
                <p className="text-charcoal/60">
                  {reading.morningChapter}
                </p>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/70">
                  {reading.morningText}
                </p>
              </div>
            </div>

            {/* Evening Reading */}
            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-charcoal mb-4">
                Evening Reading
              </h2>
              <div className="border-l-4 border-cyber-teal pl-6 mb-6">
                <h3 className="text-xl font-medium text-cyber-teal mb-2">
                  {reading.eveningReading}
                </h3>
                <p className="text-charcoal/60">
                  {reading.eveningChapter}
                </p>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/70">
                  {reading.eveningText}
                </p>
              </div>
            </div>

            {/* Notes */}
            {reading.notes && (
              <div className="glass-effect rounded-xl p-8">
                <h2 className="text-xl font-semibold text-charcoal mb-4">
                  <FileText className="w-5 h-5 inline mr-2" />
                  Notes for Meditation
                </h2>
                <p className="text-charcoal/70">
                  {reading.notes}
                </p>
              </div>
            )}

            {/* Access Information */}
            <div className="bg-champagne/20 rounded-xl p-8 text-center">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                Access Complete Readings
              </h3>
              <p className="text-charcoal/70 mb-6">
                Full Lord's Day Bible Readings are available at the church entrance each Sunday. 
                For digital copies or to be added to our mailing list:
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
              >
                Contact Us →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}