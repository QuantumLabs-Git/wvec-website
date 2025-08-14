'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Heart, History } from 'lucide-react'

export default function AboutPage() {
  const sections = [
    {
      title: 'What We Believe',
      description: 'Our declaration of faith and core biblical convictions',
      icon: BookOpen,
      href: '/about/what-we-believe',
      color: 'from-steel-blue/20 to-cyber-teal/20',
    },
    {
      title: 'Church Covenant',
      description: 'Our commitment to God and to one another as a church family',
      icon: Heart,
      href: '/about/church-covenant',
      color: 'from-sage/30 to-champagne/20',
    },
    {
      title: 'Church History',
      description: 'The story of God\'s faithfulness through our church\'s journey',
      icon: History,
      href: '/about/church-history',
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
              About Us
            </h1>
            <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">
              Learn more about our church, what we believe, and our commitment to proclaiming the Gospel of Jesus Christ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={section.href}
                    className="block h-full"
                  >
                    <div className="glass-effect rounded-2xl p-8 h-full hover:shadow-xl smooth-transition group">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition`}>
                        <Icon className="w-10 h-10 text-charcoal" />
                      </div>
                      <h2 className="text-2xl font-semibold text-charcoal mb-3">
                        {section.title}
                      </h2>
                      <p className="text-charcoal/70">
                        {section.description}
                      </p>
                      <div className="mt-6 text-steel-blue font-medium group-hover:text-cyber-teal smooth-transition">
                        Learn more →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl font-serif text-charcoal mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              To glorify God by proclaiming the Gospel of Jesus Christ, making disciples, 
              and equipping believers to serve God and love one another in accordance with His Word.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}