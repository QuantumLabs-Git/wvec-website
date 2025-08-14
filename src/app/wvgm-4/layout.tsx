import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WVGM-4 Reformed AI | Christian Artificial Intelligence | Presuppositional Apologetics',
  description: 'WVGM-4 (Whiddon Valley Generative Model) - The world\'s first Reformed presuppositional AI assistant. Biblical answers grounded in Reformed theology, 1689 Baptist Confession, KJV Scripture. Ask theological questions and receive biblically sound responses.',
  keywords: 'WVGM-4, reformed AI, christian artificial intelligence, biblical AI assistant, presuppositional apologetics AI, reformed theology chatbot, 1689 confession AI, KJV bible AI, theological questions, reformed baptist AI',
  openGraph: {
    title: 'WVGM-4: Reformed AI Assistant | Whiddon Valley Evangelical Church',
    description: 'Experience the world\'s first Reformed presuppositional AI. Ask biblical questions, explore Reformed theology, get scriptural guidance.',
    type: 'website',
    url: 'https://www.wvec.org.uk/wvgm-4',
    images: [
      {
        url: 'https://www.wvec.org.uk/images/wvgm-4-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'WVGM-4 Reformed AI Assistant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WVGM-4: World\'s First Reformed AI',
    description: 'Ask biblical questions, explore Reformed theology with AI grounded in Scripture and the 1689 Confession.',
  },
  alternates: {
    canonical: 'https://www.wvec.org.uk/wvgm-4',
  },
}

export default function WVGM4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}