import { useState } from "react"
import { reviewCode } from "./api"
import ResultPanel from "./components/ResultPanel"

const LANGUAGES = ["auto", "python", "javascript", "typescript", "java", "go", "rust", "c++", "other"]

const PLACEHOLDER = `# Paste your code here — any language works
def find_user(id):
    users = get_all_users()
    for user in users:
        if user.id == id:
            return user
`

export default function App() {
  const [code, setCode]         = useState("")
  const [language, setLanguage] = useState("auto")
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  async function handleReview() {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const data = await reviewCode(code, language)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] font-sans">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold">P</div>
          <span className="font-semibold text-white tracking-tight">PromptAudit</span>
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">beta</span>
        </div>
        <span className="text-xs text-slate-500">AI-powered code review</span>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-14 pb-8 text-center space-y-3">
        <h1 className="text-4xl font-semibold text-white tracking-tight">Review your code with AI</h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Paste any snippet. Get bugs, refactoring suggestions, and a cleaner version — instantly.
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Your Code</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {LANGUAGES.map(l => (
                <option key={l} value={l}>{l === "auto" ? "Auto-detect" : l}</option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full h-80 bg-slate-900 border border-slate-700/60 rounded-xl p-4 font-mono text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition"
            placeholder={PLACEHOLDER}
            value={code}
            onChange={e => setCode(e.target.value)}
          />

          <button
            onClick={handleReview}
            disabled={loading || !code.trim()}
            className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing...
              </>
            ) : "Run Review →"}
          </button>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Review Results</label>
          {!result && !loading && (
            <div className="h-80 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-600 text-sm">
              Results will appear here
            </div>
          )}
          {loading && (
            <div className="h-80 rounded-xl border border-slate-700 bg-slate-800/30 flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
              <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
              AI is reading your code...
            </div>
          )}
          {result && <ResultPanel result={result} />}
        </div>
      </main>
    </div>
  )
}
