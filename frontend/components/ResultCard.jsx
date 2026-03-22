export default function ResultCard({ result }) {
  const { verdict, confidence, credibility_score,
          matched_sources, api_verdict, rss_score } = result

  const color = verdict === 'FAKE' ? '#C8402A'
              : verdict === 'REAL' ? '#1A6B3C'
              : '#8B6914'

  const bgColor = verdict === 'FAKE' ? '#FEF0ED'
                : verdict === 'REAL' ? '#E8F5EE'
                : '#FEF7E6'

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mt-6">

      {/* Header */}
      <div style={{ background: bgColor }}
        className="p-4 flex items-center gap-4 border-b border-gray-200">
        <span style={{ background: color }}
          className="text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full">
          {verdict}
        </span>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Model confidence</span>
            <span>{Math.round(confidence * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div style={{
              width: `${Math.round(confidence * 100)}%`,
              background: color,
              transition: 'width 0.6s ease'
            }} className="h-full rounded-full" />
          </div>
        </div>
        <div className="text-right">
          <div style={{ color }} className="text-3xl font-black leading-none">
            {credibility_score}
          </div>
          <div className="text-xs text-gray-400">/100 score</div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2">
        <div className="p-4 border-b border-r border-gray-100">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            RSS coverage
          </div>
          <div className="text-xl font-bold text-green-700">
            {Math.round(rss_score * 100)}%
          </div>
          {matched_sources.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {matched_sources.map(s => (
                <span key={s}
                  className="text-xs bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-gray-500">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-300 mt-1">No sources matched</div>
          )}
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Fact-check API
          </div>
          <div className="text-sm text-gray-600 leading-relaxed">
            {api_verdict}
          </div>
        </div>
      </div>

    </div>
  )
}