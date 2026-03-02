export function calculateReadingTime(content: string): number {
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/[*_~]/g, '') // Remove markdown formatting
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
    .trim()

  // Count words (split by whitespace)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 200)

  return readingTimeMinutes
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}
