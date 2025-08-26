'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLiveStream } from '@/contexts/LiveStreamContext'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([])
  const { isLive } = useLiveStream()

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
        setMobileDropdowns([])
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'EVENTS', href: '/events' },
    // { name: 'WVGM-4', href: '/wvgm-4' }, // Temporarily hidden - can be restored later
    { name: 'BIBLE', href: '/bible' },
    {
      name: 'ABOUT US',
      href: '/about',
      dropdown: [
        { name: 'What We Believe', href: '/about/what-we-believe' },
        { name: 'Church Covenant', href: '/about/church-covenant' },
        { name: 'Church History', href: '/about/church-history' },
      ],
    },
    {
      name: 'SERMONS',
      href: '/sermons',
      dropdown: [
        { name: "Lord's Day Bible Readings", href: '/sermons/lords-day-bible-readings' },
        { name: 'Listen', href: '/sermons/listen' },
        { name: 'Read', href: '/sermons/read' },
      ],
    },
    { name: 'BIBLE STUDIES', href: '/bible-studies' },
    { name: 'ARTICLES', href: '/articles' },
    {
      name: 'MORE',
      href: '#',
      dropdown: [
        { name: 'Service Times', href: '/service-times' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Safeguarding', href: '/safeguarding' },
      ],
    },
  ]

  return (
    <nav className="fixed w-full z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="WVEC Logo"
                  width={40}
                  height={40}
                  className="smooth-transition hover:scale-105 sm:w-[50px] sm:h-[50px]"
                />
                {/* Live Stream Indicator */}
                {isLive && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -inset-1 sm:-inset-1.5"
                    >
                      <div className="w-full h-full rounded-full border-2 border-red-600"></div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-lg"
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span>LIVE</span>
                    </motion.div>
                  </>
                )}
              </div>
              <span className="font-serif text-lg sm:text-xl text-white hidden xs:block">
                WVEC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-white hover:text-champagne smooth-transition font-medium"
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-white/10"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 smooth-transition"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 -mr-2 text-white hover:text-champagne smooth-transition touch-manipulation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              type="button"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 sm:top-20 lg:hidden bg-black/95 backdrop-blur-lg overflow-y-auto z-40"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 rounded-lg smooth-transition font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={`w-5 h-5 smooth-transition ${
                          mobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg smooth-transition font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                  <AnimatePresence>
                    {item.dropdown && mobileDropdowns.includes(item.name) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 pr-4 py-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg smooth-transition"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation