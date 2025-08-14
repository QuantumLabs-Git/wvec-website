#!/usr/bin/env python3
"""
Extract actual content from WVEC website files
"""
import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime

class ContentExtractor(HTMLParser):
    """Extract text content from HTML"""
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script = False
        self.in_style = False
        
    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            self.in_script = True
        elif tag == 'style':
            self.in_style = True
            
    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False
        elif tag == 'style':
            self.in_style = False
            
    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            cleaned = data.strip()
            if cleaned:
                self.text.append(cleaned)

def extract_text_from_html(html_content):
    """Extract plain text from HTML content"""
    parser = ContentExtractor()
    parser.feed(html_content)
    return ' '.join(parser.text)

def analyze_blog_posts():
    """Analyze blog post structure and content"""
    post_dir = Path("/Volumes/PRO-G40/Development/WVEC/O_WVEC/www.wvec.org.uk/post")
    
    # Sample a few posts to understand structure
    sample_posts = [
        'salvation-in-isaiah-chapter-1.html',
        'matthew-6-v-9-our-father.html',
        '1-thessalonians-1-v-1-grace-be-unto-you-and-peace-from-god-our-father-and-the-lord-jesus-christ.html',
        'the-true-nature-of-a-gospel-church-1.html'
    ]
    
    results = []
    
    for post_file in sample_posts:
        post_path = post_dir / post_file
        if post_path.exists():
            try:
                # Read file
                with open(post_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Extract title from filename
                title = post_file.replace('.html', '').replace('-', ' ').title()
                
                # Try to extract some metadata
                post_data = {
                    'filename': post_file,
                    'title': title,
                    'file_size': len(content),
                    'has_content': len(content) > 1000
                }
                
                # Look for dates
                date_patterns = [
                    r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
                    r'(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}',
                    r'(\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})'
                ]
                
                for pattern in date_patterns:
                    dates = re.findall(pattern, content, re.IGNORECASE)
                    if dates:
                        post_data['possible_dates'] = dates[:3]  # First 3 matches
                        break
                
                results.append(post_data)
                
            except Exception as e:
                print(f"Error reading {post_file}: {e}")
    
    return results

def create_content_inventory():
    """Create an inventory of all content"""
    
    base_dir = Path("/Volumes/PRO-G40/Development/WVEC/O_WVEC/www.wvec.org.uk")
    
    inventory = {
        'bible_studies': {
            'annual_pages': [],
            'topical_studies': [],
            'book_studies': []
        },
        'sermons': {
            'audio': [],
            'text': [],
            'lords_day': []
        },
        'articles': {
            'series': {},
            'standalone': []
        }
    }
    
    # Bible Studies
    bible_study_files = [
        ('bible-studies-2021.html', '2021'),
        ('bible-studies-2022.html', '2022'),
        ('bible-studies-2023.html', '2023')
    ]
    
    for file, year in bible_study_files:
        if (base_dir / file).exists():
            inventory['bible_studies']['annual_pages'].append({
                'file': file,
                'year': year,
                'url': f'/bible-studies-{year}'
            })
    
    # Book Studies
    book_studies = {
        'colossians.html': 'Colossians',
        'copy-of-jude-a-warning-to-god-s-peo.html': 'Jude',
        'copy-of-leviticus.html': 'Leviticus',
        'copy-of-numbers.html': 'Numbers',
        'copy-of-philippians.html': 'Philippians',
        'copy-of-romans.html': 'Romans'
    }
    
    for file, book in book_studies.items():
        if (base_dir / file).exists():
            inventory['bible_studies']['book_studies'].append({
                'file': file,
                'book': book,
                'type': 'book_study'
            })
    
    # Topical Studies
    topical_studies = {
        'attributes-of-christ.html': 'Attributes of Christ',
        'attributes-of-god.html': 'Attributes of God',
        'copy-of-heaven.html': 'Heaven',
        'copy-of-holiness-the-life-of-christ.html': 'Holiness - The Life of Christ',
        'adoniram-judson.html': 'Adoniram Judson'
    }
    
    for file, topic in topical_studies.items():
        if (base_dir / file).exists():
            inventory['bible_studies']['topical_studies'].append({
                'file': file,
                'topic': topic,
                'type': 'topical_study'
            })
    
    # Article Series
    post_dir = base_dir / 'post'
    if post_dir.exists():
        posts = list(post_dir.glob('*.html'))
        
        for post in posts:
            name = post.stem
            
            # Categorize by series
            if 'thessalonians' in name:
                series = 'Thessalonians'
            elif 'ephesians' in name:
                series = 'Ephesians'
            elif 'salvation-in-isaiah' in name:
                series = 'Salvation in Isaiah'
            elif 'matthew-6' in name:
                series = 'Lord\'s Prayer (Matthew 6)'
            elif 'the-true-nature-of-a-gospel-church' in name:
                series = 'The True Nature of a Gospel Church'
            else:
                series = 'Standalone'
            
            if series not in inventory['articles']['series']:
                inventory['articles']['series'][series] = []
            
            inventory['articles']['series'][series].append({
                'file': post.name,
                'title': name.replace('-', ' ').title()
            })
    
    # Sort series
    for series in inventory['articles']['series']:
        inventory['articles']['series'][series].sort(key=lambda x: x['file'])
    
    return inventory

def main():
    """Main extraction process"""
    print("Analyzing WVEC Website Content")
    print("=" * 60)
    
    # Create content inventory
    inventory = create_content_inventory()
    
    # Save inventory
    output_file = Path('/Volumes/PRO-G40/Development/WVEC/wvec-website/content_inventory.json')
    with open(output_file, 'w') as f:
        json.dump(inventory, f, indent=2)
    
    print(f"\nContent inventory saved to: {output_file}")
    
    # Summary
    print("\nContent Summary:")
    print(f"- Bible Studies Annual Pages: {len(inventory['bible_studies']['annual_pages'])}")
    print(f"- Book Studies: {len(inventory['bible_studies']['book_studies'])}")
    print(f"- Topical Studies: {len(inventory['bible_studies']['topical_studies'])}")
    print(f"- Article Series: {len(inventory['articles']['series'])}")
    
    total_articles = sum(len(posts) for posts in inventory['articles']['series'].values())
    print(f"- Total Articles: {total_articles}")
    
    print("\nArticle Series Breakdown:")
    for series, posts in inventory['articles']['series'].items():
        if series != 'Standalone':
            print(f"  - {series}: {len(posts)} articles")

if __name__ == "__main__":
    main()