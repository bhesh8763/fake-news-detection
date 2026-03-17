import { useState } from 'react'
import { analyzeArticle } from '../api'
import ResultCard from './ResultCard'

const EXAMPLES = [
  {
    label: 'Viral health claim',
    text: 'Scientists have discovered that drinking lemon juice mixed with baking soda cures cancer in 72 hours. Big pharma has been hiding this cure for decades. Share before it gets deleted!',
  },
  {
    label: 'Real news',
    text: 'Nepal\'s government announced a new digital literacy program targeting rural communities across all seven provinces, backed by UNICEF and the Ministry of Education to provide tablets and internet access to 500 schools.',
  },
]

export default function AnalyzeForm() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!text.trim() || text.length < 20) {
      setError('Please enter at least 20 characters.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const data = await analyzeArticle(text)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Is Django running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Example chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>TRY:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={() => setText(ex.text)}
            style={{
              fontSize: '12px',
              background: '#f4f4f4',
              border: '0.5px solid #ddd',
              borderRadius: '100px',
              padding: '5px 12px',
              cursor: 'pointer',
              color: '#444',
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        rows={7}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste a news article, headline, or claim here..."
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: '14px',
          lineHeight: 1.7,
          border: '0.5px solid #ccc',
          borderRadius: '8px',
          resize: 'vertical',
          fontFamily: 'inherit',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Character count + button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
      }}>
        <span style={{ fontSize: '11px', color: '#aaa', fontFamily: 'monospace' }}>
          {text.length} characters
        </span>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: '#0D0D0D',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '9px 22px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          marginTop: '10px',
          padding: '10px 14px',
          background: '#FEF0ED',
          border: '0.5px solid #f5c4b3',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#C8402A',
        }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && <ResultCard result={result} />}
    </div>
  )
}