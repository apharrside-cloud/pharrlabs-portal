import React from 'react'
import { Search, Activity, Cpu, HardDrive, ShieldCheck, Lock, RefreshCw } from 'lucide-react'

interface CyberNavbarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  onRefresh: () => void
  onLock: () => void
  isRefreshing: boolean
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  onLock,
  isRefreshing,
}) => {
  return (
    <nav className="w-full bg-[#0B0F17]/95 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 mb-6 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Left: Futuristic Logo + Integrated Search */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M4 4h7a5 5 0 0 1 5 5 5 5 0 0 1-5 5H8v6H4V4zm4 4v3h3a2 2 0 0 0 2-2 2 2 0 0 0-2-2H8z" />
            </svg>
          </div>
          <span className="font-heading font-extrabold text-base tracking-widest text-white uppercase">
            PHARR<span className="text-cyan-400">LABS</span>
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />

        {/* Search Input */}
        <div className="relative flex-1 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search PharrLabs command deck..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#070A10] border border-slate-800/90 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Live Umbrel NAS Telemetry Badges */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-end text-xs font-mono">
        {/* Net */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A10] border border-slate-800 text-slate-300 shrink-0">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-500">NET:</span>
          <span className="text-cyan-300 font-bold">1.2 GB/s</span>
        </div>

        {/* Live HP ProDesk CPU */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A10] border border-slate-800 text-slate-300 shrink-0">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-slate-500">SYS:</span>
          <span className="text-purple-300 font-bold">3.4% CPU</span>
        </div>

        {/* Live DDR4 RAM */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A10] border border-slate-800 text-slate-300 shrink-0">
          <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-500">MEM:</span>
          <span className="text-indigo-300 font-bold">38% RAM</span>
        </div>

        {/* Security / Node Health Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 shrink-0 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SECURITY: SECURE</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 pl-1">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh live telemetry"
            className="p-1.5 rounded-xl bg-[#070A10] border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
          <button
            onClick={onLock}
            title="Lock Portal"
            className="p-1.5 rounded-xl bg-[#070A10] border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
