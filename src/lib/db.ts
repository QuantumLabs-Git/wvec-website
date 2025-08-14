import fs from 'fs'
import path from 'path'

// Simple JSON-based database for demo purposes
// In production, use a proper database like PostgreSQL or MongoDB

const DATA_DIR = path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'events.json')
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize files if they don't exist
const initFile = (filePath: string, defaultData: any) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
  }
}

initFile(EVENTS_FILE, { events: [] })
initFile(ARTICLES_FILE, { articles: [] })
initFile(CONTENT_FILE, { 
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
})

// Events functions
export const getEvents = () => {
  const data = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'))
  return data.events || []
}

export const getEvent = (id: string) => {
  const events = getEvents()
  return events.find((e: any) => e.id === id)
}

export const createEvent = (event: any) => {
  const events = getEvents()
  const newEvent = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  events.push(newEvent)
  fs.writeFileSync(EVENTS_FILE, JSON.stringify({ events }, null, 2))
  return newEvent
}

export const updateEvent = (id: string, updates: any) => {
  const events = getEvents()
  const index = events.findIndex((e: any) => e.id === id)
  if (index === -1) return null
  
  events[index] = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  fs.writeFileSync(EVENTS_FILE, JSON.stringify({ events }, null, 2))
  return events[index]
}

export const deleteEvent = (id: string) => {
  const events = getEvents()
  const filtered = events.filter((e: any) => e.id !== id)
  fs.writeFileSync(EVENTS_FILE, JSON.stringify({ events: filtered }, null, 2))
  return true
}

// Articles functions
export const getArticles = () => {
  const data = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf-8'))
  return data.articles || []
}

export const getArticle = (id: string) => {
  const articles = getArticles()
  return articles.find((a: any) => a.id === id)
}

export const createArticle = (article: any) => {
  const articles = getArticles()
  const newArticle = {
    ...article,
    id: Date.now().toString(),
    slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  articles.push(newArticle)
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify({ articles }, null, 2))
  return newArticle
}

export const updateArticle = (id: string, updates: any) => {
  const articles = getArticles()
  const index = articles.findIndex((a: any) => a.id === id)
  if (index === -1) return null
  
  articles[index] = {
    ...articles[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify({ articles }, null, 2))
  return articles[index]
}

export const deleteArticle = (id: string) => {
  const articles = getArticles()
  const filtered = articles.filter((a: any) => a.id !== id)
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify({ articles: filtered }, null, 2))
  return true
}

// Page content functions
export const getPageContent = (pageName: string) => {
  const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
  return data.pages[pageName] || {}
}

export const updatePageContent = (pageName: string, content: any) => {
  const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
  data.pages[pageName] = {
    ...data.pages[pageName],
    ...content,
    updatedAt: new Date().toISOString()
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2))
  return data.pages[pageName]
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