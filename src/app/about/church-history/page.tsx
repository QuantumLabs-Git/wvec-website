'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, History, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ChurchHistoryPage() {
  const milestones = [
    { year: '1890', event: 'Work commenced as the Rackfield Welcome Mission' },
    { year: '1926', event: 'Mr W. H. Stanger passed away after leading the Mission' },
    { year: '1949', event: 'Mrs Stanger passed away after continuing the work' },
    { year: '1974', event: 'Mr Stanley F. Dawe appointed Superintendent' },
    { year: '1986', event: 'Rackfield building compulsorily purchased' },
    { year: '1987', event: 'Whiddon Valley Evangelical Church opened on 15th August' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/about"
            className="inline-flex items-center space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to About</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Church History
            </h1>
            <p className="text-charcoal/70 text-lg">
              A legacy of faith spanning over a century
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-12 mb-12"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-champagne/30 to-sage/30 rounded-full flex items-center justify-center">
                <History className="w-10 h-10 text-charcoal" />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-charcoal text-center mb-8">
              A BRIEF HISTORY OF THE CHURCH
            </h2>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-charcoal/80 leading-relaxed">
                WHIDDON VALLEY EVANGELICAL CHURCH was opened on 15th August 1987. The church 
                was formerly known as Rackfield Mission and was situated at Rackfield 
                off Boutport Street.
              </p>
              
              <p className="text-charcoal/80 leading-relaxed">
                The work commenced in about 1890 as the Rackfield Welcome Mission. It appears 
                that the Stangers and the Bowdens were together responsible for the beginning 
                of the work. Mr W. H. Stanger was leader of the Mission until his death in 1926 
                when Mrs Stanger carried on the work until her death in 1949.
              </p>
              
              <p className="text-charcoal/80 leading-relaxed">
                The work was then led by Mr John Ovey until Mr Stanley F. Dawe was appointed 
                Superintendent in June 1974 under the auspices of the FIEC Home Missions. He 
                later became Minister.
              </p>
              
              <p className="text-charcoal/80 leading-relaxed">
                The work at Rackfield came to an end on 9th February 1986 when the building 
                was compulsorily purchased by the Devon County Council in order to build a new 
                road. The church met temporarily at the Forches and Whiddon Valley Community 
                Centre until the new building at Whiddon Valley was ready for occupation.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-serif text-charcoal text-center mb-8">
              Key Milestones
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-charcoal/20" />
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative z-10 w-16 h-16 bg-steel-blue text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="glass-effect rounded-xl p-4 flex-1">
                      <p className="text-charcoal/80">
                        <span className="font-semibold">{milestone.year}:</span> {milestone.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scripture Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-charcoal/60 italic">
              "One generation shall praise thy works to another, and shall declare thy mighty acts."
              <span className="block mt-2 not-italic">- Psalm 145:4</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}