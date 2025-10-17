'use client'

export const handleImageUpload = async (
  file: File,
  token: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  // First, try the S3 upload endpoint
  try {
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: `upload-${Date.now()}-${file.name}`,
        fileType: file.type,
        fileSize: file.size,
        folder: file.type.startsWith('image/') ? 'images' : 'audio'
      })
    })

    if (response.ok) {
      const { uploadUrl, publicUrl } = await response.json()

      // Upload to S3
      const xhr = new XMLHttpRequest()

      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100)
            onProgress(percentComplete)
          }
        })
      }

      await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve(xhr.response)
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`))
          }
        }
        xhr.onerror = () => reject(new Error('Upload failed'))

        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

      return publicUrl
    }
  } catch (error) {
    console.log('S3 upload failed, trying Supabase fallback:', error)
  }

  // Fallback to Supabase Storage
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', file.type.startsWith('image/') ? 'images' : 'audio')

  const response = await fetch('/api/admin/upload-supabase', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Upload failed')
  }

  const { publicUrl } = await response.json()
  return publicUrl
}