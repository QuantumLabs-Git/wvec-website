'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const ServiceTimes = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-ivory to-champagne/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-steel-blue mr-3" />
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
              THE CHURCH IS OPEN
            </h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
            >
              <span className="text-lg sm:text-xl font-semibold text-steel-blue">11:00am Sunday</span>
              <span className="text-lg sm:text-xl text-charcoal">Morning Service</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
            >
              <span className="text-lg sm:text-xl font-semibold text-steel-blue">6:30pm Sunday</span>
              <span className="text-lg sm:text-xl text-charcoal">Evening Service</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
            >
              <span className="text-lg sm:text-xl font-semibold text-steel-blue">10:30am Thursday</span>
              <span className="text-lg sm:text-xl text-charcoal">Bible Study</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-sage/20"
          >
            <div className="flex items-center justify-center text-charcoal/70">
              <p className="text-sm sm:text-base">
                We would love to welcome you to our services in person
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceTimes