import React from 'react'
import type { AppItem } from '../types'

interface ChurchRosterCardProps {
  app: AppItem
}

interface MemberRow {
  name: string
  role: string
  avatar: string
}

const ROSTER_MEMBERS: MemberRow[] = [
  {
    name: 'Pastor David L.',
    role: 'Pastor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Elder Sarah M.',
    role: 'Elder',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Chris Marrk.',
    role: 'Professor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sarah Eulor',
    role: 'Elder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Elder Sarah M.',
    role: 'Ministry',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
  },
]

export const ChurchRosterCard: React.FC<ChurchRosterCardProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#0C101A]/95 border-2 border-amber-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(251,191,36,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#111726] border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2v3m-2-1.5h4M12 5L4 10v11h16V10l-8-5zm-2 9v7h4v-7a2 2 0 0 0-4 0z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-amber-300 transition">
            Central Union Hub
          </span>
        </a>

        {/* Active Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800 px-1">
          <span className="col-span-6">Ministry</span>
          <span className="col-span-4 text-center">Role</span>
          <span className="col-span-2 text-right">Active</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-800/60 font-sans">
          {ROSTER_MEMBERS.map((member, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center py-2 px-1 hover:bg-slate-900/40 transition">
              {/* Member with Avatar */}
              <div className="col-span-6 flex items-center gap-2">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <span className="text-xs font-medium text-slate-200 truncate">
                  {member.name}
                </span>
              </div>

              {/* Role */}
              <div className="col-span-4 text-center text-xs text-slate-400">
                {member.role}
              </div>

              {/* Active Status Dot */}
              <div className="col-span-2 flex justify-end items-center pr-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
