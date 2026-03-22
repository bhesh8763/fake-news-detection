import AnalyzeForm from '../components/AnalyzeForm'

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-10 pb-16">

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5"/>
              <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight">TruthLens</div>
            <div className="text-xs text-gray-400 font-mono tracking-wider">
              FAKE NEWS DETECTION SYSTEM
            </div>
          </div>
          <div className="ml-auto text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 font-mono">
            B.Sc. CSIT — TU
          </div>
        </div>
        <p className="text-sm text-gray-500 max-w-lg">
          Multilingual news verification using XLM-RoBERTa, RSS cross-verification
          and Google Fact Check API. Supports English and Nepali.
        </p>
      </div>

      {/* Form */}
      <AnalyzeForm />

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between
        text-xs text-gray-300 flex-wrap gap-2">
        <span>Mount Annapurna Campus, Pokhara</span>
        <span>Pawan Gurung · Rupesh Pradhan · Bhesh Bahadur Saru</span>
      </div>

    </main>
  )
}