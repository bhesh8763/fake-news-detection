import AnalyzeForm from './components/AnalyzeForm'

export default function App() {
  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '2rem 1.5rem 4rem',
      fontFamily: 'system-ui, sans-serif',
      color: '#111',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: '#0D0D0D',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5"/>
              <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>TruthLens</div>
            <div style={{ fontSize: '11px', color: '#888', letterSpacing: '0.06em', fontFamily: 'monospace' }}>
              FAKE NEWS DETECTION SYSTEM
            </div>
          </div>
          <div style={{
            marginLeft: 'auto',
            fontSize: '11px',
            color: '#888',
            border: '0.5px solid #ddd',
            borderRadius: '4px',
            padding: '3px 8px',
            fontFamily: 'monospace',
          }}>
            B.Sc. CSIT — Tribhuvan University
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#666', margin: 0, maxWidth: '500px' }}>
          Multilingual news verification using XLM-RoBERTa, RSS cross-verification & Google Fact Check API. Supports English and Nepali.
        </p>
      </div>

      {/* Main form */}
      <AnalyzeForm />

      {/* Footer */}
      <div style={{
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #eee',
        fontSize: '12px',
        color: '#aaa',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <span>Mount Annapurna Campus, Pokhara</span>
        <span>Pawan Gurung · Rupesh Pradhan · Bhesh Bahadur Saru</span>
      </div>

    </div>
  )
}