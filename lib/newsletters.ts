import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from './readingTime'

const newslettersDir = path.join(process.cwd(), 'content/newsletters')

interface NewsletterFrontmatter {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  [key: string]: any
}

export interface Newsletter {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  readingTime: number
  [key: string]: any
}

export function getAllNewsletters(): Newsletter[] {
  const files = fs.readdirSync(newslettersDir)

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const fileContent = fs.readFileSync(
      path.join(newslettersDir, filename),
      'utf-8'
    )

    const { data, content } = matter(fileContent)
    const readingTime = calculateReadingTime(content)

    return {
      slug,
      ...(data as NewsletterFrontmatter),
      content,
      readingTime
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPaginatedNewsletters(cursor?: string, limit = 5): {
  posts: Newsletter[]
  nextCursor: string | null
} {
  const all = getAllNewsletters()

  let startIndex = 0

  if (cursor) {
    const index = all.findIndex(post => post.slug === cursor)
    startIndex = index + 1
  }

  const paginated = all.slice(startIndex, startIndex + limit)
  const nextCursor = paginated.length === limit 
    ? paginated[paginated.length - 1].slug
    : null

  return {
    posts: paginated,
    nextCursor
  }
}