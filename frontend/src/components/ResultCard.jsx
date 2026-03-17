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
    <div style={{
      border: '0.5px solid #ddd',
      borderRadius: '12px',
      overflow: 'hidden',
      marginTop: '1.5rem',
      fontFamily: 'sans-serif',
    }}>

      {/* Header */}
      <div style={{
        background: bgColor,
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        borderBottom: '0.5px solid #ddd',
      }}>
        <span style={{
          background: color,
          color: '#fff',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.05em',
          padding: '5px 14px',
          borderRadius: '100px',
        }}>
          {verdict}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#888',
            marginBottom: '4px',
          }}>
            <span>Model confidence</span>
            <span>{Math.round(confidence * 100)}%</span>
          </div>
          <div style={{
            height: '6px',
            background: '#e0e0e0',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.round(confidence * 100)}%`,
              background: color,
              borderRadius: '3px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 800,
            color: color,
            lineHeight: 1,
          }}>
            {credibility_score}
          </div>
          <div style={{ fontSize: '10px', color: '#888' }}>/100 score</div>
        </div>
      </div>

      {/* Score breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid #eee', borderRight: '0.5px solid #eee' }}>
          <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            RSS coverage
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A6B3C' }}>
            {Math.round(rss_score * 100)}%
          </div>
          {matched_sources.length > 0 ? (
            <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {matched_sources.map(s => (
                <span key={s} style={{
                  fontSize: '11px',
                  background: '#f0f0f0',
                  border: '0.5px solid #ddd',
                  borderRadius: '4px',
                  padding: '2px 7px',
                  color: '#555',
                }}>{s}</span>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>No sources matched</div>
          )}
        </div>

        <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid #eee' }}>
          <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Fact-check API
          </div>
          <div style={{ fontSize: '13px', color: '#333', lineHeight: 1.5 }}>
            {api_verdict}
          </div>
        </div>
      </div>

    </div>
  )
}