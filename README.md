# Parop - Crypto News Blog

A modern, responsive Crypto news blog in Turkish built with Next.js 14, featuring automatic web scraping, AI-powered content generation, and MongoDB integration.

## Features

- 🚀 Built with Next.js 14 App Router
- 💾 MongoDB database integration
- 🤖 Intelligent and automated web scraping with Puppeteer
- 🧠 AI-powered content generation using Google's Gemini AI
- 🎨 Modern UI with Tailwind CSS and Shadcn/UI
- 📱 Fully responsive design
- 🔍 Full-text search functionality
- 🌐 SEO optimized server-side rendering for better search engine visibility with metadata and JSON-LD
- 🖼️ Optimized image loading with blur placeholders
- 🔄 Auto-updating content system with cron-job

## Tech Stack

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI Components
  - FontAwesome Icons
- **Backend:**
  - Node.js
  - MongoDB
  - Mongoose
- **Content Generation and Web Scraping:**
  - Google Generative AI (Gemini 1.5 pro)
  - Puppeteer
  - Cheerio
  - Remark

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ozanisgor/Parop.git
cd parop
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables(Some of them targeted website specific):
   Create a `.env.local` file in the root directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_gemini_ai_api_key
SOURCE_URL=your_source_url_for_web_scraping
CRON_JOB_SECRET_TOKEN=access_token_for_scrape
ALLOWED_IPS=allowed_ip_addresses_for_scraping
NEXT_PUBLIC_API_URL=your_api_url
TAG=tag_for_filtering_scrape_content
PROMPT=your_ai_prompt_configuration
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

- `GET /api/posts` - Fetch all blog posts
- `GET /api/posts/:slug` - Fetch single post
- `GET /api/featured` - Fetch featured posts
- `GET /api/scrape` - Trigger web scraping and content generating

To send request from terminal with access token

```bash
curl -H "x-cron-job-token: your_created_access_token" http://localhost:3000/api/scrape
```

## Features in Detail

### Automated Content Scraping

The application automatically scrapes Crypto news content using Puppeteer and Cheerio, storing it in MongoDB.

### AI Content Generation

Uses Google's Gemini AI to process and enhance scraped content, generating:

- Translated content summaries in Turkish
- Article tags
- Reading time estimates

### Image Optimization

- Automatic WebP conversion
- Blur placeholder generation
- Responsive images with Next.js Image component

### SEO Optimization

- Dynamic metadata
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
