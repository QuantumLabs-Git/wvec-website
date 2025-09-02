import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import jwt from 'jsonwebtoken'

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || 'wvec-sermons'
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

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

    const { fileName, fileType, fileSize, uploadType, folder } = await request.json()

    // Validate file
    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json(
        { error: 'Missing file information' },
        { status: 400 }
      )
    }

    // Check file type
    const isAudio = fileType.includes('audio')
    const isImage = fileType.includes('image')
    
    if (!isAudio && !isImage) {
      return NextResponse.json(
        { error: 'Only audio and image files are allowed' },
        { status: 400 }
      )
    }

    // Check file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      )
    }

    // Generate unique file name based on file type
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    
    // Determine folder based on upload type or explicit folder parameter
    let uploadFolder = 'uploads' // default folder
    if (folder) {
      uploadFolder = folder // Use explicit folder if provided
    } else if (uploadType === 'audio' || isAudio) {
      uploadFolder = 'sermons'
    } else if (uploadType === 'image' || isImage) {
      uploadFolder = 'events'
    }
    
    const key = `${uploadFolder}/${timestamp}-${sanitizedFileName}`

    // Create the PutObjectCommand (without ACL - will be handled by bucket policy)
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      // ACL removed - public access will be handled by bucket policy
    })

    console.log('Generating pre-signed URL for:', { bucket: BUCKET_NAME, key, fileType })

    // Generate pre-signed URL (valid for 5 minutes)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })

    // The public URL where the file will be accessible
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION || process.env.AWS_REGION || 'us-east-2'}.amazonaws.com/${key}`

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      fileUrl: publicUrl, // Include fileUrl for backward compatibility
      key,
    })
  } catch (error) {
    console.error('Failed to generate upload URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}