'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TestS3Page() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testS3Connection = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/test-s3', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to test S3 connection' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin"
          className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin
        </Link>
        <h1 className="text-3xl font-serif text-charcoal">S3 Connection Test</h1>
      </div>

      <div className="glass-effect rounded-xl p-8">
        <button
          onClick={testS3Connection}
          disabled={loading}
          className="px-6 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test S3 Connection'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}