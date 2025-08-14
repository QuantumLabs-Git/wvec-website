'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Lock, Shield, Save, AlertCircle, CheckCircle } from 'lucide-react'

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    createdAt: '',
    lastLogin: ''
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    // Validate password strength
    if (passwordForm.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' })
      return
    }

    setIsChangingPassword(true)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/profile/change-password', {
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
        setMessage({ type: 'success', text: 'Password changed successfully' })
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' })
      }
    } catch (error) {
      console.error('Failed to change password:', error)
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-charcoal mb-2">Profile Settings</h1>
        <p className="text-charcoal/60">Manage your account settings and security</p>
      </div>

      {/* User Information */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-steel-blue/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-steel-blue" />
          </div>
          <h2 className="text-xl font-serif text-charcoal">Account Information</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-charcoal/40" />
            <div>
              <p className="text-sm text-charcoal/60">Email Address</p>
              <p className="font-medium text-charcoal">{userInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-charcoal/40" />
            <div>
              <p className="text-sm text-charcoal/60">Account Type</p>
              <p className="font-medium text-charcoal">Administrator</p>
            </div>
          </div>

          {userInfo.createdAt && (
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-charcoal/40" />
              <div>
                <p className="text-sm text-charcoal/60">Account Created</p>
                <p className="font-medium text-charcoal">
                  {new Date(userInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {userInfo.lastLogin && (
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-charcoal/40" />
              <div>
                <p className="text-sm text-charcoal/60">Last Login</p>
                <p className="font-medium text-charcoal">
                  {new Date(userInfo.lastLogin).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-cyber-teal/20 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-cyber-teal" />
          </div>
          <h2 className="text-xl font-serif text-charcoal">Change Password</h2>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              placeholder="Enter your current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              required
              minLength={8}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              placeholder="Enter new password (min. 8 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              minLength={8}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              placeholder="Confirm your new password"
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="bg-steel-blue text-white px-6 py-3 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{isChangingPassword ? 'Changing Password...' : 'Change Password'}</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Password Requirements:</strong>
          </p>
          <ul className="text-sm text-amber-700 mt-2 space-y-1">
            <li>• Minimum 8 characters long</li>
            <li>• Use a mix of letters, numbers, and symbols</li>
            <li>• Avoid common words or personal information</li>
            <li>• Change your password regularly</li>
          </ul>
        </div>
      </div>
    </div>
  )
}