const fs = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

const newslettersDir = path.join(process.cwd(), 'content/newsletters')

function getAllNewsletters() {
  const files = fs.readdirSync(newslettersDir)

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const fileContent = fs.readFileSync(
      path.join(newslettersDir, filename),
      'utf-8'
    )

    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function generateRSS() {
  const newsletters = getAllNewsletters()

  const feed = new RSS({
    title: 'The Systems CTO Dispatch',
    description: 'Architecture. AI Automation. Distributed Systems. No hype. No noise. Only execution.',
    feed_url: 'https://suryanshp1.github.io/newsletter/rss.xml',
    site_url: 'https://suryanshp1.github.io/newsletter',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  newsletters.forEach((newsletter) => {
    feed.item({
      title: newsletter.title,
      description: newsletter.excerpt,
      url: `https://suryanshp1.github.io/newsletter/newsletter/${newsletter.slug}`,
      date: newsletter.date,
      guid: newsletter.slug,
      custom_elements: [
        { 'content:encoded': newsletter.content },
      ],
    })
  })

  return feed.xml({ indent: true })
}

function generateSitemap() {
  const newsletters = getAllNewsletters()

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://suryanshp1.github.io/newsletter</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${newsletters
    .map(({ slug, date }) => {
      return `
  <url>
    <loc>https://suryanshp1.github.io/newsletter/newsletter/${slug}</loc>
    <lastmod>${new Date(date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('')}
</urlset>`
}

// Generate files
const outDir = path.join(process.cwd(), 'out')

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Write RSS feed
const rssContent = generateRSS()
fs.writeFileSync(path.join(outDir, 'rss.xml'), rssContent)
console.log('✓ Generated rss.xml')

// Write sitemap
const sitemapContent = generateSitemap()
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapContent)
console.log('✓ Generated sitemap.xml')
