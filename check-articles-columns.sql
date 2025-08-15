-- Check the actual structure of the articles table
-- Run this in Supabase SQL Editor

SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_name = 'articles'
ORDER BY 
    ordinal_position;