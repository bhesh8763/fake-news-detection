'use client'
import { useState } from 'react'
import { analyzeArticle } from '../lib/api'
import ResultCard from './ResultCard'

const EXAMPLES = [
  {
    label: 'Viral health claim',
    text: 'Scientists discovered that drinking lemon juice mixed with baking soda cures cancer in 72 hours. Big pharma has been hiding this cure for decades. Share before it gets deleted!',
  },
  {
    label: 'Real news',
    text: "Nepal's government announced a new digital literacy program targeting rural communities across all seven provinces, backed by UNICEF and the Ministry of Education to provide tablets and internet access to 500 schools.",
  },
  {
    label: 'Nepali article',
    text: 'नेपाल सरकारले देशभरका सात प्रदेशमा नयाँ डिजिटल साक्षरता कार्यक्रम घोषणा गरेको छ। युनिसेफ र शिक्षा मन्त्रालयको साझेदारीमा यो कार्यक्रम सञ्चालन हुनेछ।',
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
      <div className="flex gap-2 flex-wrap mb-4 items-center">
        <span className="text-xs text-gray-400 font-mono">TRY:</span>
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => setText(ex.text)}
            className="text-xs bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer transition">
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
        className="w-full p-3 text-sm leading-relaxed border border-gray-200 rounded-lg resize-y font-inherit outline-none focus:border-gray-400 transition"
      />

      {/* Bottom row */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-300 font-mono">
          {text.length} characters
        </span>
        <button onClick={handleAnalyze} disabled={loading}
          className="bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg cursor-pointer disabled:opacity-50 hover:bg-gray-700 transition">
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Result */}
      {result && <ResultCard result={result} />}
    </div>
  )
}