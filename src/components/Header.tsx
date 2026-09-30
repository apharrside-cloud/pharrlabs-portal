import React, { useState, useEffect } from 'react'
import { Search, Lock, RefreshCw, Cpu, Activity, HardDrive, ShieldCheck, Sparkles, Clock } from 'lucide-react'
import type { AppCategory } from '../types'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedCategory: AppCategory
  onCategorySelect: (cat: AppCategory) => void
  onLock: () => void
  onRefreshPings: () => void
  isRefreshing: boolean
  onlineCount: number
  totalCount: number
}

const CATEGORIES: { id: AppCategory; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'featured', label: '⭐ Core Deck' },
  { id: 'media', label: '🎬 Media & Entertainment' },
  { id: 'finance', label: '📈 Trading & Alpha' },
  { id: 'ministry', label: '⛪ Church & Ministry' },
  { id: 'family', label: '🏡 Family Hub' },
  { id: 'systems', label: '⚙️ Cloud & Supervisor' },
]

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  onLock,
  onRefreshPings,
  isRefreshing,
  onlineCount,
  totalCount,
}) => {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-2xl bg-[#060911]/90 border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
      {/* Top subtle neon line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-950 border border-cyan-500/60 p-2 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300">
                <span className="font-heading font-extrabold text-lg tracking-wider text-cyan-300">P</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060911] shadow-sm shadow-emerald-400 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-wider text-white font-heading uppercase">
                  Pharr<span className="text-cyan-400">Labs</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> COMMAND DECK
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                Unified Ecosystem Operations & Streaming Portal
              </p>
            </div>
          </div>

          {/* Search Input Bar with Command Aesthetic */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search subsystems, routes, apps..."
                className="w-full pl-9 pr-8 py-1.5 bg-slate-950/90 border border-cyan-500/30 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
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

          {/* Cyber Telemetry Header Gauges */}
          <div className="flex items-center gap-2">
            {/* Live EST Clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span className="text-slate-200 font-semibold">{currentTime || '12:00:00 PM'}</span>
            </div>

            {/* Health Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{onlineCount}/{totalCount} OK</span>
            </div>

            {/* Live Telemetry Pills */}
            <div className="hidden xl:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span className="text-slate-500">NET:</span>
                <span className="text-cyan-300 font-bold">1.2 GB/s</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span className="text-slate-500">SYS:</span>
                <span className="text-purple-300 font-bold">18%</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                <HardDrive className="w-3 h-3 text-emerald-400" />
                <span className="text-slate-500">MEM:</span>
                <span className="text-emerald-300 font-bold">44%</span>
              </div>
            </div>

            {/* Security Pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SECURE (882400)</span>
            </div>

            {/* Refresh Pings Button */}
            <button
              onClick={onRefreshPings}
              disabled={isRefreshing}
              title="Refresh telemetry & connectivity"
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            {/* Lock Button */}
            <button
              onClick={onLock}
              title="Lock Mission Deck"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs font-mono transition cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline text-[11px]">Lock</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search apps, routes, or tools..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-cyan-500/30 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Filter Tabs with Cyber Glow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none text-xs">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400'
                    : 'bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/90'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
