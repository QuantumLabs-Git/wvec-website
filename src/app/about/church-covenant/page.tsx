'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Heart } from 'lucide-react'
import Link from 'next/link'

export default function ChurchCovenantPage() {
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
              Church Covenant
            </h1>
            <p className="text-charcoal/70 text-lg">
              Our sacred commitment to God and one another
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
            className="glass-effect rounded-3xl p-12 relative overflow-hidden"
          >
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sage/10 to-champagne/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-sage/30 to-champagne/30 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-charcoal" />
                </div>
              </div>

              <h2 className="text-2xl font-serif text-charcoal text-center mb-8">
                THE CHURCH COVENANT
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/80 leading-relaxed text-justify">
                  In the name of our Lord Jesus Christ, and in obedience to His revealed will, 
                  we covenant together to give ourselves solemnly and prayerfully to the Lord 
                  and to each other, relying entirely upon the grace of God, the precious blood 
                  and righteousness of our Lord and Saviour Jesus Christ, the gracious assistance 
                  of the Holy Spirit and the infallible Word of God.
                </p>
                
                <p className="text-charcoal/80 leading-relaxed text-justify mt-6">
                  We resolve to walk together in the holiness of life, taking the Holy Scriptures 
                  as our sole rule in faith, worship, and practice, promising to uphold the doctrine 
                  and to obey the laws of God's house, binding ourselves to love one another and to 
                  seek each other's good, always striving for peace.
                </p>
                
                <p className="text-charcoal/80 leading-relaxed text-justify mt-6">
                  We determine to hold fast to the faithful Word, to declare all the counsel of God, 
                  and to stand fast in the Faith.
                </p>
                
                <p className="text-charcoal/80 leading-relaxed text-justify mt-6">
                  We fervently pray that God will grant us his blessing as we unite as a Christian 
                  church under our great head, the Lord Jesus Christ.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scripture Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-charcoal/60 italic">
              "And let us consider one another to provoke unto love and to good works: 
              Not forsaking the assembling of ourselves together, as the manner of some is; 
              but exhorting one another: and so much the more, as ye see the day approaching."
              <span className="block mt-2 not-italic">- Hebrews 10:24-25</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}