'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SEOContent() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-ivory">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            Reformed Baptist Church in Barnstaple, North Devon
          </h1>
          <h2 className="text-2xl text-charcoal/80">
            KJV Bible Preaching | Traditional Hymns | 1689 Baptist Confession
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif text-charcoal mb-3">
                Welcome to Whiddon Valley Evangelical Church
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                We are a Reformed Baptist church located in Barnstaple, North Devon, 
                faithfully proclaiming the Gospel of Jesus Christ since 1890. Our church 
                is situated near Stoat Park in the Whiddon Valley area, providing a warm 
                and welcoming environment for all who seek to worship God in spirit and truth.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Our Distinctive Features
              </h3>
              <ul className="space-y-2 text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>KJV Bible exclusively - faithful to God's preserved Word</span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>Expository preaching through entire books of the Bible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>Traditional hymns and psalms with organ accompaniment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>1689 Baptist Confession of Faith</span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>Doctrines of Grace (Reformed theology)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-blue mr-2">✓</span>
                  <span>Cessationist and complementarian positions</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif text-charcoal mb-3">
                Church Services in Barnstaple
              </h3>
              <div className="space-y-4">
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold text-charcoal mb-1">
                    Sunday Morning Worship
                  </h4>
                  <p className="text-charcoal/70">
                    11:00 AM - 12:30 PM<br />
                    KJV Bible expository preaching, traditional worship
                  </p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold text-charcoal mb-1">
                    Sunday Evening Service
                  </h4>
                  <p className="text-charcoal/70">
                    6:30 PM - 8:00 PM<br />
                    Biblical teaching and fellowship
                  </p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold text-charcoal mb-1">
                    Thursday Morning Bible Study
                  </h4>
                  <p className="text-charcoal/70">
                    10:30 AM - 12:00 PM<br />
                    In-depth study of God's Word
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Find Us Near Stoat Park
              </h3>
              <p className="text-charcoal/70 leading-relaxed mb-4">
                Located in the Whiddon Valley area of Barnstaple, our church is easily 
                accessible from all parts of North Devon. We're just off the main road 
                near Stoat Park, with ample free parking available. Whether you're a 
                resident of Barnstaple or visiting Devon, you'll find us conveniently 
                positioned to serve the local community.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
              >
                Get Directions →
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-charcoal mb-4">
              Visitors Welcome to Our Barnstaple Church
            </h3>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              Whether you're searching for a "reformed baptist church near me" in Barnstaple, 
              looking for traditional KJV preaching in North Devon, or seeking a church that 
              holds to the historic Christian faith, we warmly welcome you to join us. Our 
              congregation includes families from across Barnstaple, Braunton, Bideford, 
              South Molton, and the wider North Devon area.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about/what-we-believe"
                className="bg-steel-blue text-white px-6 py-3 rounded-full hover:bg-cyber-teal smooth-transition"
              >
                What We Believe
              </Link>
              <Link
                href="/service-times"
                className="bg-white text-charcoal border-2 border-steel-blue px-6 py-3 rounded-full hover:bg-steel-blue hover:text-white smooth-transition"
              >
                Service Times
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Local Area Keywords Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-charcoal/50">
            Serving Barnstaple, Whiddon Valley, Roundswell, Pilton, Newport, Forches, 
            Sticklepath, Bickington, Fremington, Instow, Yelland, Braunton, Chivenor, 
            Bratton Fleming, Goodleigh, Landkey, Swimbridge, Bishops Tawton, and the 
            wider North Devon community with faithful Reformed Baptist ministry.
          </p>
        </motion.div>
      </div>
    </section>
  )
}