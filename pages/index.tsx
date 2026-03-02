import { getPaginatedNewsletters, getAllNewsletters } from '../lib/newsletters'
import Layout from '../components/Layout'
import NewsletterCard, { NewsletterPost } from '../components/NewsletterCard'
import Pagination from '../components/Pagination'
import Search from '../components/Search'
import Head from 'next/head'

interface HomeProps {
  posts: NewsletterPost[]
  nextCursor: string | null
  allNewsletters: Array<{
    slug: string
    title: string
    excerpt: string
    content: string
    tags?: string[]
  }>
}

export default function Home({ posts, nextCursor, allNewsletters }: HomeProps) {
  return (
    <>
      <Head>
        <title>The Systems CTO Dispatch | Architecture, AI Automation, Distributed Systems</title>
        <meta name="description" content="Architecture. AI Automation. Distributed Systems. No hype. No noise. Only execution." />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Systems CTO Dispatch" />
        <meta property="og:description" content="Architecture. AI Automation. Distributed Systems. No hype. No noise. Only execution." />
        <meta property="og:url" content="https://suryanshp1.github.io/newsletter" />
        <meta property="og:image" content="https://suryanshp1.github.io/newsletter/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="The Systems CTO Dispatch" />
        <meta name="twitter:description" content="Architecture. AI Automation. Distributed Systems. No hype. No noise. Only execution." />
        <meta name="twitter:image" content="https://suryanshp1.github.io/newsletter/og-image.png" />
      </Head>

      <Layout>
        <div style={{ marginBottom: '100px' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '20px'
          }}>
            The Systems CTO Dispatch
          </h1>
          <p style={{
            marginBottom: '20px',
            color: 'var(--subtle)'
          }}>
            Architecture. AI Automation. Distributed Systems.<br />
            No hype. No noise. Only execution.
          </p>
          <a 
            href="#subscribe"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              border: '1px solid var(--text)',
              fontWeight: 600,
              marginTop: '20px'
            }}
          >
            Subscribe →
          </a>
        </div>

        <Search newsletters={allNewsletters} />

        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: 600,
          marginTop: '80px',
          marginBottom: '20px'
        }}>
          Recent Dispatches
        </h2>

        {posts.map(post => (
          <NewsletterCard key={post.slug} post={post} />
        ))}

        {nextCursor && <Pagination cursor={nextCursor} />}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const { posts, nextCursor } = getPaginatedNewsletters()
  const allNewsletters = getAllNewsletters()

  return {
    props: {
      posts,
      nextCursor,
      allNewsletters: allNewsletters.map(n => ({
        slug: n.slug,
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        tags: n.tags
      }))
    }
  }
}
