'use client'

import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function WhatWeBelievePage() {
  const beliefs = [
    {
      number: 1,
      content: "The full and verbal inspiration of all the Old Testament and New Testament Scriptures as originally given, and of these alone; their being in themselves the Word of God, without error, and wholly reliable in both fact and doctrine, their final authority and perpetual sufficiency in all matters of faith and practice;"
    },
    {
      number: 2,
      content: "The unity of the Godhead and the divine co-equality of the Father, the Son, and the Holy Spirit; the sovereignty of God in creation, providence and redemption;"
    },
    {
      number: 3,
      content: "The total depravity of human nature in consequence of the Fall, and the necessity for regeneration;"
    },
    {
      number: 4,
      content: "The true and proper Deity of our Lord Jesus Christ; His virgin birth; His real and perfect manhood; the authority of His teaching, and the infallibility of all His utterances; His work of atonement for sinners of mankind by His substitutionary sufferings and death; His bodily resurrection and His ascension into heaven; and His present priestly intercession for His people at the right hand of the Father;"
    },
    {
      number: 5,
      content: "The justification of the sinner solely by faith in our Lord and Saviour Jesus Christ;"
    },
    {
      number: 6,
      content: "The work of the Holy Spirit as essential for a true and spiritual understanding of the Scriptures; for regeneration, conversion, and sanctification, and for ministry and worship;"
    },
    {
      number: 7,
      content: "The universal church, the body of which Christ is the Head, embracing all the redeemed, called by God through the Gospel, born of the Spirit and justified by faith; the local church, comprising such believers as the expression of the universal church; and fellowship between such churches, manifesting the unity of the body of Christ;"
    },
    {
      number: 8,
      content: "The ordinances of Baptism and the Lord's Supper as being instituted by our Lord Jesus Christ, but not in baptism as conveying regenerating grace, nor in the Lord's Supper as being a sacrifice for sin nor involving any change in the substance of the bread and wine;"
    },
    {
      number: 9,
      content: "The personal return of the Lord Jesus Christ in glory;"
    },
    {
      number: 10,
      content: "The resurrection of the body, the judgment of the world by our Lord Jesus Christ, with the eternal blessedness of the righteous and the eternal punishment of the wicked."
    }
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
              What We Believe
            </h1>
            <p className="text-charcoal/70 text-lg">
              THE DECLARATION OF FAITH
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-xl text-charcoal mb-8 text-center font-medium">
              We believe in:
            </p>
          </motion.div>

          <div className="space-y-6">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition"
              >
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-12 h-12 bg-steel-blue text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {belief.number}
                  </span>
                  <p className="text-charcoal/80 leading-relaxed">
                    {belief.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}