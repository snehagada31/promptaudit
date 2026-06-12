import ComplexityBadge from "./ComplexityBadge"

function Section({ title, icon, items }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-300 bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/40">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResultPanel({ result }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-slate-200 leading-relaxed">{result.summary}</p>
          <ComplexityBadge level={result.complexity} />
        </div>
      </div>
      <Section title="Issues Found" icon="⚠️" items={result.bugs} />
      <Section title="Suggestions" icon="💡" items={result.suggestions} />
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">✨ Refactored Version</h3>
        <pre className="font-mono text-xs text-emerald-300 bg-slate-900 border border-slate-700/50 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
          {result.refactored}
        </pre>
      </div>
    </div>
  )
}
