import { motion } from 'framer-motion'
import { Calendar, BookOpen, ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { migratedBibleStudies, getBibleStudiesByCategory } from '@/lib/content-migration'

interface PageProps {
  params: {
    slug: string
  }
}

export default function BibleStudyPage({ params }: PageProps) {
  // Find the Bible study by matching the href
  const study = migratedBibleStudies.find(s => 
    s.href === `/bible-studies/${params.slug}` || 
    s.id === params.slug
  )

  if (!study) {
    notFound()
  }

  // Get related studies
  const relatedStudies = getBibleStudiesByCategory(study.category)
    .filter(s => s.id !== study.id)
    .slice(0, 4)

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
              href="/bible-studies" 
              className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Bible Studies
            </Link>

            {/* Study Header */}
            <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-6">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-charcoal/60">
              {study.book && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Book of {study.book}</span>
                </div>
              )}
              {study.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{study.year}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="capitalize">{study.category} Study</span>
              </div>
            </div>

            {study.description && (
              <p className="mt-4 text-lg text-charcoal/70">
                {study.description}
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
            {/* Content Notice */}
            <div className="glass-effect rounded-xl p-8 mb-12">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Bible Study Materials
              </h2>
              <p className="text-charcoal/70 mb-6">
                This Bible study was part of our teaching ministry. The full study materials are being 
                prepared for our new website. In the meantime:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sage/10 rounded-lg p-6">
                  <h3 className="font-semibold text-charcoal mb-3">Join Us</h3>
                  <p className="text-charcoal/70 text-sm mb-4">
                    Bible studies are held on Thursday mornings at 10:30 AM. All are welcome to join us 
                    as we study God's Word together.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                  >
                    Get Directions →
                  </Link>
                </div>
                
                <div className="bg-champagne/20 rounded-lg p-6">
                  <h3 className="font-semibold text-charcoal mb-3">Study Materials</h3>
                  <p className="text-charcoal/70 text-sm mb-4">
                    For copies of study notes or recordings, please contact the church office.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>
            </div>

            {/* Study Information */}
            {study.category === 'book' && (
              <div className="glass-effect rounded-xl p-8 mb-12">
                <h3 className="text-xl font-semibold text-charcoal mb-4">
                  About This Book Study
                </h3>
                <p className="text-charcoal/70">
                  Our book studies involve systematic exposition through biblical books, 
                  examining each passage in its context and applying God's truth to our lives today.
                </p>
              </div>
            )}

            {study.category === 'topical' && (
              <div className="glass-effect rounded-xl p-8 mb-12">
                <h3 className="text-xl font-semibold text-charcoal mb-4">
                  About This Topical Study
                </h3>
                <p className="text-charcoal/70">
                  This topical study explores biblical themes across Scripture, helping us understand 
                  God's truth on important subjects for Christian faith and practice.
                </p>
              </div>
            )}

            {/* Related Studies */}
            {relatedStudies.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-charcoal mb-6">
                  Related Bible Studies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedStudies.map(related => (
                    <Link
                      key={related.id}
                      href={related.href}
                      className="glass-effect rounded-lg p-4 hover:shadow-md smooth-transition"
                    >
                      <h4 className="font-medium text-charcoal hover:text-steel-blue smooth-transition">
                        {related.title}
                      </h4>
                      {related.description && (
                        <p className="text-sm text-charcoal/60 mt-1">
                          {related.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Generate static params for all Bible studies
export async function generateStaticParams() {
  return migratedBibleStudies.map((study) => ({
    slug: study.href.replace('/bible-studies/', '')
  }))
}