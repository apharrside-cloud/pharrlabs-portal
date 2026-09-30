import type { AppItem } from '../../types'

const LOOK: Record<AppItem['status'], { dot: string; text: string; label: string }> = {
  online:   { dot: 'bg-emerald-400 animate-pulse', text: 'text-emerald-400', label: 'Online' },
  checking: { dot: 'bg-slate-500 animate-pulse',   text: 'text-slate-400',   label: 'Checking' },
  degraded: { dot: 'bg-amber-400',                 text: 'text-amber-400',   label: 'Degraded' },
  offline:  { dot: 'bg-rose-500',                  text: 'text-rose-400',    label: 'Offline' },
}

/** Driven by real probe results, not a hardcoded "Active". Latency is shown only when measured. */
export function StatusBadge({ status, latencyMs }: { status: AppItem['status']; latencyMs?: number }) {
  const l = LOOK[status]
  return (
    <div
      role="status"
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-white/10 text-xs font-mono ${l.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${l.dot}`} />
      <span>{l.label}</span>
      {latencyMs != null && <span className="text-slate-400">· {latencyMs}ms</span>}
    </div>
  )
}
