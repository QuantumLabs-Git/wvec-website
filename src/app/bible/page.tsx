'use client'

import { motion } from 'framer-motion'
import { BookOpen, ExternalLink } from 'lucide-react'

export default function BiblePage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-ivory via-white to-sage/10">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            The Word of God
          </h1>
          <p className="text-charcoal/70 text-lg">
            "Thy word is a lamp unto my feet, and a light unto my path." - Psalm 119:105
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="glass-effect rounded-3xl p-12 text-center hover:shadow-2xl smooth-transition group">
            <div className="mb-8">
              <BookOpen className="w-24 h-24 text-steel-blue mx-auto mb-6 group-hover:scale-110 smooth-transition" />
            </div>
            
            <h2 className="text-3xl font-serif text-charcoal mb-6">
              Read The Bible
            </h2>
            
            <p className="text-charcoal/70 mb-8 max-w-2xl mx-auto">
              Access the complete King James Bible online. Study God's Word with ease using powerful search and reference tools.
            </p>

            <a
              href="https://thekingsbible.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-steel-blue text-white px-8 py-4 rounded-full hover:bg-cyber-teal smooth-transition text-lg font-medium group"
            >
              <span>Open The King's Bible</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
            </a>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 bg-sage/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-steel-blue/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-charcoal/60 italic">
            "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness."
            <span className="block mt-2 not-italic">- 2 Timothy 3:16</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}