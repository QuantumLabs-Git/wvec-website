-- Create page_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_content_page_name ON page_content(page_name);

-- Disable RLS for now
ALTER TABLE page_content DISABLE ROW LEVEL SECURITY;

-- Insert default content for homepage
INSERT INTO page_content (page_name, content) VALUES 
('homepage', '{
  "hero": {
    "title": "Reformed Baptist Church in Barnstaple, North Devon",
    "subtitle": "KJV Bible Preaching | Traditional Hymns | 1689 Baptist Confession"
  },
  "welcome": {
    "title": "Welcome to Whiddon Valley Evangelical Church",
    "content": "We are a Reformed Baptist church committed to faithful expository preaching from the King James Bible. Our services feature traditional hymn singing and Christ-centered worship. All are welcome to join us."
  },
  "services": {
    "sunday_morning": "11:00 AM - 12:30 PM",
    "sunday_evening": "6:30 PM - 8:00 PM",
    "thursday": "10:30 AM - 12:00 PM"
  }
}')
ON CONFLICT (page_name) DO NOTHING;

-- Insert default content for about page
INSERT INTO page_content (page_name, content) VALUES 
('about', '{
  "mission": "To glorify God by proclaiming the Gospel of Jesus Christ, making disciples, and equipping believers for service.",
  "history": "Whiddon Valley Evangelical Church has been faithfully serving the Barnstaple community since 1890, maintaining our commitment to Reformed Baptist principles and biblical truth.",
  "pastorMessage": "We warmly welcome you to WVEC. Our desire is to be a church where Gods Word is faithfully preached, Christ is exalted, and lives are transformed by the Gospel."
}')
ON CONFLICT (page_name) DO NOTHING;

-- Insert default content for contact page
INSERT INTO page_content (page_name, content) VALUES 
('contact', '{
  "address": "Stoat Park, Whiddon Valley\\nBarnstaple, Devon\\nEX32 8PT",
  "phone": "07504 925423",
  "email": "wvec.office@gmail.com",
  "officeHours": "Please call or email to arrange a visit"
}')
ON CONFLICT (page_name) DO NOTHING;

-- Verify the table was created and has content
SELECT page_name, jsonb_pretty(content) as content FROM page_content;