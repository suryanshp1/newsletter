import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'

interface SearchableNewsletter {
  slug: string
  title: string
  excerpt: string
  content: string
  tags?: string[]
}

interface SearchProps {
  newsletters: SearchableNewsletter[]
}

export default function Search({ newsletters }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchableNewsletter[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchableNewsletter> | null>(null)

  useEffect(() => {
    // Initialize Fuse.js with search options
    const fuseInstance = new Fuse(newsletters, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    })
    setFuse(fuseInstance)
  }, [newsletters])

  useEffect(() => {
    if (!fuse || !query.trim()) {
      setResults([])
      return
    }

    const searchResults = fuse.search(query)
    setResults(searchResults.map(result => result.item))
  }, [query, fuse])

  return (
    <div style={{ marginBottom: '60px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search dispatches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            border: '1px solid #2221',
            background: 'var(--card)',
            color: 'var(--text)',
            borderRadius: '4px',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--text)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2221'
          }}
        />
        
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--subtle)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              padding: '4px 8px',
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {query && results.length > 0 && (
        <div style={{
          marginTop: '20px',
          border: '1px solid #2221',
          background: 'var(--card)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/newsletter/${result.slug}`}
              style={{
                display: 'block',
                padding: '20px',
                borderBottom: '1px solid #2221',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>
                {result.title}
              </div>
              <div style={{ color: 'var(--subtle)', fontSize: '0.9rem' }}>
                {result.excerpt}
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          textAlign: 'center',
          color: 'var(--subtle)',
        }}>
          No dispatches found for "{query}"
        </div>
      )}
    </div>
  )
}
