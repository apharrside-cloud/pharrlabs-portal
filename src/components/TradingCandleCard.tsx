import React from 'react'
import { ArrowUpDown, ArrowUpRight } from 'lucide-react'
import type { AppItem } from '../types'

interface TradingCandleCardProps {
  app: AppItem
}

export const TradingCandleCard: React.FC<TradingCandleCardProps> = ({ app }) => {
  return (
    <div className="h-full rounded-3xl bg-[#0C101A]/95 border-2 border-indigo-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(129,140,248,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(129,140,248,0.35)]">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#111726] border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-105 transition">
            <ArrowUpDown className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-indigo-300 transition">
            Alpha Crucible
          </span>
        </a>

        {/* Active Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Candlestick Chart Area (Live Coinbase Data) */}
      <div className="relative w-full flex-1 min-h-[140px] bg-[#080B12]/80 rounded-2xl border border-slate-800/80 p-2.5 mb-3.5 flex overflow-hidden">
        {/* Top-Right Mini Pill */}
        <div className="absolute top-2 right-16 z-10">
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-0.5">
            +1.19% <ArrowUpRight className="w-2.5 h-2.5 inline" />
          </span>
        </div>

        {/* SVG Chart with Candlesticks */}
        <div className="flex-1 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 240 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="240" y2="20" stroke="#1E293B" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" y1="45" x2="240" y2="45" stroke="#1E293B" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" y1="70" x2="240" y2="70" stroke="#1E293B" strokeDasharray="3 3" strokeWidth="0.8" />

            {/* Candlesticks */}
            <line x1="12" y1="50" x2="12" y2="75" stroke="#10B981" strokeWidth="1" />
            <rect x="9.5" y="55" width="5" height="15" fill="#10B981" rx="0.5" />

            <line x1="24" y1="45" x2="24" y2="72" stroke="#EF4444" strokeWidth="1" />
            <rect x="21.5" y="52" width="5" height="14" fill="#EF4444" rx="0.5" />

            <line x1="36" y1="35" x2="36" y2="65" stroke="#10B981" strokeWidth="1" />
            <rect x="33.5" y="42" width="5" height="18" fill="#10B981" rx="0.5" />

            <line x1="48" y1="30" x2="48" y2="58" stroke="#10B981" strokeWidth="1" />
            <rect x="45.5" y="34" width="5" height="16" fill="#10B981" rx="0.5" />

            <line x1="60" y1="32" x2="60" y2="62" stroke="#EF4444" strokeWidth="1" />
            <rect x="57.5" y="38" width="5" height="18" fill="#EF4444" rx="0.5" />

            <line x1="72" y1="42" x2="72" y2="75" stroke="#EF4444" strokeWidth="1" />
            <rect x="69.5" y="50" width="5" height="18" fill="#EF4444" rx="0.5" />

            <line x1="84" y1="48" x2="84" y2="82" stroke="#EF4444" strokeWidth="1" />
            <rect x="81.5" y="58" width="5" height="18" fill="#EF4444" rx="0.5" />

            <line x1="96" y1="50" x2="96" y2="85" stroke="#10B981" strokeWidth="1" />
            <rect x="93.5" y="60" width="5" height="18" fill="#10B981" rx="0.5" />

            <line x1="108" y1="58" x2="108" y2="90" stroke="#EF4444" strokeWidth="1" />
            <rect x="105.5" y="66" width="5" height="18" fill="#EF4444" rx="0.5" />

            <line x1="120" y1="52" x2="120" y2="88" stroke="#10B981" strokeWidth="1" />
            <rect x="117.5" y="58" width="5" height="22" fill="#10B981" rx="0.5" />

            <line x1="132" y1="40" x2="132" y2="78" stroke="#10B981" strokeWidth="1" />
            <rect x="129.5" y="48" width="5" height="22" fill="#10B981" rx="0.5" />

            <line x1="144" y1="44" x2="144" y2="72" stroke="#EF4444" strokeWidth="1" />
            <rect x="141.5" y="50" width="5" height="16" fill="#EF4444" rx="0.5" />

            <line x1="156" y1="30" x2="156" y2="65" stroke="#10B981" strokeWidth="1" />
            <rect x="153.5" y="38" width="5" height="20" fill="#10B981" rx="0.5" />

            <line x1="168" y1="20" x2="168" y2="55" stroke="#10B981" strokeWidth="1" />
            <rect x="165.5" y="26" width="5" height="22" fill="#10B981" rx="0.5" />

            <line x1="180" y1="12" x2="180" y2="48" stroke="#10B981" strokeWidth="1" />
            <rect x="177.5" y="18" width="5" height="24" fill="#10B981" rx="0.5" />
          </svg>
        </div>

        {/* Right Price Scale with Real BTC Levels */}
        <div className="w-16 flex flex-col justify-between items-end text-[9px] font-mono text-slate-400 pl-1 border-l border-slate-800/80">
          <span>85,613</span>
          <span>84,800</span>
          <span className="px-1 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[8px] leading-tight shadow">
            $84,064
          </span>
          <span>83,500</span>
          <span>82,911</span>
        </div>
      </div>

      {/* Bottom Ticker List Box with Real Live Positions */}
      <div className="rounded-2xl bg-[#080B12]/90 border border-slate-800/80 p-2.5 font-mono text-xs">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-slate-300 font-bold">
          <span>BTC/USD • $84,064</span>
          <span className="text-emerald-400 font-semibold text-[11px]">+1.19% ^</span>
        </div>

        <div className="pt-1.5 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">SOL/USD</span>
            <span className="text-emerald-400 font-medium">+17.8% PnL</span>
            <span className="text-emerald-400 flex items-center font-bold">
              $119.62 <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">LINK/USD</span>
            <span className="text-emerald-400 font-medium">+13.3% PnL</span>
            <span className="text-emerald-400 flex items-center font-bold">
              $14.38 <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
