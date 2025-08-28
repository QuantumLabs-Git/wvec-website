-- Create sermons table
CREATE TABLE IF NOT EXISTS sermons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  speaker VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  scripture VARCHAR(100),
  description TEXT,
  audio_url TEXT,
  duration VARCHAR(20),
  sermon_type VARCHAR(50) DEFAULT 'regular', -- regular, lords-day, special
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date DESC);
CREATE INDEX IF NOT EXISTS idx_sermons_published ON sermons(is_published);
CREATE INDEX IF NOT EXISTS idx_sermons_type ON sermons(sermon_type);

-- Enable Row Level Security
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view published sermons" ON sermons
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage sermons" ON sermons
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_sermons_updated_at BEFORE UPDATE ON sermons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();