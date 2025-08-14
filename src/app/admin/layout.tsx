'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Edit3, 
  User, 
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
  }, [pathname])

  const checkAuth = async () => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setUserEmail(data.user.email)
      } else {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }
  }

  // Show login page without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading admin portal...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/events', icon: Calendar, label: 'Events' },
    { href: '/admin/articles', icon: FileText, label: 'Articles' },
    { href: '/admin/content', icon: Edit3, label: 'Page Content' },
    { href: '/admin/profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-white">
      {/* Admin Header */}
      <header className="bg-white border-b border-charcoal/10 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-charcoal/5 rounded-lg smooth-transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-steel-blue" />
              <span className="text-lg font-serif text-charcoal">WVEC Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-charcoal/60">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-charcoal/60 hover:text-red-600 smooth-transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white border-r border-charcoal/10 min-h-[calc(100vh-3.5rem)] fixed left-0 top-14 z-40">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg smooth-transition ${
                      isActive
                        ? 'bg-steel-blue text-white'
                        : 'text-charcoal hover:bg-charcoal/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-6 ${isSidebarOpen ? 'ml-64' : 'ml-0'} smooth-transition`}>
          {children}
        </main>
      </div>
    </div>
  )
}