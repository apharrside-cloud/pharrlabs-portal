import React from 'react'
import { Gamepad2 } from 'lucide-react'
import type { AppItem } from '../types'

interface RommConsoleCardProps {
  app: AppItem
}

interface ConsoleCard {
  label: string
  sublabel: string
  consoleType: 'nes' | 'snes' | 'genesis'
}

// Real RomM 5.2.0 platform statistics on Umbrel
const CONSOLES: ConsoleCard[] = [
  { label: 'Super Nintendo', sublabel: '789 ROMs', consoleType: 'snes' },
  { label: 'Game Boy Advance', sublabel: 'Library Ready', consoleType: 'nes' },
  { label: 'Sega Genesis', sublabel: 'Classics Ready', consoleType: 'genesis' },
]

export const RommConsoleCard: React.FC<RommConsoleCardProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#0C101A]/95 border-2 border-sky-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(56,189,248,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#111726] border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-inner group-hover:scale-105 transition">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-sky-300 transition">
            RomM Retro Games
          </span>
        </a>

        {/* Active Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* 3 Retro Controller Tiles */}
      <div className="grid grid-cols-3 gap-3 my-auto">
        {CONSOLES.map((c, idx) => (
          <a
            key={idx}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/console flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full rounded-2xl bg-[#070A12] border border-slate-800 flex items-center justify-center p-3 group-hover/console:border-sky-400/80 transition-all duration-300 shadow-inner group-hover/console:scale-[1.03]">
              {c.consoleType === 'snes' && (
                /* SNES Controller SVG */
                <svg viewBox="0 0 100 50" className="w-full h-auto drop-shadow-md">
                  <path d="M25 10 C10 10 5 25 15 40 C22 45 35 40 45 40 L55 40 C65 40 78 45 85 40 C95 25 90 10 75 10 Z" fill="#E5E7EB" stroke="#4B5563" strokeWidth="1.5" />
                  <rect x="22" y="20" width="12" height="12" fill="#374151" />
                  <rect x="25.5" y="16.5" width="5" height="19" fill="#374151" />
                  <rect x="43" y="26" width="6" height="2.5" rx="1" fill="#4B5563" transform="rotate(-20 46 27)" />
                  <rect x="51" y="26" width="6" height="2.5" rx="1" fill="#4B5563" transform="rotate(-20 54 27)" />
                  <circle cx="70" cy="26" r="3.2" fill="#10B981" />
                  <circle cx="76" cy="20" r="3.2" fill="#3B82F6" />
                  <circle cx="82" cy="26" r="3.2" fill="#EF4444" />
                  <circle cx="76" cy="32" r="3.2" fill="#F59E0B" />
                </svg>
              )}

              {c.consoleType === 'nes' && (
                /* GBA / NES Style Controller SVG */
                <svg viewBox="0 0 100 50" className="w-full h-auto drop-shadow-md">
                  <rect x="5" y="5" width="90" height="40" rx="3" fill="#D1D5DB" stroke="#374151" strokeWidth="2" />
                  <rect x="15" y="10" width="70" height="30" fill="#1F2937" rx="2" />
                  <rect x="22" y="18" width="14" height="14" fill="#111827" />
                  <rect x="26" y="14" width="6" height="22" fill="#111827" />
                  <rect x="42" y="27" width="7" height="3" rx="1.5" fill="#EF4444" />
                  <rect x="52" y="27" width="7" height="3" rx="1.5" fill="#EF4444" />
                  <circle cx="68" cy="27" r="4" fill="#DC2626" />
                  <circle cx="78" cy="27" r="4" fill="#DC2626" />
                </svg>
              )}

              {c.consoleType === 'genesis' && (
                /* Sega Genesis Controller SVG */
                <svg viewBox="0 0 100 50" className="w-full h-auto drop-shadow-md">
                  <path d="M20 12 C10 14 5 30 15 42 C22 45 35 38 45 38 L55 38 C65 38 78 45 85 42 C95 30 90 14 80 12 C60 10 40 10 20 12 Z" fill="#1F2937" stroke="#111827" strokeWidth="1.5" />
                  <circle cx="26" cy="26" r="10" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <rect x="22" y="24" width="8" height="4" fill="#4B5563" />
                  <rect x="24" y="22" width="4" height="8" fill="#4B5563" />
                  <circle cx="50" cy="20" r="2.5" fill="#EF4444" />
                  <circle cx="70" cy="28" r="3.2" fill="#374151" stroke="#6B7280" strokeWidth="0.8" />
                  <circle cx="76" cy="25" r="3.2" fill="#374151" stroke="#6B7280" strokeWidth="0.8" />
                  <circle cx="82" cy="22" r="3.2" fill="#374151" stroke="#6B7280" strokeWidth="0.8" />
                </svg>
              )}
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-200 text-center truncate group-hover/console:text-sky-300 transition">
              {c.label}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 text-center">
              {c.sublabel}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
