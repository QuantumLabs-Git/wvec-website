'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Shield, Key, Save, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'super_admin'
  created_at: string
  last_login?: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [profileForm, setProfileForm] = useState({
    full_name: ''
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setProfileForm({ full_name: data.user.full_name })
      } else if (response.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/users/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ full_name: profileForm.full_name })
      })

      if (response.ok) {
        setSuccess('Profile updated successfully')
        fetchUserProfile()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update profile')
      }
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match')
      setSaving(false)
      return
    }

    // Validate password strength
    if (passwordForm.newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      setSaving(false)
      return
    }

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/users/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password changed successfully')
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        setError(data.error || 'Failed to change password')
      }
    } catch (error) {
      setError('Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-serif text-charcoal mb-2">Account Settings</h1>
        <p className="text-charcoal/60">Manage your account and security settings</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 smooth-appear">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 smooth-appear">
          {success}
        </div>
      )}

      {/* Profile Information */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-steel-blue mr-2" />
          <h2 className="text-xl font-semibold text-charcoal">Profile Information</h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-gray-50 text-charcoal/60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.full_name}
                onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Shield className="w-4 h-4 inline mr-1" />
                Role
              </label>
              <input
                type="text"
                value={user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                disabled
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-gray-50 text-charcoal/60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Member Since
              </label>
              <input
                type="text"
                value={user ? new Date(user.created_at).toLocaleDateString() : ''}
                disabled
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-gray-50 text-charcoal/60"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-steel-blue text-white px-6 py-2 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Key className="w-6 h-6 text-steel-blue mr-2" />
          <h2 className="text-xl font-semibold text-charcoal">Change Password</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                className="w-full px-4 py-2 pr-10 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-charcoal/60 hover:text-charcoal"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                New Password * (min. 8 characters)
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 pr-10 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-charcoal/60 hover:text-charcoal"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 pr-10 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-charcoal/60 hover:text-charcoal"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>Password Requirements:</strong>
            <ul className="list-disc list-inside mt-1">
              <li>Minimum 8 characters</li>
              <li>Use a mix of letters, numbers, and symbols for better security</li>
              <li>Avoid common words or personal information</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-steel-blue text-white px-6 py-2 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>{saving ? 'Changing...' : 'Change Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}