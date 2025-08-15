-- Check all articles and their published status
SELECT id, title, is_published, created_at 
FROM articles 
ORDER BY created_at DESC;

-- If you want to make all articles published for testing:
-- UPDATE articles SET is_published = true;