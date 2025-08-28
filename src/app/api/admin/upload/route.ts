import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import jwt from 'jsonwebtoken'

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'wvec-sermons'
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

    const { fileName, fileType, fileSize } = await request.json()

    // Validate file
    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json(
        { error: 'Missing file information' },
        { status: 400 }
      )
    }

    // Check file type
    if (!fileType.includes('audio')) {
      return NextResponse.json(
        { error: 'Only audio files are allowed' },
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

    // Generate unique file name
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const key = `sermons/${timestamp}-${sanitizedFileName}`

    // Create the PutObjectCommand
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ACL: 'public-read', // Make file publicly readable
    })

    // Generate pre-signed URL (valid for 5 minutes)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })

    // The public URL where the file will be accessible
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-west-2'}.amazonaws.com/${key}`

    return NextResponse.json({
      uploadUrl,
      publicUrl,
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