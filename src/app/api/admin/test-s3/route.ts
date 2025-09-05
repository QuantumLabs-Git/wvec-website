import { NextResponse } from 'next/server'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'
import jwt from 'jsonwebtoken'

export async function GET(request: Request) {
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

    // Check environment variables
    const accessKeyId = process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
    const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-2'
    const bucketName = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || 'wvec-sermons'

    const config = {
      hasAccessKey: !!accessKeyId,
      hasSecretKey: !!secretAccessKey,
      region,
      bucketName,
      accessKeyLength: accessKeyId?.length || 0,
      secretKeyLength: secretAccessKey?.length || 0,
      // Only show first 4 chars of keys for security
      accessKeyPreview: accessKeyId ? `${accessKeyId.substring(0, 4)}...` : 'NOT SET',
      secretKeyPreview: secretAccessKey ? `${secretAccessKey.substring(0, 4)}...` : 'NOT SET',
    }

    // Try to initialize S3 client if we have credentials
    let s3Status = 'Not configured'
    let bucketList: string[] = []
    
    if (accessKeyId && secretAccessKey) {
      try {
        const s3Client = new S3Client({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        })

        // Try to list buckets to verify credentials work
        const listCommand = new ListBucketsCommand({})
        const response = await s3Client.send(listCommand)
        
        s3Status = 'Connected successfully'
        bucketList = response.Buckets?.map(b => b.Name).filter((name): name is string => name !== undefined) || []
      } catch (error: any) {
        s3Status = `Connection failed: ${error.message}`
      }
    }

    return NextResponse.json({
      status: 'S3 Configuration Test',
      config,
      s3Status,
      buckets: bucketList,
      targetBucket: bucketName,
      targetBucketFound: bucketList.includes(bucketName),
    })
  } catch (error: any) {
    console.error('S3 test error:', error)
    return NextResponse.json(
      { 
        error: 'S3 test failed',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}