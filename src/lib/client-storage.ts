// Client-side storage helper for persistence
const STORAGE_KEYS = {
  EVENTS: 'wvec_events',
  ARTICLES: 'wvec_articles',
  CONTENT: 'wvec_content'
}

export const clientStorage = {
  // Events
  getEvents: () => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEYS.EVENTS)
    return stored ? JSON.parse(stored) : []
  },
  
  saveEvents: (events: any[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
  },
  
  // Articles
  getArticles: () => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    return stored ? JSON.parse(stored) : []
  },
  
  saveArticles: (articles: any[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles))
  },
  
  // Content
  getContent: () => {
    if (typeof window === 'undefined') return {}
    const stored = localStorage.getItem(STORAGE_KEYS.CONTENT)
    return stored ? JSON.parse(stored) : {}
  },
  
  saveContent: (content: any) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content))
  }
}