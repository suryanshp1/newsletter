import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const [dark, setDark] = useState(false)

  // On mount, read from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDark(true)
    }
  }, [])

  // Update body class when dark changes
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [dark])

  const toggleMode = () => {
    setDark(!dark)
  }

  return (
    <>
      <div 
        onClick={toggleMode}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontFamily: "'JetBrains Mono', monospace"
        }}
      >
        [ toggle mode ]
      </div>

      <div style={{
        maxWidth: '880px',
        margin: '0 auto',
        padding: '80px 20px'
      }}>
        {children}
      </div>
    </>
  )
}
