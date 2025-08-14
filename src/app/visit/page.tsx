import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Car, Phone, Mail, ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Visit Our Reformed Baptist Church | Directions to WVEC Barnstaple | Visitor Information',
  description: 'Planning to visit Whiddon Valley Evangelical Church? Find directions, parking information, service times, and what to expect. Reformed Baptist church near Stoat Park, Barnstaple. KJV preaching, traditional hymns. All visitors welcome.',
  keywords: 'visit church barnstaple, directions wvec, church near stoat park, whiddon valley church location, parking barnstaple church, visitor information reformed baptist, what to expect baptist church, barnstaple church visitors',
  alternates: {
    canonical: 'https://www.wvec.org.uk/visit',
  },
  openGraph: {
    title: 'Visit WVEC - Reformed Baptist Church in Barnstaple',
    description: 'Find us near Stoat Park, Whiddon Valley. Sunday services 11am & 6:30pm. Free parking, wheelchair accessible. All welcome.',
    type: 'website',
  },
}

export default function VisitPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.wvec.org.uk/visit#localbusiness',
    name: 'Whiddon Valley Evangelical Church',
    image: 'https://www.wvec.org.uk/images/church-building.jpg',
    url: 'https://www.wvec.org.uk',
    telephone: '+447504925423',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stoat Park, Whiddon Valley',
      addressLocality: 'Barnstaple',
      addressRegion: 'Devon',
      postalCode: 'EX32 8PT',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0889,
      longitude: -4.0726
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '11:00',
        closes: '12:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '18:30',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '10:30',
        closes: '12:00'
      }
    ],
    priceRange: 'Free',
    paymentAccepted: 'Free Entry - Donations Welcome'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-b from-ivory to-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition mb-8"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
                Visit Our Church in Barnstaple
              </h1>
              <p className="text-xl text-charcoal/70">
                We warmly welcome all visitors to Whiddon Valley Evangelical Church
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Location & Directions */}
              <div className="space-y-8">
                <div className="glass-effect rounded-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-steel-blue/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-steel-blue" />
                    </div>
                    <h2 className="text-2xl font-serif text-charcoal">Find Us Near Stoat Park</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Our Address</h3>
                      <p className="text-charcoal/70">
                        Whiddon Valley Evangelical Church<br />
                        Stoat Park, Whiddon Valley<br />
                        Barnstaple, Devon<br />
                        EX32 8PT
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Directions from Barnstaple Town Centre</h3>
                      <ol className="space-y-2 text-charcoal/70">
                        <li>1. Head north on the A361 towards Braunton</li>
                        <li>2. At the Whiddon Valley roundabout, take the 2nd exit</li>
                        <li>3. Turn right into Stoat Park</li>
                        <li>4. The church is on your left with clear signage</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Nearby Landmarks</h3>
                      <ul className="space-y-1 text-charcoal/70">
                        <li>• 5 minutes from Barnstaple town centre</li>
                        <li>• Near Whiddon Valley Community Centre</li>
                        <li>• Close to Forches Corner</li>
                        <li>• Adjacent to Stoat Park residential area</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-sage" />
                    </div>
                    <h2 className="text-2xl font-serif text-charcoal">Parking & Accessibility</h2>
                  </div>
                  
                  <div className="space-y-4 text-charcoal/70">
                    <p>
                      <strong className="text-charcoal">Free Parking:</strong> Ample parking spaces 
                      available on-site for all visitors. No time restrictions during services.
                    </p>
                    <p>
                      <strong className="text-charcoal">Wheelchair Access:</strong> Full wheelchair 
                      accessibility with ramp access to the main entrance and accessible facilities.
                    </p>
                    <p>
                      <strong className="text-charcoal">Public Transport:</strong> Several bus routes 
                      serve the Whiddon Valley area. The nearest bus stop is a 3-minute walk from 
                      the church.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Service Times & What to Expect */}
              <div className="space-y-8">
                <div className="glass-effect rounded-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-cyber-teal/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-cyber-teal" />
                    </div>
                    <h2 className="text-2xl font-serif text-charcoal">Service Times</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-steel-blue pl-4">
                      <h3 className="font-semibold text-charcoal">Sunday Morning Worship</h3>
                      <p className="text-charcoal/70">11:00 AM - 12:30 PM</p>
                      <p className="text-sm text-charcoal/60 mt-1">
                        KJV Bible expository preaching, traditional hymns with organ
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-steel-blue pl-4">
                      <h3 className="font-semibold text-charcoal">Sunday Evening Service</h3>
                      <p className="text-charcoal/70">6:30 PM - 8:00 PM</p>
                      <p className="text-sm text-charcoal/60 mt-1">
                        Biblical teaching, prayer, and fellowship
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-steel-blue pl-4">
                      <h3 className="font-semibold text-charcoal">Thursday Morning Bible Study</h3>
                      <p className="text-charcoal/70">10:30 AM - 12:00 PM</p>
                      <p className="text-sm text-charcoal/60 mt-1">
                        In-depth verse-by-verse Bible study
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="text-2xl font-serif text-charcoal mb-6">What to Expect</h2>
                  
                  <div className="space-y-4 text-charcoal/70">
                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Your First Visit</h3>
                      <p>
                        You'll receive a warm welcome from our congregation. Feel free to arrive a 
                        few minutes early to find a seat and familiarize yourself with the building. 
                        Visitors are never put on the spot or asked to stand.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Our Worship Style</h3>
                      <ul className="space-y-1">
                        <li>• Traditional hymns and psalms with organ accompaniment</li>
                        <li>• KJV Bible used exclusively</li>
                        <li>• Expository preaching (30-40 minutes)</li>
                        <li>• Reverent, focused worship atmosphere</li>
                        <li>• No contemporary music or entertainment</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Dress Code</h3>
                      <p>
                        We have no formal dress code. Most attendees dress smart-casual to formal, 
                        but you're welcome to come as you are. Our focus is on worshipping God, 
                        not on outward appearance.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Children</h3>
                      <p>
                        Children are welcome in all our services. We believe in families worshipping 
                        together. Quiet toys and books are available if needed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="text-2xl font-serif text-charcoal mb-6">Contact Us</h2>
                  
                  <div className="space-y-4">
                    <a 
                      href="tel:+447504925423"
                      className="flex items-center space-x-3 text-charcoal/70 hover:text-steel-blue smooth-transition"
                    >
                      <Phone className="w-5 h-5" />
                      <span>07504 925423</span>
                    </a>
                    
                    <a 
                      href="mailto:wvec.office@gmail.com"
                      className="flex items-center space-x-3 text-charcoal/70 hover:text-steel-blue smooth-transition"
                    >
                      <Mail className="w-5 h-5" />
                      <span>wvec.office@gmail.com</span>
                    </a>
                  </div>
                  
                  <p className="mt-6 text-charcoal/70">
                    If you have any questions about visiting our church or would like more 
                    information about our beliefs and practices, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto">
                <h2 className="text-3xl font-serif text-charcoal mb-4">
                  You're Always Welcome
                </h2>
                <p className="text-xl text-charcoal/70 mb-8">
                  Whether you're a resident of Barnstaple, visiting North Devon, or searching 
                  for a Reformed Baptist church that faithfully preaches God's Word, we would 
                  love to welcome you to our church family.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/about/what-we-believe"
                    className="bg-steel-blue text-white px-8 py-3 rounded-full hover:bg-cyber-teal smooth-transition"
                  >
                    What We Believe
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white text-charcoal border-2 border-steel-blue px-8 py-3 rounded-full hover:bg-steel-blue hover:text-white smooth-transition"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

            {/* SEO Footer Text */}
            <div className="mt-12 text-center">
              <p className="text-sm text-charcoal/40">
                Reformed Baptist church serving Barnstaple, Whiddon Valley, Roundswell, Pilton, 
                Newport, Forches, Sticklepath, Bickington, Fremington, Instow, Yelland, Braunton, 
                and North Devon. KJV Bible preaching, 1689 Baptist Confession, traditional worship.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}