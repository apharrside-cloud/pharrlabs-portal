import React from 'react'
import { Activity, Shield, Cloud, Cpu } from 'lucide-react'

interface TelemetryBannerProps {
  onlineCount: number
  totalCount: number
  avgLatency: number
}

export const TelemetryBanner: React.FC<TelemetryBannerProps> = ({
  onlineCount,
  totalCount,
  avgLatency,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900/90 via-[#0E1524]/90 to-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden backdrop-blur-md mb-8">
      {/* Background subtle mesh line */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Summary Headline */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GLOBAL INFRASTRUCTURE NORMAL
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Cloudflare Edge + NAS2 Supervisor</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-heading">
            PharrLabs Unified Ecosystem Status
          </h2>
        </div>

        {/* Right: Key Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {/* Uptime Stat */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
              <Cloud className="w-3.5 h-3.5 text-sky-400" />
              <span>Subdomains</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-mono">{onlineCount}/{totalCount}</span>
              <span className="text-[10px] text-emerald-400 font-medium">100% OK</span>
            </div>
          </div>

          {/* Average Latency */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Avg Latency</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-mono">{avgLatency || 28}ms</span>
              <span className="text-[10px] text-sky-400 font-medium">Fast</span>
            </div>
          </div>

          {/* Supervisor Daemons */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Supervisor</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-mono">16/16</span>
              <span className="text-[10px] text-emerald-400 font-medium">Armed</span>
            </div>
          </div>

          {/* Security Gate */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Access Gate</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-mono">Locked</span>
              <span className="text-[10px] text-amber-400 font-medium">PIN Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
