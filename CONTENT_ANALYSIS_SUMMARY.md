# WVEC Website Content Analysis Summary

## Overview
The old WVEC website (www.wvec.org.uk) contains extensive biblical content organized into three main categories: Bible Studies, Sermons, and Articles/Blog posts. The site was built using Wix and contains over 300 HTML files with religious content.

## Content Structure

### 1. Bible Studies
The Bible Studies section is organized into:

#### Annual Archives
- **Bible Studies 2021** (`bible-studies-2021.html`)
- **Bible Studies 2022** (`bible-studies-2022.html`)
- **Bible Studies 2023** (`bible-studies-2023.html`)

#### Book Studies (6 total)
- Colossians
- Jude
- Leviticus
- Numbers
- Philippians
- Romans

#### Topical Studies (5 total)
- Attributes of Christ
- Attributes of God
- Heaven
- Holiness - The Life of Christ in Us
- Adoniram Judson (missionary biography)

### 2. Sermons
The sermons are organized by format:
- **Listen** (`listen.html`) - Audio sermons
- **Read** (`read.html`) - Written/transcribed sermons
- **Lord's Day Bible Readings** (`lords-day-bible-readings.html`)
- Annual archives: 2021, 2022, 2023

### 3. Articles/Blog Posts
The blog contains 206 articles organized into major series:

#### Major Series
1. **1 & 2 Thessalonians** (50 articles)
   - Detailed verse-by-verse exposition
   - Example: "1 Thessalonians 1 v 1 Grace Be Unto You..."

2. **Salvation in Isaiah** (50 articles)
   - Chapter-by-chapter study through Isaiah
   - Focuses on salvation themes

3. **Ephesians 5-6** (36 articles)
   - Verse-by-verse study
   - Covers Christian living, marriage, spiritual warfare

4. **The Lord's Prayer (Matthew 6:9-13)** (26 articles)
   - In-depth study of each petition
   - Example: "Thy Kingdom Come", "Our Father", etc.

5. **The True Nature of a Gospel Church** (20 articles)
   - 20-part series on church doctrine and practice

6. **Standalone Articles** (24 articles)
   - Various topics including bulletins, announcements, special studies

## Technical Notes

### File Structure
- All content is stored as static HTML files
- Files were created using Wix website builder
- Most files are large (300-600KB) due to embedded Wix framework code
- Actual content is embedded within complex HTML/JavaScript structure

### Content Challenges
1. **Extraction Difficulty**: Content is deeply embedded in Wix-generated HTML
2. **No Clear Metadata**: Dates, speakers, and other metadata are not consistently marked
3. **Large File Sizes**: Most HTML files contain extensive framework code
4. **Dynamic Content**: Some content may have been dynamically loaded

## Recommendations for Content Migration

### 1. Manual Content Extraction
Given the complexity of the Wix-generated HTML, manual extraction may be most reliable:
- Open each page in a browser
- Copy the visible content
- Organize into structured format (JSON/CSV/Markdown)

### 2. Content Organization for New Site
Suggested structure:
```
/bible-studies/
  /annual/2021, 2022, 2023
  /books/colossians, jude, etc.
  /topics/attributes-of-christ, heaven, etc.

/sermons/
  /audio/
  /text/
  /lords-day-readings/

/articles/
  /series/thessalonians, ephesians, isaiah, etc.
  /standalone/
```

### 3. Metadata to Capture
For each content piece, try to capture:
- Title
- Date (if available)
- Speaker/Author
- Series/Category
- Content type (study, sermon, article)
- Original URL (for redirects)

### 4. URL Mapping
Create redirects from old URLs to maintain SEO:
- `/bible-studies-2023` → new Bible Studies section
- `/post/[article-name]` → new Articles section
- `/listen` → new Audio Sermons section

### 5. Priority Content
Start with the most recent and active content:
- 2023 Bible Studies
- Recent sermon series
- Active blog series (Thessalonians, Isaiah, etc.)

## Next Steps

1. **Create extraction templates** for each content type
2. **Set up a content database** (JSON/CSV) to store extracted content
3. **Design the new site structure** to accommodate all content types
4. **Plan the migration process** in phases
5. **Test with a sample** of content before full migration

## File Inventory
A complete inventory of content has been saved to `content_inventory.json` with detailed file listings for all series and standalone content.