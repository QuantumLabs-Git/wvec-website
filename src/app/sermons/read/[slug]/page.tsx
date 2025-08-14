'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function WrittenSermonPage({ params }: PageProps) {
  const [slug, setSlug] = React.useState<string>('')
  
  React.useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [])
  
  // This is a placeholder - in production, you would fetch the sermon data
  const sermon = {
    id: slug,
    title: 'Sermon Title',
    speaker: 'Pastor',
    date: new Date().toISOString().split('T')[0],
    scripture: 'Scripture Reference',
    content: 'This sermon transcript is being prepared for publication.'
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
              href="/sermons/read" 
              className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Written Sermons
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
                <BookOpen className="w-4 h-4" />
                <span>Written Sermon</span>
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
            {/* Sermon Content */}
            <div className="glass-effect rounded-xl p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/70">
                  {sermon.content}
                </p>
              </div>
            </div>

            {/* Access Information */}
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                Full Sermon Text
              </h3>
              <p className="text-charcoal/70 mb-4">
                Complete sermon transcripts are being added to our website. To access this sermon:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 mb-6">
                <li>Contact the church office for a printed copy</li>
                <li>Request the sermon notes via email</li>
                <li>Visit us during service times</li>
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