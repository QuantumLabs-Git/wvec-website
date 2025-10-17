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
  image_url?: string
  is_published: boolean
  is_featured?: boolean
  is_recurring?: boolean
  recurrence_pattern?: string
  recurrence_end_date?: string
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
  const eventData: any = {
    title: event.title,
    description: event.description || null,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category || 'general',
    is_published: event.is_published !== undefined ? event.is_published : (event.isPublished || false)
  }
  
  // Add recurring event fields if applicable
  if (event.isRecurring) {
    eventData.is_recurring = true
    eventData.recurrence_pattern = event.recurrencePattern
    eventData.recurrence_interval = event.recurrenceInterval || 1
    
    if (event.recurrenceEndDate) {
      eventData.recurrence_end_date = event.recurrenceEndDate
    }
    
    if (event.recurrencePattern === 'weekly' && event.recurrenceDaysOfWeek?.length > 0) {
      eventData.recurrence_days_of_week = event.recurrenceDaysOfWeek
    }
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
  
  // If it's a recurring event, generate the recurring instances
  if (event.isRecurring && data) {
    await generateRecurringEvents(data)
  }
  
  return data
}

// Helper function to generate recurring event instances
export const generateRecurringEvents = async (parentEvent: any) => {
  const instances = []
  const startDate = new Date(parentEvent.date)
  const endDate = parentEvent.recurrence_end_date 
    ? new Date(parentEvent.recurrence_end_date)
    : new Date(startDate.getTime() + (365 * 24 * 60 * 60 * 1000)) // Default to 1 year if no end date
  
  let currentDate = new Date(startDate)
  currentDate.setDate(currentDate.getDate() + parentEvent.recurrence_interval) // Skip the first instance (parent)
  
  while (currentDate <= endDate) {
    // For weekly recurrence with specific days
    if (parentEvent.recurrence_pattern === 'weekly' && parentEvent.recurrence_days_of_week?.length > 0) {
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const currentDayName = dayNames[currentDate.getDay()]
      
      if (!parentEvent.recurrence_days_of_week.includes(currentDayName)) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }
    }
    
    instances.push({
      title: parentEvent.title,
      description: parentEvent.description,
      date: currentDate.toISOString().split('T')[0],
      time: parentEvent.time,
      location: parentEvent.location,
      category: parentEvent.category,
      is_published: parentEvent.is_published,
      parent_event_id: parentEvent.id,
      is_recurring: false // Child events are not themselves recurring
    })
    
    // Move to next occurrence
    switch (parentEvent.recurrence_pattern) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + parentEvent.recurrence_interval)
        break
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * parentEvent.recurrence_interval))
        break
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + parentEvent.recurrence_interval)
        break
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + parentEvent.recurrence_interval)
        break
    }
    
    // Limit to 52 instances to prevent too many database inserts
    if (instances.length >= 52) break
  }
  
  if (instances.length > 0) {
    const { error } = await supabase
      .from('events')
      .insert(instances)
    
    if (error) {
      console.error('Error creating recurring event instances:', error)
    }
  }
  
  return instances.length
}

export const updateEvent = async (id: string, updates: any) => {
  // Map field names to match database schema and filter out undefined fields
  const updateData: any = {}

  // Map fields that exist in the updates
  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.description !== undefined) updateData.description = updates.description || null
  if (updates.date !== undefined) updateData.date = updates.date
  if (updates.time !== undefined) updateData.time = updates.time
  if (updates.location !== undefined) updateData.location = updates.location
  if (updates.category !== undefined) updateData.category = updates.category || 'general'
  if (updates.image_url !== undefined) updateData.image_url = updates.image_url || null
  if (updates.is_published !== undefined) updateData.is_published = updates.is_published
  if (updates.is_featured !== undefined) updateData.is_featured = updates.is_featured

  // Handle recurring event fields
  if (updates.is_recurring !== undefined) {
    updateData.is_recurring = updates.is_recurring

    // Only add recurrence fields if it's a recurring event
    if (updates.is_recurring) {
      if (updates.recurrence_pattern !== undefined) {
        updateData.recurrence_pattern = updates.recurrence_pattern
      }
      if (updates.recurrence_interval !== undefined) {
        updateData.recurrence_interval = updates.recurrence_interval
      }
      if (updates.recurrence_end_date !== undefined) {
        updateData.recurrence_end_date = updates.recurrence_end_date || null
      }
      if (updates.recurrence_days_of_week !== undefined) {
        updateData.recurrence_days_of_week = updates.recurrence_days_of_week
      }
    } else {
      // Clear recurrence fields if not recurring
      updateData.recurrence_pattern = null
      updateData.recurrence_end_date = null
      updateData.recurrence_interval = null
      updateData.recurrence_days_of_week = null
    }
  }

  // Add updated_at timestamp
  updateData.updated_at = new Date().toISOString()

  console.log('Updating event with id:', id)
  console.log('Update data being sent to Supabase:', updateData)

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating event in Supabase:', error)
    console.error('Update data that caused error:', updateData)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    })
    throw error
  }

  console.log('Event updated successfully in Supabase:', data)
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

export const createArticle = async (article: any) => {
  // Map the field names to match database schema
  const articleData: any = {
    title: article.title,
    excerpt: article.excerpt || null,
    content: article.content,
    category: article.category || null,
    author: article.author || null,
    tags: article.tags || [],
    featured_image: article.featured_image || article.featuredImage || null,
    is_published: article.is_published !== undefined ? article.is_published : (article.isPublished || false)
  }
  
  // Generate slug from title if not provided
  if (!article.slug) {
    articleData.slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  } else {
    articleData.slug = article.slug
  }
  
  console.log('Creating article with data:', articleData)
  
  const { data, error } = await supabase
    .from('articles')
    .insert([articleData])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating article in Supabase:', error)
    console.error('Article data attempted:', articleData)
    throw error
  }
  
  return data
}

export const updateArticle = async (id: string, updates: any) => {
  // Map field names to match database schema
  const updateData: any = {}
  
  // Handle field name mapping
  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt
  if (updates.content !== undefined) updateData.content = updates.content
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.author !== undefined) updateData.author = updates.author
  if (updates.tags !== undefined) updateData.tags = updates.tags
  if (updates.slug !== undefined) updateData.slug = updates.slug
  
  // Handle both isPublished and is_published
  if (updates.is_published !== undefined) {
    updateData.is_published = updates.is_published
  } else if (updates.isPublished !== undefined) {
    updateData.is_published = updates.isPublished
  }
  
  // Handle both featuredImage and featured_image
  if (updates.featured_image !== undefined) {
    updateData.featured_image = updates.featured_image
  } else if (updates.featuredImage !== undefined) {
    updateData.featured_image = updates.featuredImage
  }
  
  console.log('Updating article with data:', updateData)
  
  const { data, error } = await supabase
    .from('articles')
    .update(updateData)
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
  console.log('Updating page content in Supabase:', { pageName, content })
  
  const { data, error } = await supabase
    .from('page_content')
    .upsert(
      { 
        page_name: pageName, 
        content: content,
        updated_at: new Date().toISOString()
      },
      { 
        onConflict: 'page_name' 
      }
    )
    .select()
    .single()
  
  if (error) {
    console.error('Error updating page content in Supabase:', error)
    console.error('Attempted data:', { pageName, content })
    throw error
  }
  
  console.log('Page content updated successfully:', data)
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