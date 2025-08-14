#!/usr/bin/env python3
"""
Script to extract content from old WVEC website files
"""
import os
import re
from pathlib import Path

# Base directory for old website
OLD_SITE_DIR = "/Volumes/PRO-G40/Development/WVEC/O_WVEC/www.wvec.org.uk"

def analyze_content_structure():
    """Analyze the content structure of the old website"""
    
    # Content categories
    content_structure = {
        'bible_studies': {
            'files': ['bible-studies.html', 'bible-studies-2021.html', 'bible-studies-2022.html', 'bible-studies-2023.html'],
            'additional_pages': [],
        },
        'sermons': {
            'listen': 'listen.html',
            'read': 'read.html',
            'lords_day': 'lords-day-bible-readings.html',
            'archive_pages': ['sermons.html', 'sermons-2021.html', 'sermons-2022.html', 'sermons-2023.html']
        },
        'articles': {
            'main_page': 'blog.html',
            'post_directory': 'post/',
            'categories': ['thessalonians', 'ephesians', 'salvation-in-isaiah', 'matthew', 'the-lord-s-prayer', 'the-true-nature-of-a-gospel-church']
        }
    }
    
    # Count posts
    post_dir = Path(OLD_SITE_DIR) / 'post'
    if post_dir.exists():
        posts = list(post_dir.glob('*.html'))
        # Filter out utility files
        posts = [p for p in posts if p.name not in ['feed.html', 'sitemap.html', 'robots.html', 'c.html', 't.html', 'decodeURIComponent(e.html']]
        
        print(f"Total blog posts found: {len(posts)}")
        
        # Categorize posts
        post_categories = {}
        for post in posts:
            name = post.stem
            # Extract category from filename
            if 'thessalonians' in name:
                cat = 'Thessalonians'
            elif 'ephesians' in name:
                cat = 'Ephesians'
            elif 'salvation-in-isaiah' in name:
                cat = 'Salvation in Isaiah'
            elif 'matthew' in name:
                cat = 'Matthew / Lord\'s Prayer'
            elif 'the-true-nature-of-a-gospel-church' in name:
                cat = 'True Nature of a Gospel Church'
            else:
                cat = 'Other'
            
            if cat not in post_categories:
                post_categories[cat] = []
            post_categories[cat].append(name)
        
        print("\nBlog post categories:")
        for cat, posts in sorted(post_categories.items()):
            print(f"  {cat}: {len(posts)} posts")
    
    # Bible study pages
    bible_study_pages = [
        'attributes-of-christ.html',
        'attributes-of-god.html',
        'colossians.html',
        'adoniram-judson.html',
        'copy-of-holiness-the-life-of-christ.html',
        'copy-of-heaven.html',
        'copy-of-jude-a-warning-to-god-s-peo.html',
        'copy-of-leviticus.html',
        'copy-of-numbers.html',
        'copy-of-philippians.html',
        'copy-of-romans.html'
    ]
    
    print("\n\nContent Structure Summary:")
    print("=" * 60)
    print("\n1. BIBLE STUDIES:")
    print("   - Annual archives: 2021, 2022, 2023")
    print("   - Individual study pages covering books and topics:")
    print("     * Attributes of Christ/God")
    print("     * Book studies: Colossians, Jude, Leviticus, Numbers, Philippians, Romans")
    print("     * Topical studies: Heaven, Holiness, Adoniram Judson")
    
    print("\n2. SERMONS:")
    print("   - Listen page (audio sermons)")
    print("   - Read page (written sermons)")
    print("   - Lord's Day Bible Readings")
    print("   - Annual archives: 2021, 2022, 2023")
    
    print("\n3. ARTICLES/BLOG:")
    print("   - Main blog page")
    print("   - Series on:")
    print("     * 1 & 2 Thessalonians (detailed verse-by-verse)")
    print("     * Ephesians 5-6 (detailed verse-by-verse)")
    print("     * Salvation in Isaiah (43 parts)")
    print("     * Matthew 6:9-13 (Lord's Prayer)")
    print("     * The True Nature of a Gospel Church (20 parts)")
    print("   - Various standalone articles")
    
    print("\n\nRECOMMENDATIONS FOR NEW SITE:")
    print("=" * 60)
    print("\n1. Create a structured content migration plan")
    print("2. Extract actual sermon/study data from HTML files")
    print("3. Organize content by:")
    print("   - Type (Bible Study, Sermon Audio, Sermon Text, Article)")
    print("   - Date (if available)")
    print("   - Series/Book")
    print("   - Speaker/Author")
    print("4. Consider creating JSON/CSV files with extracted content")
    print("5. Map old URLs to new structure for SEO preservation")

if __name__ == "__main__":
    analyze_content_structure()