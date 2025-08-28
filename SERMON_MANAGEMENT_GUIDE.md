# Sermon Management System Guide

## Overview
The sermon management system allows administrators to upload and manage sermons through the admin interface. Published sermons are displayed on the public sermon pages.

## Setup Instructions

### 1. Create the Sermons Table in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL from `create-sermons-table.sql`
4. Click "Run" to create the table and policies

### 2. Verify Environment Variables

Ensure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
```

## Admin Features

### Accessing the Sermon Management

1. Login to admin at `/admin/login`
2. Navigate to "Manage Sermons" from the dashboard
3. Or go directly to `/admin/sermons`

### Adding a New Sermon

1. Click "Add New Sermon" button
2. Fill in the required fields:
   - **Title** (required): The sermon title
   - **Speaker** (required): Speaker name (defaults to Pastor David Kay)
   - **Date** (required): Date of the sermon
   - **Scripture**: Bible passage reference
   - **Description**: Brief description or notes
   - **Audio URL**: Direct link to MP3 file
   - **Duration**: Length of audio (e.g., "45:30")
   - **Sermon Type**: Regular Service, Lord's Day Reading, or Special Service
   - **Publish Status**: Check to make immediately visible

### Audio File Hosting

For audio files, you need to:
1. Upload MP3 files to a cloud service (AWS S3, Google Drive, Dropbox)
2. Get the direct/public link
3. Paste the link in the "Audio File URL" field

Recommended: Use AWS S3 with CloudFront CDN for best performance

### Managing Existing Sermons

- **Edit**: Click the edit icon to modify sermon details
- **Delete**: Click trash icon to remove a sermon
- **Publish/Unpublish**: Toggle the status button

## Public Pages

### Listen to Sermons (`/sermons/listen`)
- Displays sermons with audio files
- Features audio player with play/pause controls
- Filters by year and speaker
- Download option for each sermon

### Written Sermons (`/sermons/read`) 
- Displays sermons with written notes/descriptions
- Search functionality
- Filter by sermon type
- Links to audio if available

## Database Schema

The `sermons` table contains:
- `id`: UUID primary key
- `title`: Sermon title
- `speaker`: Speaker name
- `date`: Date of sermon
- `scripture`: Bible reference (optional)
- `description`: Sermon notes/description (optional)
- `audio_url`: Link to audio file (optional)
- `duration`: Audio duration (optional)
- `sermon_type`: Type of service
- `is_published`: Publish status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## API Endpoints

### Public API
- `GET /api/sermons` - Fetch published sermons
  - Query params: `type` (audio/read), `year`, `speaker`, `limit`

### Admin API (requires authentication)
- `GET /api/admin/sermons` - List all sermons
- `POST /api/admin/sermons` - Create new sermon
- `PATCH /api/admin/sermons/[id]` - Update sermon
- `DELETE /api/admin/sermons/[id]` - Delete sermon

## Troubleshooting

### Sermons not appearing on public pages
1. Check if sermon is published (`is_published: true`)
2. Verify Supabase credentials in `.env.local`
3. Check browser console for API errors

### Audio playback issues
1. Ensure audio URL is publicly accessible
2. Verify file format is MP3
3. Check CORS settings if using external hosting

### Table not found error
Run the SQL script in `create-sermons-table.sql` in your Supabase SQL editor