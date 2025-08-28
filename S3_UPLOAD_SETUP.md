# S3 Audio Upload Setup Guide

## Overview
The admin portal now supports direct MP3 upload to AWS S3. This guide will help you set up the required AWS resources.

## Prerequisites
- AWS Account
- AWS IAM user with S3 permissions

## Step 1: Create S3 Bucket

1. Go to AWS S3 Console: https://console.aws.amazon.com/s3
2. Click "Create bucket"
3. Configure:
   - **Bucket name**: `wvec-sermons` (or your preferred name)
   - **Region**: `eu-west-2` (London) or your preferred region
   - **Block Public Access**: UNCHECK "Block all public access"
   - Check the acknowledgment box
4. Click "Create bucket"

## Step 2: Configure Bucket CORS

1. Go to your bucket
2. Click on "Permissions" tab
3. Scroll to "Cross-origin resource sharing (CORS)"
4. Click "Edit" and paste:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": [
            "http://localhost:3000",
            "https://www.wvec.org.uk",
            "https://wvec.org.uk"
        ],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
```

5. Click "Save changes"

## Step 3: Create Bucket Policy

1. In the "Permissions" tab
2. Click on "Bucket Policy"
3. Click "Edit" and paste (replace `wvec-sermons` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::wvec-sermons/sermons/*"
        }
    ]
}
```

4. Click "Save changes"

## Step 4: Create IAM User for Uploads

1. Go to IAM Console: https://console.aws.amazon.com/iam
2. Click "Users" → "Add users"
3. User name: `wvec-sermon-uploader`
4. Select "Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach policies directly"
7. Click "Create policy" and use this JSON:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::wvec-sermons/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::wvec-sermons"
        }
    ]
}
```

8. Name the policy: `WVECSermonUploadPolicy`
9. Attach this policy to the user
10. Complete user creation
11. **SAVE THE ACCESS KEY AND SECRET KEY**

## Step 5: Add Environment Variables

Add these to your `.env.local` file:

```env
# AWS S3 Configuration
AWS_REGION=eu-west-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=wvec-sermons
```

For AWS Amplify deployment, add these same variables in:
1. AWS Amplify Console
2. Your app → "Environment variables"
3. Add each variable

## Step 6: Test Upload

1. Run the application locally: `npm run dev`
2. Go to http://localhost:3000/admin/sermons/new
3. Click "Upload MP3"
4. Select an MP3 file
5. Watch the progress bar
6. Verify the URL appears in the audio URL field

## Troubleshooting

### Upload fails with "Access Denied"
- Check IAM user has the correct policy
- Verify bucket name matches in environment variables
- Ensure CORS is configured correctly

### Upload succeeds but audio won't play
- Check bucket policy allows public read
- Verify the file path includes `/sermons/` prefix
- Test the S3 URL directly in browser

### Large files fail to upload
- Current limit is 100MB
- For larger files, consider compressing the audio
- Use MP3 format at 128kbps for optimal size/quality

## File Storage Structure

Files are stored in S3 with this structure:
```
bucket-name/
  sermons/
    1234567890-sermon-title.mp3
    1234567891-another-sermon.mp3
```

The timestamp prefix ensures unique filenames.

## Costs

AWS S3 pricing (approximate):
- Storage: $0.023 per GB per month
- Data transfer: $0.09 per GB (after 1GB free tier)
- Requests: $0.0004 per 1,000 requests

For typical church usage (50 sermons × 50MB each = 2.5GB):
- Monthly storage: ~$0.06
- Monthly transfer (1000 downloads): ~$2.25

## Security Notes

1. Never commit AWS credentials to Git
2. Use environment variables for all sensitive data
3. Regularly rotate access keys
4. Monitor AWS billing alerts
5. Consider using AWS CloudFront CDN for better performance

## Alternative: Use Existing S3 Bucket

If you already have the videos in S3, you can:
1. Use the same bucket for sermons
2. Create a `/sermons/` folder
3. Update the bucket policy to include the sermons path
4. Use the same CloudFront distribution if configured