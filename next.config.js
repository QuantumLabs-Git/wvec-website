/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
  images: {
    domains: ['i.ytimg.com', 'd1kn6tkqtghxrg.cloudfront.net'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig