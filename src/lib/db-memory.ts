// In-memory database for AWS Amplify deployment
// This is a temporary solution - in production, use DynamoDB, RDS, or another managed database

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  category: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface Article {
  id: string
  title: string
  excerpt?: string
  content: string
  category: string
  author?: string
  tags?: string[]
  featuredImage?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// Global in-memory storage
declare global {
  var dbEvents: Event[] | undefined
  var dbArticles: Article[] | undefined
  var dbContent: any | undefined
}

// Get next Sunday and Thursday dates
const getNextSunday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = day === 0 ? 0 : 7 - day
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + diff)
  return nextSunday.toISOString().split('T')[0]
}

const getNextThursday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = day <= 4 ? 4 - day : 11 - day
  const nextThursday = new Date(today)
  nextThursday.setDate(today.getDate() + diff)
  return nextThursday.toISOString().split('T')[0]
}

// Initialize with default events if not exists
if (!global.dbEvents) {
  const sundayDate = getNextSunday()
  const thursdayDate = getNextThursday()
  
  global.dbEvents = [
    {
      id: 'default-1',
      title: 'Sunday Morning Service',
      description: 'Join us for worship and the preaching of God\'s Word from the King James Bible',
      date: sundayDate,
      time: '11:00 AM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'service',
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'default-2',
      title: 'Sunday Evening Service',
      description: 'Evening worship and Bible teaching',
      date: sundayDate,
      time: '6:00 PM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'service',
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'default-3',
      title: 'Thursday Bible Study',
      description: 'In-depth study of Scripture with Pastor',
      date: thursdayDate,
      time: '10:30 AM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'study',
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

if (!global.dbArticles) {
  global.dbArticles = []
}

if (!global.dbContent) {
  global.dbContent = {
    pages: {
      homepage: {
        hero: {
          title: 'Reformed Baptist Church in Barnstaple, North Devon',
          subtitle: 'KJV Bible Preaching | Traditional Hymns | 1689 Baptist Confession'
        },
        welcome: {
          title: 'Welcome to Whiddon Valley Evangelical Church',
          content: 'We are a Reformed Baptist church located in Barnstaple, North Devon...'
        }
      },
      about: {
        mission: 'To glorify God by proclaiming the Gospel of Jesus Christ...'
      }
    }
  }
}

// Events functions
export const getEvents = () => {
  return global.dbEvents || []
}

export const getEvent = (id: string) => {
  return global.dbEvents?.find(e => e.id === id)
}

export const createEvent = (event: any) => {
  const newEvent = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  global.dbEvents = [...(global.dbEvents || []), newEvent]
  return newEvent
}

export const updateEvent = (id: string, updates: any) => {
  const index = global.dbEvents?.findIndex(e => e.id === id) ?? -1
  if (index === -1) return null
  
  const updated = {
    ...global.dbEvents![index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  global.dbEvents![index] = updated
  return updated
}

export const deleteEvent = (id: string) => {
  global.dbEvents = global.dbEvents?.filter(e => e.id !== id) || []
}

// Articles functions
export const getArticles = () => {
  return global.dbArticles || []
}

export const getArticle = (id: string) => {
  return global.dbArticles?.find(a => a.id === id)
}

export const createArticle = (article: any) => {
  const newArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  global.dbArticles = [...(global.dbArticles || []), newArticle]
  return newArticle
}

export const updateArticle = (id: string, updates: any) => {
  const index = global.dbArticles?.findIndex(a => a.id === id) ?? -1
  if (index === -1) return null
  
  const updated = {
    ...global.dbArticles![index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  global.dbArticles![index] = updated
  return updated
}

export const deleteArticle = (id: string) => {
  global.dbArticles = global.dbArticles?.filter(a => a.id !== id) || []
}

// Content functions
export const getPageContent = (page: string) => {
  return global.dbContent?.pages[page] || {}
}

export const updatePageContent = (page: string, content: any) => {
  if (!global.dbContent) {
    global.dbContent = { pages: {} }
  }
  if (!global.dbContent.pages) {
    global.dbContent.pages = {}
  }
  global.dbContent.pages[page] = content
  return content
}

// Dashboard stats
export const getDashboardStats = () => {
  const events = getEvents()
  const articles = getArticles()
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  return {
    totalEvents: events.length,
    upcomingEvents: events.filter((e: any) => new Date(e.date) > now).length,
    totalArticles: articles.length,
    recentArticles: articles.filter((a: any) => new Date(a.createdAt) > thirtyDaysAgo).length,
    lastUpdated: new Date().toISOString()
  }
}