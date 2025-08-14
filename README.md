# Whiddon Valley Evangelical Church Website

A modern, responsive website for Whiddon Valley Evangelical Church (WVEC) in Barnstaple, North Devon.

## Features

- 🏛️ Church information and service times
- 📖 Bible studies and sermons archive
- 📰 Articles and blog posts
- 📅 Events management
- 🤖 WVGM-4 AI Assistant (Reformed theology chatbot)
- 🔐 Admin portal for content management
- 📱 Fully responsive design
- 🎨 Modern glass morphism UI

## Tech Stack

- **Framework:** Next.js 15.3.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Authentication:** JWT + bcrypt
- **AI Integration:** Claude API (for WVGM-4)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wvec-website.git
cd wvec-website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your values:
```env
# Claude API for WVGM-4
CLAUDE_API_KEY=your_api_key_here

# Admin Configuration
JWT_SECRET=your_secret_key_min_32_chars
ADMIN_EMAILS=admin@example.com
DEFAULT_ADMIN_PASSWORD=Password123
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Portal

Access the admin portal at `/admin` with approved email addresses.

### Admin Features:
- Events management
- Articles/blog management
- Page content editor
- User profile management

## Deployment

### AWS Amplify

1. Push to GitHub
2. Connect repository to AWS Amplify
3. Configure environment variables
4. Deploy

### Vercel

```bash
npm run build
vercel --prod
```

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── admin/       # Admin portal pages
│   ├── api/         # API routes
│   └── ...          # Public pages
├── components/      # React components
├── contexts/        # React contexts
├── lib/            # Utility functions
└── types/          # TypeScript types
```

## Contributing

Please read our contributing guidelines before submitting PRs.

## License

© 2024 Whiddon Valley Evangelical Church. All rights reserved.

## Contact

- **Website:** https://www.wvec.org.uk
- **Email:** wvec.office@gmail.com
- **Phone:** 07504 925423
- **Address:** Stoat Park, Whiddon Valley, Barnstaple, Devon, EX32 8PT