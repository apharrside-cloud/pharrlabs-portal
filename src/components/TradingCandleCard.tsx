import { ArrowUpDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { AppItem } from '../types'
import { CardShell } from './ui/CardShell'
import { useBtcCandles } from '../lib/useBtcCandles'

const UP = '#10B981'
const DOWN = '#EF4444'

/** Live BTC/USD hourly candles from Coinbase public market data (no key, CORS-open). */
export function TradingCandleCard({ app, index }: { app: AppItem; index?: number }) {
  const { candles, change24h } = useBtcCandles(36)

  const lo = candles.length ? Math.min(...candles.map(c => c.low)) : 0
  const hi = candles.length ? Math.max(...candles.map(c => c.high)) : 1
  const span = hi - lo || 1
  const y = (p: number) => 96 - ((p - lo) / span) * 92 // 4px padding top/bottom
  const step = 240 / Math.max(candles.length, 1)
  const last = candles.at(-1)?.close
  const up = (change24h ?? 0) >= 0

  return (
    <CardShell app={app} title="Alpha Crucible" neon="indigo" index={index} icon={<ArrowUpDown className="w-4 h-4" />}>
      <div className="relative w-full flex-1 min-h-[140px] bg-[#080B12]/80 rounded-2xl border border-slate-800/80 p-2.5 mb-3.5 flex overflow-hidden">
        {change24h != null && (
          <span
            className={`absolute top-2 right-16 z-10 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold flex items-center gap-0.5 ${
              up ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400' : 'bg-rose-950/80 border-rose-500/60 text-rose-400'
            }`}
          >
            {up ? '+' : ''}{change24h.toFixed(2)}% 24h
            {up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
          </span>
        )}

        <div className="flex-1 h-full relative">
          {candles.length === 0 ? (
            <div className="h-full grid place-items-center text-[11px] font-mono text-slate-500 animate-pulse">
              Connecting to Coinbase…
            </div>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 240 100" preserveAspectRatio="none" role="img" aria-label="BTC/USD hourly candlestick chart">
              {[20, 45, 70].map(g => (
                <line key={g} x1="0" y1={g} x2="240" y2={g} stroke="#1E293B" strokeDasharray="3 3" strokeWidth="0.8" />
              ))}
              {candles.map((c, i) => {
                const x = i * step + step / 2
                const color = c.close >= c.open ? UP : DOWN
                const top = y(Math.max(c.open, c.close))
                const h = Math.max(Math.abs(y(c.open) - y(c.close)), 0.8)
                return (
                  <g key={c.t}>
                    <line x1={x} y1={y(c.high)} x2={x} y2={y(c.low)} stroke={color} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <rect x={x - step * 0.3} y={top} width={step * 0.6} height={h} fill={color} rx="0.4" />
                  </g>
                )
              })}
            </svg>
          )}
        </div>

        <div className="w-16 flex flex-col justify-between items-end text-[9px] font-mono text-slate-400 pl-1 border-l border-slate-800/80">
          <span>{Math.round(hi).toLocaleString()}</span>
          <span className="px-1 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[8px] leading-tight">
            {last ? `$${Math.round(last).toLocaleString()}` : '—'}
          </span>
          <span>{Math.round(lo).toLocaleString()}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#080B12]/90 border border-slate-800/80 p-2.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-300 font-bold">
          <span>BTC/USD · {last ? `$${last.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '—'}</span>
          <span className={up ? 'text-emerald-400 text-[11px]' : 'text-rose-400 text-[11px]'}>
            {change24h != null ? `${up ? '+' : ''}${change24h.toFixed(2)}%` : ''}
          </span>
        </div>
      </div>
    </CardShell>
  )
}
