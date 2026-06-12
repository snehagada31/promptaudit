const colors = {
  Low:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15   text-amber-400   border-amber-500/30",
  High:   "bg-red-500/15     text-red-400     border-red-500/30",
}
export default function ComplexityBadge({ level }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[level] ?? colors.Medium}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {level} Complexity
    </span>
  )
}
