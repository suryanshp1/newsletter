import { getAllNewsletters } from '../../lib/newsletters'
import Layout from '../../components/Layout'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import Head from 'next/head'

interface NewsletterProps {
  post: {
    title: string
    slug: string
    date: string
    excerpt: string
    tags?: string[]
    readingTime: number
  }
  mdxSource: MDXRemoteSerializeResult
}

export default function Newsletter({ post, mdxSource }: NewsletterProps) {
  const pageUrl = `https://suryanshp1.github.io/newsletter/newsletter/${post.slug}`
  const imageUrl = `https://suryanshp1.github.io/newsletter/og-image.png` // You can create dynamic OG images later

  return (
    <>
      <Head>
        <title>{post.title} | The Systems CTO Dispatch</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={pageUrl} />
        
        {/* Additional Meta */}
        <link rel="canonical" href={pageUrl} />
      </Head>

      <Layout>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            marginBottom: '40px',
            color: 'var(--subtle)',
            fontWeight: 600
          }}
        >
          ← Back to Dispatches
        </Link>
        
        <article style={{
          maxWidth: '100%'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.9rem',
              color: 'var(--subtle)',
            }}>
              {post.readingTime} min read
            </span>

            {post.tags && post.tags.length > 0 && (
              <>
                <span style={{ color: 'var(--subtle)' }}>•</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.85rem',
                        padding: '4px 10px',
                        border: '1px solid #2221',
                        borderRadius: '3px',
                        color: 'var(--subtle)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div style={{
            lineHeight: '1.8',
            color: 'var(--text)'
          }}>
            <MDXRemote {...mdxSource} />
          </div>
        </article>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllNewsletters()

  return {
    paths: posts.map(p => ({ params: { slug: p.slug }})),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const posts = getAllNewsletters()
  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  const mdxSource = await serialize(post.content)

  return {
    props: {
      post: {
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime: post.readingTime
      },
      mdxSource
    }
  }
}
