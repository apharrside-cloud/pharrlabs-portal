import React from 'react'
import { TrendingUp, ArrowRight, Activity } from 'lucide-react'
import type { AppItem } from '../types'

interface TradingBentoProps {
  app: AppItem
}

export const TradingBento: React.FC<TradingBentoProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#090D16]/95 border border-emerald-500/40 p-6 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between backdrop-blur-xl overflow-hidden col-span-1 md:col-span-1 lg:col-span-1">
      {/* Cyber Neon Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 p-2.5 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight font-heading">
                  Alpha Crucible
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Algorithmic $50k Simulation</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        {/* Live Metrics Header */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Total Equity</span>
            <span className="text-base font-bold font-mono text-white">$54,509.29</span>
            <span className="text-[10px] font-mono text-emerald-400 block mt-0.5 font-semibold">+9.02% ($4,509)</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Win Rate</span>
            <span className="text-base font-bold font-mono text-emerald-400">77.3%</span>
            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">153W / 45L (202T)</span>
          </div>
        </div>

        {/* Simulated Candlestick Sparkline */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" />
              <span>BTC/USDT Momentum</span>
            </span>
            <span className="text-emerald-400 font-semibold">+14.2%</span>
          </div>

          {/* SVG Candlestick Graphic */}
          <div className="h-16 w-full flex items-end justify-between gap-1 px-1">
            {[
              { h: 35, c: 'bg-emerald-500/80', w: 4 },
              { h: 42, c: 'bg-emerald-500', w: 6 },
              { h: 28, c: 'bg-rose-500/80', w: 4 },
              { h: 50, c: 'bg-emerald-500', w: 7 },
              { h: 45, c: 'bg-emerald-500/80', w: 5 },
              { h: 62, c: 'bg-emerald-500', w: 6 },
              { h: 55, c: 'bg-rose-500/70', w: 4 },
              { h: 70, c: 'bg-emerald-400', w: 8 },
              { h: 68, c: 'bg-emerald-500/90', w: 6 },
              { h: 85, c: 'bg-emerald-400', w: 9 },
              { h: 75, c: 'bg-rose-500/60', w: 5 },
              { h: 95, c: 'bg-emerald-400', w: 10 },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                <div
                  style={{ height: `${bar.h}%` }}
                  className={`w-full rounded-sm ${bar.c} transition-all duration-300 hover:brightness-125`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-2 pt-1 border-t border-slate-900">
            <span>NEAR +5.25%</span>
            <span>NVDA +5.08%</span>
            <span>META +1.43%</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-emerald-400/90 font-medium">trade.pharrlabs.com</span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer"
        >
          <span>Live Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
