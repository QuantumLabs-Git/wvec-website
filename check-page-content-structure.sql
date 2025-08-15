-- Check the structure of page_content table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'page_content'
ORDER BY ordinal_position;

-- Check if there's any existing content
SELECT page_name, updated_at 
FROM page_content
ORDER BY updated_at DESC;