# The Systems CTO Dispatch

A minimalist, high-performance newsletter platform built with Next.js, featuring RSS feeds, full-text search, reading time estimates, and SEO optimization.

**Live Site:** [https://suryanshp1.github.io/newsletter](https://suryanshp1.github.io/newsletter)

## Features

- **📰 MDX Support** - Write newsletters in Markdown with React components
- **🔍 Full-Text Search** - Fuzzy search powered by Fuse.js
- **📊 Reading Time** - Automatic reading time calculation
- **🏷️ Tag System** - Organize content with tags
- **📱 Responsive Design** - Mobile-first, minimalist aesthetic
- **🔗 RSS Feed** - Auto-generated RSS feed for subscribers
- **🗺️ Sitemap** - SEO-optimized sitemap generation
- **⚡ Static Export** - Fast, deployable to GitHub Pages
- **🎨 Dark Theme** - Professional dark mode design
- **♿ Accessible** - Semantic HTML and ARIA labels
- **📈 SEO Optimized** - Open Graph and Twitter Card meta tags

## Installation

```bash
# Clone the repository
git clone https://github.com/suryanshp1/newsletter.git
cd newsletter

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your newsletter.

## Build and Deployment

### Build for Production

```bash
# Generate static export
npm run build

# Test the production build locally
npx serve out
```

### Deploy to GitHub Pages

1. **Configure GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to "GitHub Actions"

2. **Automatic Deployment:**
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be live at `https://suryanshp1.github.io/newsletter`

3. **Manual Deployment:**
   ```bash
   npm run build
   npm run deploy
   ```

The `.github/workflows/deploy.yml` file handles automatic deployments.

## Configuration

### Site Settings

Update these files with your information:

**`next.config.js`** - Base path and export settings
```javascript
module.exports = {
  basePath: '/newsletter',
  output: 'export',
  images: { unoptimized: true }
}
```

**`pages/_document.tsx`** - Site metadata and fonts

**`pages/index.tsx`** - Homepage content and title

### Adding Newsletters

1. Create a new `.mdx` file in `content/newsletters/`
2. Add frontmatter:

```mdx
---
title: "Your Newsletter Title"
date: "2024-01-15"
excerpt: "A brief description of your newsletter content."
tags: ["architecture", "ai", "systems"]
---

Your newsletter content here...
```

3. Build and deploy - the newsletter will automatically appear

### Customizing Styles

- **Global styles:** `styles/globals.css`
- **Component styles:** Inline styles in component files
- **Colors:** CSS variables in `globals.css`

## Project Structure

```
newsletter/
├── components/          # React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── NewsletterCard.tsx
│   ├── Pagination.tsx
│   └── Search.tsx
├── content/
│   └── newsletters/    # MDX newsletter files
├── lib/                # Utility functions
│   ├── newsletters.ts  # Newsletter data fetching
│   └── readingTime.ts  # Reading time calculation
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx       # Homepage
│   └── newsletter/
│       └── [slug].tsx  # Individual newsletter page
├── public/             # Static assets
├── scripts/
│   └── generate-feeds.js  # RSS and sitemap generation
├── styles/
│   └── globals.css     # Global styles
└── next.config.js      # Next.js configuration
```

## Technologies Used

- **[Next.js](https://nextjs.org/)** - React framework with static export
- **[MDX](https://mdxjs.com/)** - Markdown with JSX support
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Fuse.js](https://fusejs.io/)** - Fuzzy search
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[RSS](https://github.com/dylang/node-rss)** - RSS feed generation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS (minimal usage)

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Adding Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Create pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Built for The Systems CTO Dispatch - Architecture, AI Automation, and Distributed Systems.
