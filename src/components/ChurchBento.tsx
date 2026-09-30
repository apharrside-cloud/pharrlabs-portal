import React from 'react'
import { Church, ArrowRight, Calendar, Users, Tv } from 'lucide-react'
import type { AppItem } from '../types'

interface ChurchBentoProps {
  app: AppItem
}

const ROSTER_ITEMS = [
  { role: 'Welcome & Sermon', person: 'Mark Casella' },
  { role: 'Song Leader', person: 'Scott Slauson' },
  { role: "Lord's Supper", person: 'Chance Hornbeck' },
  { role: 'Back Servers', person: 'Kevin Kitchen, Andrew Pharr' },
]

export const ChurchBento: React.FC<ChurchBentoProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#090D16]/95 border border-amber-500/40 p-6 shadow-2xl shadow-amber-500/10 flex flex-col justify-between backdrop-blur-xl overflow-hidden col-span-1 md:col-span-1 lg:col-span-1">
      {/* Cyber Neon Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/50 p-2.5 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight font-heading">
                  Central Union Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  CHURCH
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Digital Signage & Duties</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        {/* Worship Rotation Roster Widget */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2 pb-1 border-b border-slate-800/80">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider">
              <Users className="w-3 h-3" />
              <span>Sunday Worship Duty Roster</span>
            </span>
            <span className="text-slate-500">11 Roles</span>
          </div>

          <div className="space-y-1.5">
            {ROSTER_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                <span className="text-slate-400 font-medium">{item.role}</span>
                <span className="font-mono font-semibold text-white">{item.person}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <a
            href="https://cucoc.pharrlabs.com/signage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition text-[11px] font-medium"
          >
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Signage</span>
          </a>

          <a
            href="https://cucoc.pharrlabs.com/duties"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition text-[11px] font-medium"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Worship Duties</span>
          </a>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-amber-400/90 font-medium">cucoc.pharrlabs.com</span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 cursor-pointer"
        >
          <span>Open Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
