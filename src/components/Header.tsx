import React, { useState, useEffect } from 'react'
import { Search, Lock, RefreshCw, Sparkles } from 'lucide-react'
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
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: '⭐ Featured' },
  { id: 'family', label: '🏡 Family' },
  { id: 'ministry', label: '⛪ Ministry & Church' },
  { id: 'finance', label: '📈 Trading & Alpha' },
  { id: 'systems', label: '⚙️ Systems & Servers' },
  { id: 'media', label: '🎨 Media' },
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
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-[#0B0F17]/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0B0F17] rounded-2xl flex items-center justify-center font-bold text-lg text-white font-heading">
                  P
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B0F17] ring-1 ring-emerald-400/50 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-heading">
                  PharrLabs
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Sparkles className="w-2.5 h-2.5" /> MISSION CONTROL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Unified App Store & Live Telemetry Portal
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search applications, routes, services (e.g. 'budget', 'signage')..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls & Telemetry */}
          <div className="flex items-center gap-2.5">
            {/* Live Clock */}
            <div className="hidden lg:flex flex-col items-end px-3 py-1 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">EST Time</span>
              <span className="text-xs font-mono font-semibold text-slate-200">{currentTime || '12:00:00 PM'}</span>
            </div>

            {/* Health Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{onlineCount}/{totalCount} Active</span>
            </div>

            {/* Refresh Pings Button */}
            <button
              onClick={onRefreshPings}
              disabled={isRefreshing}
              title="Refresh live connectivity pings"
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-750 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
            </button>

            {/* Lock Button */}
            <button
              onClick={onLock}
              title="Lock Mission Control"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 active:bg-rose-900/50 border border-slate-800 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 text-xs font-medium transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search apps, routes, or tools..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 pt-1 scrollbar-none text-xs">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
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
