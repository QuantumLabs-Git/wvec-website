# AWS Amplify Environment Variables Setup

## Quick Links
- **AWS Amplify Console**: https://eu-north-1.console.aws.amazon.com/amplify/apps
- **Environment Variables**: https://eu-north-1.console.aws.amazon.com/amplify/home#/env-vars

## Required Environment Variables

Add these environment variables to your AWS Amplify app:

### 1. Supabase Configuration (Already Set)
These should already be configured in Amplify:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. S3 Storage Configuration (Need to Add)
Add these for S3 storage to work:

```
S3_ACCESS_KEY_ID=(your-access-key-id)
S3_SECRET_ACCESS_KEY=(your-secret-access-key)
S3_REGION=us-east-2
S3_BUCKET_NAME=wvec-sermons
```

*Note: The actual credentials are stored securely in your local .env.local file*

### 3. Authentication (Already Set)
- `JWT_SECRET` - Should already be configured

## Step-by-Step Instructions

### Adding S3 Credentials:

1. **Navigate to Environment Variables**
   - Go to [AWS Amplify Console](https://eu-north-1.console.aws.amazon.com/amplify/apps)
   - Click on your `wvec-website` app
   - In left sidebar, under "App settings", click "Environment variables"

2. **Add Variables**
   - Click "Manage variables"
   - Click "Add variable" for each one:

   | Variable | Value |
   |----------|-------|
   | S3_ACCESS_KEY_ID | (use value from .env.local) |
   | S3_SECRET_ACCESS_KEY | (use value from .env.local) |
   | S3_REGION | us-east-2 |
   | S3_BUCKET_NAME | wvec-sermons |

3. **Save and Deploy**
   - Click "Save" button
   - Amplify will automatically trigger a new build/deployment
   - Wait 5-10 minutes for deployment to complete

## Verifying the Setup

### Option 1: Check in Admin Panel
1. Go to https://main.d14i5uea2lczbx.amplifyapp.com/admin
2. Try uploading an image in Events or Articles
3. If successful, S3 is working!

### Option 2: Use Verification Script
```bash
# 1. Get your admin token from browser
# 2. Edit verify-s3-setup.js and add your token
# 3. Run:
node verify-s3-setup.js
```

## Storage Behavior

### With S3 Configured:
- Files upload directly to AWS S3 bucket
- Better performance for large files
- Cost-effective for high volume

### Without S3 (Fallback):
- Files automatically upload to Supabase Storage
- No configuration needed
- Works immediately

## Troubleshooting

### If uploads aren't working:
1. **Check environment variables are set** in AWS Amplify Console
2. **Wait for redeployment** to complete (check build logs)
3. **Verify S3 bucket exists** and credentials are correct
4. **Check browser console** for error messages

### Common Issues:
- **503 Error**: S3 credentials not set in Amplify
- **401 Error**: Authentication issue (re-login)
- **Network Error**: Check if S3 bucket region is correct

## S3 Bucket Structure

```
wvec-sermons/
├── sermons/       # Audio files (sermons)
├── events/        # Event images
├── articles/      # Article featured images
├── images/        # General images
└── audio/         # General audio files
```

## Security Notes

- S3 credentials are server-side only (not exposed to browser)
- Pre-signed URLs expire after 5 minutes
- Each upload requires authentication
- Fallback to Supabase ensures uploads always work

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review the build logs in AWS Amplify Console
3. Verify all environment variables are set correctly
4. Ensure the S3 bucket and credentials are active