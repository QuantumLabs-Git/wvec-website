'use client'

import { useState, useEffect } from 'react'
import { Save, Home, Info, Phone, FileText, Calendar, ChevronRight, Check } from 'lucide-react'

interface PageContent {
  [key: string]: any
}

export default function ContentEditorPage() {
  const [selectedPage, setSelectedPage] = useState('homepage')
  const [content, setContent] = useState<PageContent>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const pages = [
    { id: 'homepage', name: 'Homepage', icon: Home },
    { id: 'about', name: 'About Us', icon: Info },
    { id: 'services', name: 'Service Times', icon: Calendar },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'beliefs', name: 'What We Believe', icon: FileText },
  ]

  useEffect(() => {
    fetchPageContent(selectedPage)
  }, [selectedPage])

  const fetchPageContent = async (pageName: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/content/${pageName}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setContent(data.content || {})
      }
    } catch (error) {
      console.error('Failed to fetch page content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/content/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      })
      
      if (response.ok) {
        setSaveMessage('Content saved successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Failed to save content')
      }
    } catch (error) {
      console.error('Failed to save content:', error)
      setSaveMessage('Error saving content')
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = (path: string, value: string) => {
    const keys = path.split('.')
    const newContent = { ...content }
    let current = newContent
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setContent(newContent)
  }

  const renderHomepageEditor = () => (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Hero Section</h3>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Hero Title
          </label>
          <input
            type="text"
            value={content.hero?.title || ''}
            onChange={(e) => updateField('hero.title', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="Reformed Baptist Church in Barnstaple..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={content.hero?.subtitle || ''}
            onChange={(e) => updateField('hero.subtitle', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="KJV Bible Preaching | Traditional Hymns..."
          />
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Welcome Section</h3>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Welcome Title
          </label>
          <input
            type="text"
            value={content.welcome?.title || ''}
            onChange={(e) => updateField('welcome.title', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="Welcome to Whiddon Valley Evangelical Church"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Welcome Content
          </label>
          <textarea
            value={content.welcome?.content || ''}
            onChange={(e) => updateField('welcome.content', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="We are a Reformed Baptist church..."
          />
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Service Times</h3>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Sunday Morning Time
          </label>
          <input
            type="text"
            value={content.services?.sunday_morning || '11:00 AM - 12:30 PM'}
            onChange={(e) => updateField('services.sunday_morning', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Sunday Evening Time
          </label>
          <input
            type="text"
            value={content.services?.sunday_evening || '6:30 PM - 8:00 PM'}
            onChange={(e) => updateField('services.sunday_evening', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Thursday Bible Study Time
          </label>
          <input
            type="text"
            value={content.services?.thursday || '10:30 AM - 12:00 PM'}
            onChange={(e) => updateField('services.thursday', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>
      </div>
    </div>
  )

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">About Page Content</h3>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Mission Statement
          </label>
          <textarea
            value={content.mission || ''}
            onChange={(e) => updateField('mission', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="To glorify God by proclaiming the Gospel..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Church History Summary
          </label>
          <textarea
            value={content.history || ''}
            onChange={(e) => updateField('history', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="Founded in 1890..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Pastor's Message
          </label>
          <textarea
            value={content.pastorMessage || ''}
            onChange={(e) => updateField('pastorMessage', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="Welcome message from the pastor..."
          />
        </div>
      </div>
    </div>
  )

  const renderContactEditor = () => (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Contact Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Church Address
          </label>
          <textarea
            value={content.address || 'Stoat Park, Whiddon Valley\nBarnstaple, Devon\nEX32 8PT'}
            onChange={(e) => updateField('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={content.phone || '07504 925423'}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={content.email || 'wvec.office@gmail.com'}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Office Hours
          </label>
          <textarea
            value={content.officeHours || ''}
            onChange={(e) => updateField('officeHours', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
          />
        </div>
      </div>
    </div>
  )

  const renderPageEditor = () => {
    switch (selectedPage) {
      case 'homepage':
        return renderHomepageEditor()
      case 'about':
        return renderAboutEditor()
      case 'contact':
        return renderContactEditor()
      default:
        return (
          <div className="glass-effect rounded-xl p-6">
            <p className="text-charcoal/60">Select a page to edit its content</p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-charcoal mb-2">Page Content Editor</h1>
        <p className="text-charcoal/60">Edit website content and text</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Page Selector */}
        <div className="lg:col-span-1">
          <div className="glass-effect rounded-xl p-4">
            <h3 className="text-sm font-semibold text-charcoal mb-4 px-2">Select Page</h3>
            <nav className="space-y-1">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg smooth-transition ${
                      selectedPage === page.id
                        ? 'bg-steel-blue text-white'
                        : 'text-charcoal hover:bg-charcoal/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{page.name}</span>
                    </div>
                    {selectedPage === page.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-charcoal/60">Loading content...</p>
              </div>
            </div>
          ) : (
            <>
              {renderPageEditor()}
              
              {/* Save Button */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  {saveMessage && (
                    <div className={`flex items-center space-x-2 ${
                      saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {saveMessage.includes('success') && <Check className="w-5 h-5" />}
                      <span>{saveMessage}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-steel-blue text-white px-6 py-3 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}