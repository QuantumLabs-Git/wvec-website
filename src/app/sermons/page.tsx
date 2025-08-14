'use client'

import { motion } from 'framer-motion'
import { Mic, BookOpen, Book } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SermonsPage() {
  const sermonCategories = [
    {
      title: 'Listen',
      description: 'Audio sermons and messages from our services',
      icon: Mic,
      href: '/sermons/listen',
      color: 'from-steel-blue/20 to-cyber-teal/20',
    },
    {
      title: 'Read',
      description: 'Written sermons and transcripts for study',
      icon: BookOpen,
      href: '/sermons/read',
      color: 'from-sage/30 to-champagne/20',
    },
    {
      title: "Lord's Day Bible Readings",
      description: 'Weekly scripture readings for the Lord\'s Day',
      icon: Book,
      href: '/sermons/lords-day-bible-readings',
      color: 'from-champagne/20 to-sage/20',
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
              Sermons
            </h1>
            <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">
              "Preach the word; be instant in season, out of season; reprove, rebuke, exhort with all longsuffering and doctrine." - 2 Timothy 4:2
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sermon Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sermonCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={category.href}>
                    <div className="glass-effect rounded-2xl p-8 h-full hover:shadow-xl smooth-transition group cursor-pointer">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition`}>
                        <Icon className="w-10 h-10 text-charcoal" />
                      </div>
                      <h2 className="text-2xl font-semibold text-charcoal mb-3">
                        {category.title}
                      </h2>
                      <p className="text-charcoal/70 mb-6">
                        {category.description}
                      </p>
                      <div className="text-steel-blue font-medium group-hover:text-cyber-teal smooth-transition">
                        Browse →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Sermons Archive Links */}
      <section className="py-20 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-charcoal mb-4">
              Sermon Archives
            </h2>
            <p className="text-charcoal/70">
              Browse our collection of sermons by year
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {['2023', '2022', '2021'].map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/sermons/archive/${year}`}>
                  <div className="glass-effect rounded-xl p-6 text-center hover:shadow-lg smooth-transition group cursor-pointer">
                    <h3 className="text-2xl font-semibold text-charcoal group-hover:text-steel-blue smooth-transition">
                      {year}
                    </h3>
                    <p className="text-charcoal/60 mt-2">Sermons Archive</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}