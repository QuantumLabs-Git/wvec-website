// Content migration data structure for WVEC website
// This file contains all the extracted content from the old website

export interface BibleStudy {
  id: string
  title: string
  category: 'annual' | 'book' | 'topical' | 'special' | string
  year?: number
  book?: string
  description?: string
  date?: string
  excerpt?: string
  originalFile?: string
  href: string
}

export interface Article {
  id: string
  title: string
  series?: string
  author?: string
  date?: string
  excerpt?: string
  category: string
  originalFile: string
  href: string
}

export interface Sermon {
  id: string
  title: string
  speaker?: string
  date?: string
  type: 'audio' | 'text' | 'lords-day'
  series?: string
  originalFile: string
  href: string
}

// Bible Studies from the old website
export const migratedBibleStudies: BibleStudy[] = [
  // Salvation in Isaiah Series
  {
    id: 'salvation-in-isaiah-10',
    title: 'Salvation in Isaiah 10',
    date: '2020-10-15',
    category: 'Salvation in Isaiah',
    excerpt: 'The prophet Isaiah has been called one of the GOSPEL PROPHETS. He is called that because there is so much of the Lord Jesus Christ and salvation in his prophecies.',
    href: '/bible-studies/salvation-in-isaiah-10'
  },
  {
    id: 'salvation-in-isaiah-11',
    title: 'Salvation in Isaiah 11',
    date: '2020-10-15',
    category: 'Salvation in Isaiah',
    excerpt: 'In the midst of the prophecies to Israel and Judah about war, invasion, and bloodshed, Isaiah brings a refreshing announcement of a King who will come!',
    href: '/bible-studies/salvation-in-isaiah-11'
  },
  {
    id: 'salvation-in-isaiah-11-12',
    title: 'Salvation in Isaiah 11 & 12',
    date: '2020-10-15',
    category: 'Salvation in Isaiah',
    excerpt: 'The prophet Isaiah has been called one of the GOSPEL PROPHETS, exploring salvation themes across chapters 11 and 12.',
    href: '/bible-studies/salvation-in-isaiah-11-12'
  },
  {
    id: 'salvation-in-isaiah-13',
    title: 'Salvation in Isaiah 13',
    date: '2020-10-15',
    category: 'Salvation in Isaiah',
    excerpt: 'Continuing our study of salvation themes in Isaiah, we explore chapter 13 and God\'s sovereignty over the nations.',
    href: '/bible-studies/salvation-in-isaiah-13'
  },
  {
    id: 'salvation-in-isaiah-14',
    title: 'Salvation in Isaiah 14',
    date: '2020-10-15',
    category: 'Salvation in Isaiah',
    excerpt: 'The prophet Isaiah reveals God\'s judgment and mercy in chapter 14, showing the ultimate triumph of God\'s salvation plan.',
    href: '/bible-studies/salvation-in-isaiah-14'
  },
  
  // 1 Thessalonians Series
  {
    id: '1-thessalonians-1-v-1',
    title: '1 Thessalonians 1:1 - Grace be unto you, and peace',
    date: '2020-10-15',
    category: '1 Thessalonians',
    excerpt: 'Paul\'s first letter to the Thessalonians - exploring the apostolic greeting and the foundation of grace and peace from God our Father and the Lord Jesus Christ.',
    href: '/bible-studies/1-thessalonians-1-v-1'
  },
  {
    id: '1-thessalonians-1-v-2',
    title: '1 Thessalonians 1:2 - We give thanks to God always',
    date: '2020-10-15',
    category: '1 Thessalonians',
    excerpt: 'In the opening verses of I Thessalonians 1 we are given a glimpse of the Apostle Paul\'s method and pattern of prayer.',
    href: '/bible-studies/1-thessalonians-1-v-2'
  },
  {
    id: '1-thessalonians-1-v-3',
    title: '1 Thessalonians 1:3 - Remembering without ceasing your work of faith',
    date: '2020-10-15',
    category: '1 Thessalonians',
    excerpt: 'Paul\'s thanksgiving for the Thessalonians\' work of faith, labor of love, and patience of hope in our Lord Jesus Christ.',
    href: '/bible-studies/1-thessalonians-1-v-3'
  },
  {
    id: '1-thessalonians-1-v-5',
    title: '1 Thessalonians 1:5 - For our gospel came not unto you in word only',
    date: '2020-10-15',
    category: '1 Thessalonians',
    excerpt: 'The Gospel is the most important message that any human being can hear. Paul explains how the Gospel came to Thessalonica not in word only, but also in power.',
    href: '/bible-studies/1-thessalonians-1-v-5'
  },
  {
    id: '1-thessalonians-1-v-10',
    title: '1 Thessalonians 1:10 - To wait for his Son from heaven',
    date: '2020-10-15',
    category: '1 Thessalonians',
    excerpt: 'The blessed hope of the church - waiting for God\'s Son from heaven, whom he raised from the dead, even Jesus, which delivered us from the wrath to come.',
    href: '/bible-studies/1-thessalonians-1-v-10'
  },
  
  // Ephesians Series
  {
    id: 'ephesians-5-v-18',
    title: 'Ephesians 5:18 - Be not drunk with wine but be filled with the Spirit',
    date: '2020-10-16',
    category: 'Ephesians',
    excerpt: 'The danger is so great, the wickedness of the world so appalling that we have to use our minds. Paul contrasts being drunk with wine with being filled with the Spirit.',
    href: '/bible-studies/ephesians-5-v-18'
  },
  {
    id: 'ephesians-5-v-19-20',
    title: 'Ephesians 5:19-20 - Speaking to yourselves in psalms and hymns',
    date: '2020-10-16',
    category: 'Ephesians',
    excerpt: 'The results of being filled with the Spirit: speaking in psalms, making melody in your heart, and giving thanks always for all things.',
    href: '/bible-studies/ephesians-5-v-19-20'
  },
  {
    id: 'ephesians-5-v-21',
    title: 'Ephesians 5:21 - Submitting yourselves one to another',
    date: '2020-10-16',
    category: 'Ephesians',
    excerpt: 'Understanding mutual submission in the fear of God as a mark of being filled with the Spirit.',
    href: '/bible-studies/ephesians-5-v-21'
  },
  {
    id: 'ephesians-5-v-21-24',
    title: 'Ephesians 5:21-24 - Wives and Husbands',
    date: '2020-10-16',
    category: 'Ephesians',
    excerpt: 'Paul\'s teaching on marriage relationships, comparing the church\'s relationship to Christ with the marriage relationship.',
    href: '/bible-studies/ephesians-5-v-21-24'
  },
  {
    id: 'ephesians-5-v-21-32',
    title: 'Ephesians 5:21-32 & 6:1-4 - Family Relationships',
    date: '2020-10-16',
    category: 'Ephesians',
    excerpt: 'The mystery of Christ and the church revealed through marriage, and instructions for parent-child relationships.',
    href: '/bible-studies/ephesians-5-v-21-32'
  },
  
  // The Lord's Prayer Series
  {
    id: 'matthew-6-v-10-kingdom',
    title: 'Matthew 6:10 - Thy Kingdom Come',
    date: '2020-10-16',
    category: 'The Lord\'s Prayer',
    excerpt: 'The Westminster Shorter Catechism says this about prayer – "The whole word of God is of use to direct us in prayer, but the special rule is the Lord\'s Prayer."',
    href: '/bible-studies/matthew-6-v-10-kingdom'
  },
  {
    id: 'matthew-6-v-10-will',
    title: 'Matthew 6:10 - Thy Will be Done on Earth as it is in Heaven',
    date: '2020-10-16',
    category: 'The Lord\'s Prayer',
    excerpt: 'Exploring what it means for God\'s will to be done on earth as it is in heaven - a prayer for perfect obedience and submission.',
    href: '/bible-studies/matthew-6-v-10-will'
  },
  {
    id: 'matthew-6-v-11',
    title: 'Matthew 6:11 - Give Us This Day Our Daily Bread',
    date: '2020-10-15',
    category: 'The Lord\'s Prayer',
    excerpt: 'Understanding our daily dependence on God for both physical and spiritual sustenance.',
    href: '/bible-studies/matthew-6-v-11'
  },
  {
    id: 'matthew-6-v-12',
    title: 'Matthew 6:12 - And Forgive Us Our Debts',
    date: '2020-10-16',
    category: 'The Lord\'s Prayer',
    excerpt: 'The vital importance of forgiveness - both receiving it from God and extending it to others.',
    href: '/bible-studies/matthew-6-v-12'
  },
  
  // Redemption Studies
  {
    id: 'redemption-power',
    title: 'The Power of Redemption and It is Particular Redemption',
    date: '2020-10-16',
    category: 'Redemption',
    excerpt: 'Exploring the power of Christ\'s redemptive work and the doctrine of particular redemption.',
    href: '/bible-studies/redemption-power'
  },
  {
    id: 'redemption-practicality',
    title: 'The Practicality of Redemption',
    date: '2020-10-16',
    category: 'Redemption',
    excerpt: 'How the doctrine of redemption applies to everyday Christian living and experience.',
    href: '/bible-studies/redemption-practicality'
  },
  {
    id: 'redemption-price',
    title: 'The Price of Redemption',
    date: '2020-10-16',
    category: 'Redemption',
    excerpt: 'The infinite cost of our redemption - the precious blood of Christ as of a lamb without blemish and without spot.',
    href: '/bible-studies/redemption-price'
  },
  
  // The True Nature of a Gospel Church Series
  {
    id: 'gospel-church-1',
    title: 'The True Nature of a Gospel Church - Part 1',
    date: '2020-10-15',
    category: 'The True Nature of a Gospel Church',
    excerpt: 'Beginning our study on what constitutes a true New Testament church according to biblical principles.',
    href: '/bible-studies/gospel-church-1'
  },
  {
    id: 'gospel-church-10',
    title: 'The True Nature of a Gospel Church - Part 10',
    date: '2020-10-15',
    category: 'The True Nature of a Gospel Church',
    excerpt: 'Continuing our examination of the essential characteristics of a biblical church.',
    href: '/bible-studies/gospel-church-10'
  },
  {
    id: 'gospel-church-11',
    title: 'The True Nature of a Gospel Church - Part 11',
    date: '2020-10-15',
    category: 'The True Nature of a Gospel Church',
    excerpt: 'Further insights into the nature and function of a New Testament church.',
    href: '/bible-studies/gospel-church-11'
  },
  {
    id: 'gospel-church-12',
    title: 'The True Nature of a Gospel Church - Part 12',
    date: '2020-10-15',
    category: 'The True Nature of a Gospel Church',
    excerpt: 'Exploring the practical implications of biblical church principles.',
    href: '/bible-studies/gospel-church-12'
  },
  {
    id: 'gospel-church-13',
    title: 'The True Nature of a Gospel Church - Part 13',
    date: '2020-10-15',
    category: 'The True Nature of a Gospel Church',
    excerpt: 'Continuing our comprehensive study on the biblical pattern for local churches.',
    href: '/bible-studies/gospel-church-13'
  },
  
  // Book Studies - continuing with existing entries below
  {
    id: 'bs-psalm119',
    title: 'Psalm 119',
    category: 'book',
    book: 'Psalms',
    description: 'An in-depth study of Psalm 119',
    originalFile: 'psalm119.html',
    href: '/bible-studies/psalm-119'
  },
  {
    id: 'bs-psalm119-1',
    title: 'Psalm 119 (Part 1)',
    category: 'book',
    book: 'Psalms',
    description: 'First part of the Psalm 119 study',
    originalFile: 'psalm119-1.html',
    href: '/bible-studies/psalm-119-part-1'
  },
  {
    id: 'bs-mark',
    title: 'Mark',
    category: 'book',
    book: 'Mark',
    description: 'Study through the Gospel of Mark',
    originalFile: 'mark.html',
    href: '/bible-studies/mark'
  },
  {
    id: 'bs-job',
    title: 'Job',
    category: 'book',
    book: 'Job',
    description: 'Study through the book of Job',
    originalFile: 'job.html',
    href: '/bible-studies/job'
  },
  {
    id: 'bs-judges',
    title: 'Judges',
    category: 'book',
    book: 'Judges',
    description: 'Study through the book of Judges',
    originalFile: 'judges.html',
    href: '/bible-studies/judges'
  },
  {
    id: 'bs-ephesians',
    title: 'Ephesians',
    category: 'book',
    book: 'Ephesians',
    description: 'Study through the book of Ephesians',
    originalFile: 'ephesians.html',
    href: '/bible-studies/ephesians'
  },
  {
    id: 'bs-1-corinthians',
    title: '1 Corinthians',
    category: 'book',
    book: '1 Corinthians',
    description: 'Study through First Corinthians',
    originalFile: '1-corinthians.html',
    href: '/bible-studies/1-corinthians'
  },
  {
    id: 'bs-1-john',
    title: '1 John',
    category: 'book',
    book: '1 John',
    description: 'Study through First John',
    originalFile: '1-john.html',
    href: '/bible-studies/1-john'
  },
  {
    id: 'bs-1-kings',
    title: '1 Kings',
    category: 'book',
    book: '1 Kings',
    description: 'Study through First Kings',
    originalFile: '1-kings.html',
    href: '/bible-studies/1-kings'
  },
  {
    id: 'bs-1-peter',
    title: '1 Peter',
    category: 'book',
    book: '1 Peter',
    description: 'Study through First Peter',
    originalFile: '1-peter.html',
    href: '/bible-studies/1-peter'
  },
  {
    id: 'bs-1-samuel',
    title: '1 Samuel',
    category: 'book',
    book: '1 Samuel',
    description: 'Study through First Samuel',
    originalFile: '1-samu.html',
    href: '/bible-studies/1-samuel'
  },
  {
    id: 'bs-2-john',
    title: '2 John',
    category: 'book',
    book: '2 John',
    description: 'Study through Second John',
    originalFile: '2-john.html',
    href: '/bible-studies/2-john'
  },
  {
    id: 'bs-2-peter',
    title: '2 Peter',
    category: 'book',
    book: '2 Peter',
    description: 'Study through Second Peter',
    originalFile: '2-peter.html',
    href: '/bible-studies/2-peter'
  },
  {
    id: 'bs-2-samuel',
    title: '2 Samuel',
    category: 'book',
    book: '2 Samuel',
    description: 'Study through Second Samuel',
    originalFile: '2-samuel.html',
    href: '/bible-studies/2-samuel'
  },
  {
    id: 'bs-3-john',
    title: '3 John',
    category: 'book',
    book: '3 John',
    description: 'Study through Third John',
    originalFile: '3-john.html',
    href: '/bible-studies/3-john'
  },
  {
    id: 'bs-elisha',
    title: 'Elisha',
    category: 'topical',
    description: 'Study on the prophet Elisha',
    originalFile: 'elisha.html',
    href: '/bible-studies/elisha'
  },
  // Topical Studies
  {
    id: 'bs-gospel-in-ot',
    title: 'Gospel in the Old Testament',
    category: 'topical',
    description: 'Discovering the Gospel throughout the Old Testament',
    originalFile: 'gospel-in-old-testament.html',
    href: '/bible-studies/gospel-in-old-testament'
  },
  {
    id: 'bs-gospel-psalms',
    title: 'Gospel Psalms',
    category: 'topical',
    description: 'The Gospel as revealed in the Psalms',
    originalFile: 'gospel-psalms.html',
    href: '/bible-studies/gospel-psalms'
  },
  {
    id: 'bs-gospel-truths-creatures',
    title: 'Gospel Truths from God\'s Creatures',
    category: 'topical',
    description: 'Spiritual lessons from creation',
    originalFile: 'gospel-truths-gods-creatures.html',
    href: '/bible-studies/gospel-truths-gods-creatures'
  },
  {
    id: 'bs-gospel-words-proverbs',
    title: 'Gospel Words from Proverbs',
    category: 'topical',
    description: 'Gospel truths found in Proverbs',
    originalFile: 'gospel-words-from-proverbs.html',
    href: '/bible-studies/gospel-words-from-proverbs'
  },
  {
    id: 'bs-i-will',
    title: 'I Will',
    category: 'topical',
    description: 'God\'s promises and declarations',
    originalFile: 'i-will.html',
    href: '/bible-studies/i-will'
  },
  {
    id: 'bs-incarnation',
    title: 'The Incarnation',
    category: 'topical',
    description: 'Study on Christ\'s incarnation',
    originalFile: 'incarnation.html',
    href: '/bible-studies/incarnation'
  },
  {
    id: 'bs-lords-supper',
    title: 'The Lord\'s Supper',
    category: 'topical',
    description: 'Understanding the Lord\'s Supper',
    originalFile: 'lords-supper.html',
    href: '/bible-studies/lords-supper'
  },
  {
    id: 'bs-motto',
    title: 'Church Motto Studies',
    category: 'topical',
    description: 'Studies on the church motto',
    originalFile: 'motto.html',
    href: '/bible-studies/motto'
  },
  {
    id: 'bs-redemption',
    title: 'Redemption',
    category: 'topical',
    description: 'Understanding biblical redemption',
    originalFile: 'redemption.html',
    href: '/bible-studies/redemption'
  },
  {
    id: 'bs-resurrection',
    title: 'The Resurrection',
    category: 'topical',
    description: 'Study on Christ\'s resurrection',
    originalFile: 'resurrection.html',
    href: '/bible-studies/resurrection'
  },
  {
    id: 'bs-world-crisis',
    title: 'A World in Crisis',
    category: 'topical',
    description: 'Biblical perspective on world events',
    originalFile: 'a-world-in-crisis.html',
    href: '/bible-studies/world-in-crisis'
  },
  {
    id: 'bs-7-sayings',
    title: 'Seven Sayings from the Cross',
    category: 'topical',
    description: 'Christ\'s words from the cross',
    originalFile: 'copy-of-7-sayings.html',
    href: '/bible-studies/seven-sayings'
  },
  {
    id: 'bs-bible-answer',
    title: 'The Bible\'s Answer',
    category: 'topical',
    description: 'Biblical answers to life\'s questions',
    originalFile: 'copy-of-bible-answer.html',
    href: '/bible-studies/bible-answer'
  },
  {
    id: 'bs-easter',
    title: 'Easter Studies',
    category: 'topical',
    description: 'Studies on the resurrection',
    originalFile: 'copy-of-easter.html',
    href: '/bible-studies/easter'
  },
  {
    id: 'bs-names-god-ot',
    title: 'Names of God in the Old Testament',
    category: 'topical',
    description: 'Exploring the names of God',
    originalFile: 'copy-of-names-god-ot.html',
    href: '/bible-studies/names-of-god-ot'
  },
  {
    id: 'bs-sermon-mount',
    title: 'The Sermon on the Mount',
    category: 'topical',
    description: 'Study through Matthew 5-7',
    originalFile: 'copy-of-sermon-on-the-mount.html',
    href: '/bible-studies/sermon-on-the-mount'
  },
  {
    id: 'bs-spiritual-checkup',
    title: 'Spiritual Check-Up',
    category: 'topical',
    description: 'Examining our spiritual health',
    originalFile: 'copy-of-spiritual-check-up.html',
    href: '/bible-studies/spiritual-checkup'
  },
  {
    id: 'bs-ten-commandments',
    title: 'The Ten Commandments',
    category: 'topical',
    description: 'Study on the Ten Commandments',
    originalFile: 'copy-of-the-ten-commandments.html',
    href: '/bible-studies/ten-commandments'
  },
  {
    id: 'bs-verily',
    title: 'Verily, Verily',
    category: 'topical',
    description: 'Christ\'s "Verily" sayings',
    originalFile: 'copy-of-verily.html',
    href: '/bible-studies/verily'
  },
  {
    id: 'bs-what-is-god-like',
    title: 'What is God Like?',
    category: 'topical',
    description: 'Understanding God\'s character',
    originalFile: 'copy-of-what-is-god-like.html',
    href: '/bible-studies/what-is-god-like'
  }
]

