'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, Users, FileText, Layers } from 'lucide-react'
import Link from 'next/link'
import { migratedBibleStudies, getBibleStudiesByCategory } from '@/lib/content-migration'

interface StudyCategory {
  title: string
  studies: StudyItem[]
  icon: any
}

interface StudyItem {
  title: string
  href: string
  description?: string
}

// Get all unique series categories
const allStudies = migratedBibleStudies
const seriesCategories = Array.from(new Set(allStudies.filter(s => 
  s.category !== 'book' && 
  s.category !== 'topical' && 
  s.category !== 'annual' && 
  s.category !== 'special'
).map(s => s.category)))

// Group studies by series
const studySeries = seriesCategories.map(category => ({
  name: category,
  studies: allStudies.filter(s => s.category === category).map(study => ({
    title: study.title,
    href: study.href,
    description: study.excerpt || study.description
  }))
}))

// Combine existing studies with migrated content
const bookStudies = getBibleStudiesByCategory('book').map(study => ({
  title: study.title,
  href: study.href,
  description: study.description
}))

const topicalStudies = getBibleStudiesByCategory('topical').map(study => ({
  title: study.title,
  href: study.href,
  description: study.description
}))

const studyCategories: StudyCategory[] = [
  {
    title: 'Annual Bible Studies',
    icon: Calendar,
    studies: [
      { title: 'Bible Studies 2023', href: '/bible-studies/2023', description: 'Studies from the year 2023' },
      { title: 'Bible Studies 2022', href: '/bible-studies/2022', description: 'Studies from the year 2022' },
      { title: 'Bible Studies 2021', href: '/bible-studies/2021', description: 'Studies from the year 2021' },
    ]
  },
  {
    title: 'Study Series',
    icon: Layers,
    studies: studySeries.flatMap(series => series.studies)
  },
  {
    title: 'Book Studies',
    icon: BookOpen,
    studies: bookStudies.sort((a, b) => a.title.localeCompare(b.title))
  },
  {
    title: 'Topical Studies',
    icon: FileText,
    studies: topicalStudies.sort((a, b) => a.title.localeCompare(b.title))
  },
  {
    title: 'Special Series',
    icon: Users,
    studies: [
      { title: 'Adoniram Judson', href: '/bible-studies/adoniram-judson', description: 'Life of the missionary' },
      { title: 'During the Covid-19', href: '/bible-studies/covid-19', description: 'Studies during the pandemic' },
      { title: 'Occasional Studies', href: '/bible-studies/occasional', description: 'Various occasional studies' },
      { title: 'Pastoral Epistles', href: '/bible-studies/pastoral-epistles', description: 'Timothy and Titus' },
    ]
  }
]

export default function BibleStudiesPage() {
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
              Bible Studies
            </h1>
            <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">
              "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, 
              rightly dividing the word of truth." - 2 Timothy 2:15
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bible Studies Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-16">
            {studyCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-steel-blue/20 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-steel-blue" />
                    </div>
                    <h2 className="text-2xl font-semibold text-charcoal">
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.studies.map((study, studyIndex) => (
                      <motion.div
                        key={study.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (categoryIndex * 0.1) + (studyIndex * 0.05) }}
                      >
                        <Link href={study.href}>
                          <div className="glass-effect rounded-xl p-6 h-full hover:shadow-xl smooth-transition group cursor-pointer">
                            <h3 className="font-semibold text-lg text-charcoal mb-2 group-hover:text-steel-blue smooth-transition">
                              {study.title}
                            </h3>
                            {study.description && (
                              <p className="text-charcoal/60 text-sm">
                                {study.description}
                              </p>
                            )}
                            <div className="mt-4 text-steel-blue font-medium group-hover:text-cyber-teal smooth-transition">
                              View Study →
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Study Information */}
      <section className="py-16 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 text-center"
          >
            <h2 className="text-2xl font-serif text-charcoal mb-6">
              About Our Bible Studies
            </h2>
            <div className="prose prose-lg max-w-none text-charcoal/80">
              <p className="mb-4">
                Our Bible studies are designed to help believers grow in their understanding 
                of God's Word through systematic exposition and practical application.
              </p>
              <p>
                Studies are typically held on Thursday mornings at 10:30 AM. All are welcome 
                to join us as we explore the riches of Scripture together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}