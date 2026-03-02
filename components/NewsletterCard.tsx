import Link from 'next/link'

export interface NewsletterPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
  readingTime: number
}

export interface NewsletterCardProps {
  post: NewsletterPost
}

export default function NewsletterCard({ post }: NewsletterCardProps) {
  return (
    <Link href={`/newsletter/${post.slug}`}>
      <article style={{
        background: 'var(--card)',
        padding: '30px',
        border: '1px solid #2221',
        marginBottom: '30px',
        display: 'block'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <strong>{post.title}</strong>
          <span style={{
            marginLeft: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem',
            color: 'var(--subtle)',
          }}>
            {post.readingTime} min read
          </span>
        </div>
        
        <p style={{
          color: 'var(--subtle)',
          marginBottom: '12px'
        }}>
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  border: '1px solid #2221',
                  borderRadius: '3px',
                  color: 'var(--subtle)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text)'
                  e.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2221'
                  e.currentTarget.style.color = 'var(--subtle)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
