import { Metadata } from 'next'
import Hero from '@/components/Hero'
import AlternatingHero from '@/components/AlternatingHero'
import YouTubeSection from '@/components/YouTubeSection'
import UpcomingEvents from '@/components/UpcomingEvents'
import SEOContent from '@/components/SEOContent'

export const metadata: Metadata = {
  title: 'Reformed Baptist Church Barnstaple | KJV Bible | WVEC - Whiddon Valley Evangelical Church',
  description: 'Welcome to Whiddon Valley Evangelical Church - Reformed Baptist church in Barnstaple, North Devon. KJV Bible preaching, traditional hymns, 1689 Baptist Confession. Sunday services 11am & 6:30pm. Located near Stoat Park, Whiddon Valley. Faithful expository preaching since 1890.',
  keywords: 'reformed baptist church barnstaple, kjv church barnstaple, church near stoat park, whiddon valley church, sunday service barnstaple, traditional hymns devon, expository preaching north devon',
  alternates: {
    canonical: 'https://www.wvec.org.uk',
  },
  openGraph: {
    title: 'Reformed Baptist Church Barnstaple | Sunday Services 11am & 6:30pm',
    description: 'Visit WVEC - Reformed Baptist church with KJV Bible preaching, traditional hymns. Located in Whiddon Valley, Barnstaple. All welcome.',
    type: 'website',
  },
}

export default function Home() {
  const churchSchema = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': 'https://www.wvec.org.uk/#church',
    name: 'Whiddon Valley Evangelical Church',
    alternateName: ['WVEC', 'Whiddon Valley Church', 'Reformed Baptist Church Barnstaple'],
    image: 'https://www.wvec.org.uk/images/church-building.jpg',
    logo: 'https://www.wvec.org.uk/images/logo.png',
    url: 'https://www.wvec.org.uk',
    telephone: '+447504925423',
    email: 'wvec.office@gmail.com',
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
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '12:30',
        description: 'Sunday Morning Worship - KJV Bible Preaching'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '18:30',
        closes: '20:00',
        description: 'Sunday Evening Service'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '10:30',
        closes: '12:00',
        description: 'Thursday Bible Study'
      }
    ],
    priceRange: 'Free',
    acceptedPaymentMethod: 'Free Entry',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Donations Welcome',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.0889,
        longitude: -4.0726
      },
      geoRadius: '20000'
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Reformed Baptist Churches'
    },
    potentialAction: {
      '@type': 'JoinAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.wvec.org.uk/contact',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: 'Church Service Attendance'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
      />
      <div className="overflow-hidden">
        <Hero />
        <AlternatingHero />
        <SEOContent />
        <YouTubeSection />
        <UpcomingEvents />
      </div>
    </>
  )
}