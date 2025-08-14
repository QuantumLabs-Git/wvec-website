# Database Setup Guide

The current implementation uses in-memory storage which doesn't persist in AWS Amplify's serverless environment. Here are two solutions:

## Option 1: Supabase (Recommended - Free Tier)

Supabase provides a free PostgreSQL database that's perfect for this project.

### Setup Steps:

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free account
   - Create a new project

2. **Get Database Credentials**
   - In Supabase dashboard, go to Settings → Database
   - Copy the connection string

3. **Create Tables**
   Run this SQL in Supabase SQL editor:

```sql
-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  author TEXT,
  tags TEXT[],
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Page content table
CREATE TABLE page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default events
INSERT INTO events (title, description, date, time, location, category, is_published)
VALUES 
  ('Sunday Morning Service', 'Join us for worship and the preaching of God''s Word', CURRENT_DATE, '11:00 AM', 'Whiddon Valley Evangelical Church', 'service', true),
  ('Sunday Evening Service', 'Evening worship and Bible teaching', CURRENT_DATE, '6:00 PM', 'Whiddon Valley Evangelical Church', 'service', true),
  ('Thursday Bible Study', 'In-depth study of Scripture', CURRENT_DATE + INTERVAL '3 days', '10:30 AM', 'Whiddon Valley Evangelical Church', 'study', true);
```

4. **Install Supabase Client**
```bash
npm install @supabase/supabase-js
```

5. **Add Environment Variables to AWS Amplify**
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Option 2: AWS DynamoDB

AWS DynamoDB has a free tier and integrates well with Amplify.

### Setup Steps:

1. **Create DynamoDB Tables**
   - Go to AWS DynamoDB console
   - Create tables: `wvec-events`, `wvec-articles`, `wvec-content`

2. **Set Permissions**
   - In AWS IAM, give Amplify access to DynamoDB

3. **Install AWS SDK**
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

4. **Add Environment Variables**
```
AWS_REGION=eu-west-2
DYNAMODB_TABLE_EVENTS=wvec-events
DYNAMODB_TABLE_ARTICLES=wvec-articles
DYNAMODB_TABLE_CONTENT=wvec-content
```

## Option 3: Quick Fix - JSON File in Repository

For a simple solution, you could store data as JSON files in the repository:

1. Create `/public/data/events.json`
2. Update via GitHub API when admin makes changes
3. Data persists between deployments

## Current Workaround

The current implementation includes default events that always appear:
- Sunday Morning Service (11:00 AM)
- Sunday Evening Service (6:00 PM)  
- Thursday Bible Study (10:30 AM)

These will always be visible even after deployments.

## Recommendation

For a church website, **Supabase** is recommended because:
- Free tier is generous (500MB database, 2GB bandwidth)
- Easy to set up
- Provides a web interface for data management
- Scales if needed
- Real PostgreSQL database

Would you like help setting up Supabase?