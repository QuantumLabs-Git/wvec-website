import { createClient } from '@supabase/supabase-js'

// Database types
export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  category?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  excerpt?: string
  content: string
  category?: string
  author?: string
  tags?: string[]
  featured_image?: string
  slug?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PageContent {
  id: string
  page_name: string
  content: any
  updated_at: string
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
// For server-side operations (create, update, delete), use service key if available
// For client-side operations (read), anon key is sufficient
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

// Use service key if available (for server-side operations), otherwise use anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey

console.log('Initializing Supabase with:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET',
  hasServiceKey: !!supabaseServiceKey,
  hasAnonKey: !!supabaseAnonKey,
  usingKey: supabaseServiceKey ? 'service' : 'anon'
})

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Database features will not work.')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

// Helper functions for database operations

// Events
export const getEvents = async (publishedOnly = false) => {
  let query = supabase.from('events').select('*')
  
  if (publishedOnly) {
    query = query.eq('is_published', true)
  }
  
  const { data, error } = await query.order('date', { ascending: true })
  
  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  
  return data || []
}

export const getEvent = async (id: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching event:', error)
    return null
  }
  
  return data
}

export const createEvent = async (event: any) => {
  // Map the field names to match database schema
  const eventData = {
    title: event.title,
    description: event.description || null,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category || 'general',
    is_published: event.is_published !== undefined ? event.is_published : (event.isPublished || false)
  }
  
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating event in Supabase:', error)
    console.error('Event data attempted:', eventData)
    throw error
  }
  
  return data
}

export const updateEvent = async (id: string, updates: Partial<Event>) => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating event:', error)
    throw error
  }
  
  return data
}

export const deleteEvent = async (id: string) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting event:', error)
    throw error
  }
  
  return true
}

// Articles
export const getArticles = async (publishedOnly = false) => {
  let query = supabase.from('articles').select('*')
  
  if (publishedOnly) {
    query = query.eq('is_published', true)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }
  
  return data || []
}

export const getArticle = async (id: string) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching article:', error)
    return null
  }
  
  return data
}

export const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
  // Generate slug from title if not provided
  if (!article.slug) {
    article.slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }
  
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating article:', error)
    throw error
  }
  
  return data
}

export const updateArticle = async (id: string, updates: Partial<Article>) => {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating article:', error)
    throw error
  }
  
  return data
}

export const deleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting article:', error)
    throw error
  }
  
  return true
}

// Page Content
export const getPageContent = async (pageName: string) => {
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_name', pageName)
    .single()
  
  if (error) {
    console.error('Error fetching page content:', error)
    return null
  }
  
  return data?.content || {}
}

export const updatePageContent = async (pageName: string, content: any) => {
  const { data, error } = await supabase
    .from('page_content')
    .upsert([
      { page_name: pageName, content }
    ])
    .select()
    .single()
  
  if (error) {
    console.error('Error updating page content:', error)
    throw error
  }
  
  return data?.content
}

// Dashboard Stats
export const getDashboardStats = async () => {
  const [events, articles] = await Promise.all([
    getEvents(),
    getArticles()
  ])
  
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  return {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => new Date(e.date) > now).length,
    totalArticles: articles.length,
    recentArticles: articles.filter(a => new Date(a.created_at) > thirtyDaysAgo).length,
    lastUpdated: new Date().toISOString()
  }
}