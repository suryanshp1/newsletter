import Link from 'next/link'

interface PaginationProps {
  cursor: string
}

export default function Pagination({ cursor }: PaginationProps) {
  return (
    <div style={{ marginTop: '40px' }}>
      <Link 
        href={`/?cursor=${cursor}`}
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          border: '1px solid var(--text)',
          fontWeight: 600,
          background: 'transparent'
        }}
      >
        Load More
      </Link>
    </div>
  )
}
