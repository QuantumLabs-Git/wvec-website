import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, Youtube, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-ivory to-sage/20 border-t border-sage/30">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Church Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
              <Image
                src="/images/logo.png"
                alt="WVEC Logo"
                width={40}
                height={40}
                className="w-12 h-12 sm:w-10 sm:h-10"
              />
              <h3 className="font-serif text-lg sm:text-xl text-charcoal text-center sm:text-left">
                Whiddon Valley Evangelical Church
              </h3>
            </div>
            <p className="text-charcoal/70 text-sm italic max-w-sm mx-auto sm:mx-0">
              "Grace and peace be multiplied unto you through the knowledge of God, and of Jesus our Lord" - 2 Peter 1:2
            </p>
          </div>

          {/* Address */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-charcoal uppercase tracking-wider text-sm">
              ADDRESS
            </h4>
            <address className="not-italic text-charcoal/70 text-sm sm:text-base space-y-1">
              <p>Whiddon Valley Evangelical Church</p>
              <p>Stoat Park</p>
              <p>Whiddon Valley</p>
              <p>BARNSTAPLE</p>
              <p>Devon</p>
              <p>England</p>
              <p>EX32 8PT</p>
            </address>
            <a
              href="https://maps.apple.com/?q=Whiddon+Valley+Evangelical+Church+Stoat+Park+Barnstaple+Devon+EX32+8PT"
              className="inline-flex items-center justify-center sm:justify-start space-x-2 text-steel-blue hover:text-cyber-teal smooth-transition"
            >
              <MapPin className="w-4 h-4" />
              <span>Find Us</span>
            </a>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4 text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-charcoal uppercase tracking-wider text-sm">
              CONNECT
            </h4>
            <div className="space-y-2">
              <a
                href="tel:+447504925423"
                className="flex items-center justify-center sm:justify-start space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">+44 (0)7504 925423</span>
              </a>
              <a
                href="mailto:wvec.office@gmail.com"
                className="flex items-center justify-center sm:justify-start space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">wvec.office@gmail.com</span>
              </a>
            </div>
            <div className="flex justify-center sm:justify-start space-x-4 pt-4">
              <a
                href="https://www.youtube.com/@WhiddonValleyEvangelicalChurch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/70 hover:text-steel-blue smooth-transition p-2"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-charcoal/70 hover:text-steel-blue smooth-transition p-2"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/whiddonvalley/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/70 hover:text-steel-blue smooth-transition p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage/30">
          <p className="text-center text-charcoal/60 text-sm">
            &copy; {new Date().getFullYear()} Whiddon Valley Evangelical Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer