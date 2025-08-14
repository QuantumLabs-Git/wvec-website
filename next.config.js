/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
  images: {
    domains: ['i.ytimg.com'],
  },
}

module.exports = nextConfig