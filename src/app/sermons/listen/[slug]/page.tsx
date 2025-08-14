'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mic, Calendar, User, Download } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function AudioSermonPage({ params }: PageProps) {
  // This is a placeholder - in production, you would fetch the sermon data
  const sermon = {
    id: params.slug,
    title: 'Sermon Audio',
    speaker: 'Pastor',
    date: new Date().toISOString().split('T')[0],
    scripture: 'Scripture Reference',
    description: 'This sermon is being prepared for online listening.'
  }

  if (!sermon) {
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
              href="/sermons/listen" 
              className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Audio Sermons
            </Link>

            {/* Sermon Header */}
            <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-6">
              {sermon.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-charcoal/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{sermon.speaker}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(sermon.date).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>Audio Sermon</span>
              </div>
            </div>

            {sermon.scripture && (
              <p className="mt-4 text-lg text-steel-blue font-medium">
                {sermon.scripture}
              </p>
            )}
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
          >
            {/* Audio Player Placeholder */}
            <div className="glass-effect rounded-xl p-8 mb-12">
              <div className="flex items-center justify-center h-32 bg-charcoal/5 rounded-lg mb-6">
                <Mic className="w-16 h-16 text-charcoal/20" />
              </div>
              
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Audio Coming Soon
              </h2>
              <p className="text-charcoal/70 mb-6">
                {sermon.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal/10 text-charcoal/50 rounded-lg cursor-not-allowed"
                >
                  <Mic className="w-5 h-5" />
                  Play Audio
                </button>
                <button 
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal/10 text-charcoal/50 rounded-lg cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  Download MP3
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                Access Sermon Recordings
              </h3>
              <p className="text-charcoal/70 mb-4">
                Our sermon audio archive is being digitized and uploaded. For immediate access to this sermon:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 mb-6">
                <li>Contact the church office for audio files</li>
                <li>Visit our YouTube channel for recent sermons</li>
                <li>Join us in person for live services</li>
              </ul>
              <Link 
                href="/contact" 
                className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
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