// Articles from the blog section
export const migratedArticles: Article[] = [
  // Thessalonians Series
  {
    id: 'art-thess-1-1',
    title: '1 Thessalonians 1:1 - Grace Be Unto You and Peace',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-1-grace-be-unto-you-and-peace-from-god-our-father-and-the-lord-jesus-christ.html',
    href: '/articles/thessalonians-1-1'
  },
  {
    id: 'art-thess-1-2',
    title: '1 Thessalonians 1:2 - We Give Thanks to God Always',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-2-we-give-thanks-to-god-always-for-you-all-making-mention-of-you-in-our-prayers.html',
    href: '/articles/thessalonians-1-2'
  },
  {
    id: 'art-thess-1-3',
    title: '1 Thessalonians 1:3 - Remembering Your Work of Faith',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-3-remembering-without-ceasing-your-work-of-faith.html',
    href: '/articles/thessalonians-1-3'
  },
  {
    id: 'art-thess-1-5',
    title: '1 Thessalonians 1:5 - Our Gospel Came Not in Word Only',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-5-for-our-gospel-came-not-unto-you-in-word-only-but-also-in-power.html',
    href: '/articles/thessalonians-1-5'
  },
  {
    id: 'art-thess-1-6',
    title: '1 Thessalonians 1:6 - Ye Became Followers of Us and of the Lord',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-6-and-ye-became-followers-of-us-and-of-the-lord.html',
    href: '/articles/thessalonians-1-6'
  },
  {
    id: 'art-thess-1-7',
    title: '1 Thessalonians 1:7 - Ye Were Examples to All That Believe',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-7-so-that-ye-were-ensamples-to-all-that-believe-in-macedonia-and-achaia.html',
    href: '/articles/thessalonians-1-7'
  },
  {
    id: 'art-thess-1-9',
    title: '1 Thessalonians 1:9 - How Ye Turned to God from Idols',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-9-for-they-themselves-shew-of-us-what-manner-of-entering-in-we-had-unto-you.html',
    href: '/articles/thessalonians-1-9'
  },
  {
    id: 'art-thess-1-10',
    title: '1 Thessalonians 1:10 - To Wait for His Son from Heaven',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-1-v-10-and-to-wait-for-his-son-from-heaven-whom-he-raised-from-the-dead.html',
    href: '/articles/thessalonians-1-10'
  },
  // Isaiah Series
  {
    id: 'art-isaiah-1',
    title: 'Salvation in Isaiah - Chapter 1',
    series: 'Salvation in Isaiah',
    category: 'Bible Exposition',
    originalFile: 'salvation-in-isaiah-chapter-1.html',
    href: '/articles/salvation-isaiah-1'
  },
  {
    id: 'art-isaiah-2',
    title: 'Salvation in Isaiah - Chapter 2',
    series: 'Salvation in Isaiah',
    category: 'Bible Exposition',
    originalFile: 'salvation-in-isaiah-chapter-2.html',
    href: '/articles/salvation-isaiah-2'
  },
  // Ephesians Series
  {
    id: 'art-eph-5-18',
    title: 'Ephesians 5:18 - Be Filled with the Spirit',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-5-v-18.html',
    href: '/articles/ephesians-5-18'
  },
  {
    id: 'art-eph-5-19-20',
    title: 'Ephesians 5:19-20 - Speaking in Psalms and Hymns',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-5-v-19-20.html',
    href: '/articles/ephesians-5-19-20'
  },
  // Lord's Prayer Series
  {
    id: 'art-lords-prayer-intro',
    title: 'The Lord\'s Prayer - Introduction',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-9-13-introduction.html',
    href: '/articles/lords-prayer-introduction'
  },
  {
    id: 'art-lords-prayer-our-father',
    title: 'Our Father Which Art in Heaven',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-9-our-father.html',
    href: '/articles/lords-prayer-our-father'
  },
  {
    id: 'art-lords-prayer-hallowed',
    title: 'Hallowed Be Thy Name',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-9-hallowed-be-thy-name.html',
    href: '/articles/lords-prayer-hallowed'
  },
  {
    id: 'art-lords-prayer-kingdom',
    title: 'Thy Kingdom Come',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-10-thy-kingdom-come.html',
    href: '/articles/lords-prayer-kingdom'
  },
  // Church Nature Series
  {
    id: 'art-church-nature-1',
    title: 'The True Nature of a Gospel Church - Part 1',
    series: 'The True Nature of a Gospel Church',
    category: 'Church Life',
    originalFile: 'the-true-nature-of-a-gospel-church-1.html',
    href: '/articles/church-nature-1'
  },
  {
    id: 'art-church-nature-2',
    title: 'The True Nature of a Gospel Church - Part 2',
    series: 'The True Nature of a Gospel Church',
    category: 'Church Life',
    originalFile: 'the-true-nature-of-a-gospel-church-2.html',
    href: '/articles/church-nature-2'
  },
  // News and Bulletins
  {
    id: 'art-june-2025-bulletin',
    title: 'June 2025 Bulletin',
    category: 'News',
    date: '2025-06-01',
    originalFile: 'june-2025-bulletin.html',
    href: '/articles/june-2025-bulletin'
  },
  {
    id: 'art-may-2025-bulletin',
    title: 'May 2025 Bulletin',
    category: 'News',
    date: '2025-05-01',
    originalFile: 'may-2025-bulletin.html',
    href: '/articles/may-2025-bulletin'
  },
  {
    id: 'art-wvec-latest-news',
    title: 'WVEC Latest News',
    category: 'News',
    originalFile: 'wvec-latest-news.html',
    href: '/articles/wvec-latest-news'
  },
  {
    id: 'art-creation-lectures',
    title: 'Creation Lectures - 24th July',
    category: 'Events',
    date: '2022-07-24',
    originalFile: 'creation-lectures-24th-july.html',
    href: '/articles/creation-lectures-24th-july'
  },
  // Standalone Articles
  {
    id: 'art-redemption-power',
    title: 'The Power of Redemption',
    category: 'Doctrine',
    originalFile: 'the-power-of-redemption-and-it-is-particular-redemption.html',
    href: '/articles/redemption-power'
  },
  {
    id: 'art-redemption-price',
    title: 'The Price of Redemption',
    category: 'Doctrine',
    originalFile: 'the-price-of-redemption.html',
    href: '/articles/redemption-price'
  },
  {
    id: 'art-redemption-practicality',
    title: 'The Practicality of Redemption',
    category: 'Doctrine',
    date: '2002-03-31',
    originalFile: '31-03-2002-the-practicality-of-redemption.html',
    href: '/articles/redemption-practicality'
  },
  {
    id: 'art-abc-bible',
    title: 'The ABC of the Bible',
    category: 'Bible Study',
    originalFile: 'the-abc-of-the-bible.html',
    href: '/articles/abc-bible'
  },
  {
    id: 'art-cross',
    title: 'The Cross',
    category: 'Doctrine',
    originalFile: 'the-cross.html',
    href: '/articles/the-cross'
  },
  {
    id: 'art-faces-king',
    title: 'The Faces of the King',
    category: 'Christ',
    originalFile: 'the-faces-of-the-king.html',
    href: '/articles/faces-of-king'
  },
  {
    id: 'art-hope',
    title: 'Hope',
    category: 'Christian Living',
    originalFile: '_hope.html',
    href: '/articles/hope'
  },
  {
    id: 'art-footprints',
    title: 'Footprints',
    category: 'Christian Living',
    originalFile: 'footprints.html',
    href: '/articles/footprints'
  },
  {
    id: 'art-great-mistake',
    title: 'A Great Mistake',
    category: 'Evangelism',
    originalFile: 'a-great-mistake.html',
    href: '/articles/great-mistake'
  },
  {
    id: 'art-heaven-real',
    title: 'Is Heaven Real?',
    category: 'Heaven',
    originalFile: 'is_heaven_real.html',
    href: '/articles/heaven-real'
  },
  {
    id: 'art-sin-problem',
    title: 'Sin - The World\'s Biggest Problem',
    category: 'Evangelism',
    originalFile: 'sin-the-worlds-biggest-problem.html',
    href: '/articles/sin-problem'
  },
  {
    id: 'art-peace-quiet',
    title: 'Oh for Peace and a Quiet Life',
    category: 'Christian Living',
    originalFile: 'oh-for-peace-and-a-quiet-life.html',
    href: '/articles/peace-quiet-life'
  },
  {
    id: 'art-obedience-blessing',
    title: 'Obedience Brings Blessing - Jeremiah 11',
    category: 'Bible Exposition',
    originalFile: 'obedience-brings-blessing-jeremiah-11.html',
    href: '/articles/obedience-blessing'
  },
  // Additional Thessalonians Studies
  {
    id: 'art-thess-intro',
    title: 'Paul\'s First Letter to the Thessalonians - Introduction',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: 'paul-s-first-letter-to-the-thessalonians-introduction.html',
    href: '/articles/thessalonians-introduction'
  },
  {
    id: 'art-thess-2-1',
    title: '1 Thessalonians 2:1 - For yourselves, brethren, know our entrance in unto you',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-1-for-yourselves-brethren-know-our-entrance-in-unto-you.html',
    href: '/articles/thessalonians-2-1'
  },
  {
    id: 'art-thess-2-2',
    title: '1 Thessalonians 2:2 - But even after that we had suffered before',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-2-but-even-after-that-we-had-suffered-before-and-were-shamefully-entreated.html',
    href: '/articles/thessalonians-2-2'
  },
  {
    id: 'art-thess-2-5',
    title: '1 Thessalonians 2:5 - For neither at any time used we flattering words',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-5-for-neither-at-any-time-used-we-flattering-words.html',
    href: '/articles/thessalonians-2-5'
  },
  {
    id: 'art-thess-2-9',
    title: '1 Thessalonians 2:9 - For ye remember, brethren, our labour and travail',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-9-for-ye-remember-brethren-our-labour-and-travail.html',
    href: '/articles/thessalonians-2-9'
  },
  {
    id: 'art-thess-2-12',
    title: '1 Thessalonians 2:12 - That ye would walk worthy of God',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-12-that-ye-would-walk-worthy-of-god-who-hath-called-you-unto-his-kingdom-and-gl.html',
    href: '/articles/thessalonians-2-12'
  },
  {
    id: 'art-thess-2-13',
    title: '1 Thessalonians 2:13 - For this cause also thank we God without ceasing',
    series: '1 & 2 Thessalonians',
    category: 'Bible Exposition',
    originalFile: '1-thessalonians-2-v-13-for-this-cause-also-thank-we-god-without-ceasing-because.html',
    href: '/articles/thessalonians-2-13'
  },
  // Additional Matthew Studies
  {
    id: 'art-lords-prayer-lead-not',
    title: 'Matthew 6:13 - And lead us not into temptation',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-13-and-lead-us-not-into-temptation.html',
    href: '/articles/lords-prayer-lead-not-temptation'
  },
  {
    id: 'art-lords-prayer-deliver-evil',
    title: 'Matthew 6:13 - But deliver us from evil',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-13-but-deliver-us-from-evil.html',
    href: '/articles/lords-prayer-deliver-evil'
  },
  {
    id: 'art-lords-prayer-thine-kingdom',
    title: 'Matthew 6:13 - For thine is the kingdom, and the power, and the glory',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-13-for-thine-is-the-kingdom-and-the-power-and-the-glory-for-ever-amen.html',
    href: '/articles/lords-prayer-thine-kingdom'
  },
  {
    id: 'art-lords-prayer-summary',
    title: 'The Lord\'s Prayer - Summary',
    series: 'The Lord\'s Prayer',
    category: 'Bible Exposition',
    originalFile: 'matthew-6-v-9-13-summary.html',
    href: '/articles/lords-prayer-summary'
  },
  // Additional Ephesians Studies (Chapter 6)
  {
    id: 'art-eph-6-1-3',
    title: 'Ephesians 6:1-3 - Children and Parents',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-1-3.html',
    href: '/articles/ephesians-6-1-3'
  },
  {
    id: 'art-eph-6-4',
    title: 'Ephesians 6:4 - Fathers, provoke not your children to wrath',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-4.html',
    href: '/articles/ephesians-6-4'
  },
  {
    id: 'art-eph-6-5-8',
    title: 'Ephesians 6:5-8 - Servants and Masters',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-5-8.html',
    href: '/articles/ephesians-6-5-8'
  },
  {
    id: 'art-eph-6-10',
    title: 'Ephesians 6:10 - Be strong in the Lord',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-10.html',
    href: '/articles/ephesians-6-10'
  },
  {
    id: 'art-eph-6-11',
    title: 'Ephesians 6:11 - Put on the whole armour of God',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-11-1.html',
    href: '/articles/ephesians-6-11'
  },
  {
    id: 'art-eph-6-12',
    title: 'Ephesians 6:12 - For we wrestle not against flesh and blood',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-12.html',
    href: '/articles/ephesians-6-12'
  },
  {
    id: 'art-eph-6-13',
    title: 'Ephesians 6:13 - Take unto you the whole armour of God',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-13.html',
    href: '/articles/ephesians-6-13'
  },
  {
    id: 'art-eph-6-14a',
    title: 'Ephesians 6:14a - Stand therefore, having your loins girt about with truth',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-14a.html',
    href: '/articles/ephesians-6-14a'
  },
  {
    id: 'art-eph-6-14b',
    title: 'Ephesians 6:14b - Having on the breastplate of righteousness',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-14b.html',
    href: '/articles/ephesians-6-14b'
  },
  {
    id: 'art-eph-6-15',
    title: 'Ephesians 6:15 - Your feet shod with the preparation of the gospel of peace',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-15.html',
    href: '/articles/ephesians-6-15'
  },
  {
    id: 'art-eph-6-16',
    title: 'Ephesians 6:16 - Taking the shield of faith',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-16.html',
    href: '/articles/ephesians-6-16'
  },
  {
    id: 'art-eph-6-17a',
    title: 'Ephesians 6:17a - Take the helmet of salvation',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-17a.html',
    href: '/articles/ephesians-6-17a'
  },
  {
    id: 'art-eph-6-17b',
    title: 'Ephesians 6:17b - The sword of the Spirit',
    series: 'Ephesians 5-6',
    category: 'Bible Exposition',
    originalFile: 'ephesians-6-v-17b.html',
    href: '/articles/ephesians-6-17b'
  }
]

