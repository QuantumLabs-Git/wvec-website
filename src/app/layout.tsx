import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { LiveStreamProvider } from '@/contexts/LiveStreamContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reformed Baptist Church Barnstaple | KJV Bible Preaching | Whiddon Valley Evangelical Church',
  description: 'Reformed Baptist church in Barnstaple, North Devon. KJV Bible preaching, traditional hymns, 1689 Baptist Confession. Sunday services 11am & 6:30pm. Expository preaching, doctrines of grace, cessationist theology. Visit us near Stoat Park, Whiddon Valley.',
  keywords: 'reformed baptist church barnstaple, evangelical church north devon, kjv church barnstaple, biblical church barnstaple, traditional hymns church devon, calvinist church barnstaple, 1689 confession church uk, reformed church whiddon valley, baptist church barnstaple devon, expository preaching barnstaple, cessationist church uk, reformed theology church devon, doctrines of grace barnstaple, complementarian church devon, sola scriptura church barnstaple, WVEC, church services barnstaple sunday, places of worship north devon',
  authors: [{ name: 'Whiddon Valley Evangelical Church' }],
  creator: 'Whiddon Valley Evangelical Church',
  publisher: 'Whiddon Valley Evangelical Church',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Reformed Baptist Church Barnstaple | KJV Bible Preaching | WVEC',
    description: 'Reformed Baptist church in Barnstaple, North Devon. KJV Bible preaching, traditional hymns, 1689 Baptist Confession. Sunday worship 11am & 6:30pm. Thursday Bible study 10:30am. Reformed theology, expository preaching, doctrines of grace.',
    url: 'https://www.wvec.org.uk',
    siteName: 'Whiddon Valley Evangelical Church',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: 'https://static.wixstatic.com/media/19eb8e_58b4228edf194e5597715c9811c10027~mv2.jpg/v1/fill/w_2500,h_3333,al_c/19eb8e_58b4228edf194e5597715c9811c10027~mv2.jpg',
        width: 2500,
        height: 3333,
        alt: 'Whiddon Valley Evangelical Church - Reformed Baptist Church in Barnstaple',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformed Baptist Church Barnstaple | KJV Preaching | WVEC',
    description: 'Reformed Baptist church in Barnstaple, North Devon. KJV Bible, traditional hymns, 1689 Confession. Sunday 11am & 6:30pm.',
    images: ['https://static.wixstatic.com/media/19eb8e_58b4228edf194e5597715c9811c10027~mv2.jpg/v1/fill/w_2500,h_3333,al_c/19eb8e_58b4228edf194e5597715c9811c10027~mv2.jpg'],
  },
  metadataBase: new URL('https://www.wvec.org.uk'),
  alternates: {
    canonical: 'https://www.wvec.org.uk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  verification: {
    google: 'verification-code-here',
  },
  other: {
    'geo.region': 'GB-DEV',
    'geo.placename': 'Barnstaple',
    'geo.position': '51.0889;-4.0726',
    'ICBM': '51.0889, -4.0726',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Whiddon Valley Evangelical Church',
    alternateName: 'WVEC',
    description: 'Reformed Baptist Church in Barnstaple, North Devon. KJV Bible preaching, traditional hymns, 1689 Baptist Confession. Expository preaching, doctrines of grace, cessationist theology. Sunday services 11am & 6:30pm, Thursday Bible study 10:30am.',
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
        description: 'Sunday Morning Worship Service - KJV Bible Preaching'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '18:30',
        closes: '20:00',
        description: 'Sunday Evening Service - Expository Preaching'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '10:30',
        closes: '12:00',
        description: 'Thursday Morning Bible Study'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Church Services & Activities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sunday Morning Worship',
            description: 'Traditional Reformed worship with KJV Bible expository preaching, traditional hymns, and psalms'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sunday Evening Service',
            description: 'Evening worship service with biblical preaching and fellowship'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Thursday Bible Study',
            description: 'In-depth Bible study using KJV, exploring Reformed theology'
          }
        }
      ]
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Barnstaple'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'North Devon'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Devon'
      }
    ],
    knowsAbout: [
      'Reformed Theology',
      '1689 Baptist Confession',
      'KJV Bible',
      'Expository Preaching',
      'Doctrines of Grace',
      'Cessationism',
      'Traditional Hymns',
      'Complementarianism',
      'Presuppositional Apologetics'
    ],
    sameAs: [
      'https://www.youtube.com/@WhiddonValleyEvangelicalChurch'
    ],
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.wvec.org.uk/images/logo.png'
    },
    slogan: 'Proclaiming Christ Crucified in Barnstaple Since 1890',
    foundingDate: '1890'
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <LiveStreamProvider>
          <Navigation />
          <main className="min-h-screen pt-16 sm:pt-20">
            {children}
          </main>
          <Footer />
        </LiveStreamProvider>
      </body>
    </html>
  )
}