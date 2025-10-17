import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Use service key if available, otherwise use anon key
const supabase = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const fileType = file.type
    const isImage = fileType.startsWith('image/')
    const isAudio = fileType.startsWith('audio/')

    if (!isImage && !isAudio) {
      return NextResponse.json(
        { error: 'Only image and audio files are allowed' },
        { status: 400 }
      )
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 }
      )
    }

    // Generate unique file name
    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${sanitizedFileName}`

    // Determine bucket and path based on file type
    let bucketName = 'wvec-media'
    let filePath = `${folder}/${fileName}`

    if (isImage) {
      filePath = `images/${folder}/${fileName}`
    } else if (isAudio) {
      filePath = `audio/${folder}/${fileName}`
    }

    console.log('Uploading to Supabase Storage:', { bucket: bucketName, path: filePath })

    // First, check if the bucket exists, if not create it
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (!bucketsError) {
      const bucketExists = buckets?.some(b => b.name === bucketName)

      if (!bucketExists) {
        console.log('Creating bucket:', bucketName)
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: MAX_FILE_SIZE
        })

        if (createError && !createError.message?.includes('already exists')) {
          console.error('Failed to create bucket:', createError)
          throw createError
        }
      }
    }

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      throw uploadError
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    console.log('Upload successful:', publicUrl)

    return NextResponse.json({
      publicUrl,
      fileUrl: publicUrl,
      fileName: fileName,
      filePath: filePath
    })
  } catch (error: any) {
    console.error('Failed to upload file:', error)
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}