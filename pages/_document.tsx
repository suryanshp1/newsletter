import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:wght@600;800&family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
        
        {/* Base Meta Tags */}
        <meta name="description" content="Architecture. AI Automation. Distributed Systems. No hype. No noise. Only execution." />
        <meta name="keywords" content="systems architecture, CTO, distributed systems, AI automation, software engineering" />
        <meta name="author" content="The Systems CTO Dispatch" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Systems CTO Dispatch" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:creator" content="@yourtwitterhandle" /> */}
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="The Systems CTO Dispatch RSS Feed" href="/rss.xml" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
