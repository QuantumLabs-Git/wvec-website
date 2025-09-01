'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Edit2, Trash2, Shield, User, Mail, CheckCircle, XCircle, Key } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin'
  is_active: boolean
  last_login?: string
  created_at: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddUser, setShowAddUser] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'admin' as 'admin' | 'super_admin'
  })

  useEffect(() => {
    fetchCurrentUser()
    fetchUsers()
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
        
        // If not super admin, redirect
        if (data.user.role !== 'super_admin') {
          router.push('/admin')
        }
      } else {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error)
      router.push('/admin')
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      
      if (response.ok) {
        setSuccess('User added successfully')
        setShowAddUser(false)
        setNewUser({ email: '', full_name: '', password: '', role: 'admin' })
        fetchUsers()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to add user')
      }
    } catch (error) {
      setError('Failed to add user')
    }
  }

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !isActive })
      })
      
      if (response.ok) {
        setSuccess(`User ${!isActive ? 'activated' : 'deactivated'} successfully`)
        fetchUsers()
      }
    } catch (error) {
      setError('Failed to update user status')
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        setSuccess('User deleted successfully')
        fetchUsers()
      }
    } catch (error) {
      setError('Failed to delete user')
    }
  }

  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt('Enter new password for user:')
    if (!newPassword) return
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      })
      
      if (response.ok) {
        setSuccess('Password reset successfully')
      } else {
        setError('Failed to reset password')
      }
    } catch (error) {
      setError('Failed to reset password')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading users...</p>
        </div>
      </div>
    )
  }

  if (!currentUser || currentUser.role !== 'super_admin') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You need super admin privileges to access this page.</p>
          <Link href="/admin" className="mt-4 inline-block text-steel-blue hover:text-cyber-teal">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-charcoal mb-2">Admin Users</h1>
            <p className="text-charcoal/60">Manage administrator accounts</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-steel-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-teal smooth-transition flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Admin</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {success}
        </div>
      )}

      {/* Add User Form */}
      {showAddUser && (
        <div className="mb-8 glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-4">Add New Admin</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'super_admin' })}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-charcoal/5 border-b border-charcoal/10">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">User</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Role</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Last Login</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-charcoal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-charcoal/5 hover:bg-charcoal/2">
                <td className="px-6 py-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-charcoal/40" />
                      <p className="font-medium text-charcoal">{user.full_name}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="w-3 h-3 text-charcoal/40" />
                      <p className="text-sm text-charcoal/60">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'super_admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'super_admin' && <Shield className="w-3 h-3 mr-1" />}
                    {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(user.id, user.is_active)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    disabled={user.email === currentUser.email}
                  >
                    {user.is_active ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-charcoal/60">
                  {user.last_login 
                    ? new Date(user.last_login).toLocaleString() 
                    : 'Never'
                  }
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="p-2 text-charcoal/60 hover:text-steel-blue smooth-transition"
                      title="Reset Password"
                    >
                      <Key className="w-4 h-4" />
                    </button>
                    {user.email !== currentUser.email && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-charcoal/60 hover:text-red-600 smooth-transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}