// Sermons and audio content
export const migratedSermons: Sermon[] = [
  {
    id: 'sermon-listen',
    title: 'Audio Sermons Collection',
    type: 'audio',
    originalFile: 'listen.html',
    href: '/sermons/listen'
  },
  {
    id: 'sermon-read',
    title: 'Written Sermons Collection',
    type: 'text',
    originalFile: 'read.html',
    href: '/sermons/read'
  },
  {
    id: 'lords-day-readings',
    title: 'Lord\'s Day Bible Readings',
    type: 'lords-day',
    originalFile: 'lords-day-bible-readings.html',
    href: '/sermons/lords-day-bible-readings'
  }
]

// Helper function to get all articles by series
export function getArticlesBySeries(seriesName: string): Article[] {
  return migratedArticles.filter(article => article.series === seriesName)
}

// Helper function to get all Bible studies by category
export function getBibleStudiesByCategory(category: BibleStudy['category']): BibleStudy[] {
  return migratedBibleStudies.filter(study => study.category === category)
}

// Helper function to get all content for a specific page
export function getContentForPage(pageType: 'bible-studies' | 'articles' | 'sermons') {
  switch (pageType) {
    case 'bible-studies':
      return migratedBibleStudies
    case 'articles':
      return migratedArticles
    case 'sermons':
      return migratedSermons
    default:
      return []
  }
}