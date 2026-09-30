import { Church } from 'lucide-react'
import type { AppItem } from '../types'
import { CardShell } from './ui/CardShell'

interface MemberRow {
  name: string
  role: string
  initials: string
  colorClass: string
}

// Exact August 2, 2026 Central Union Worship Assignments & Leadership
const ROSTER_MEMBERS: MemberRow[] = [
  {
    name: 'Mark Casella',
    role: 'Preacher & Sermon',
    initials: 'MC',
    colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    name: 'Scott Slauson',
    role: 'Song Leader',
    initials: 'SS',
    colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    name: 'Chance Hornbeck',
    role: "Lord's Supper (Preside)",
    initials: 'CH',
    colorClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  {
    name: 'Kevin Kitchen',
    role: "Back Server (Lord's Supper)",
    initials: 'KK',
    colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    name: 'Andrew Pharr',
    role: "Back Server & Media",
    initials: 'AP',
    colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
]

export function ChurchRosterCard({ app, index }: { app: AppItem; index?: number }) {
  return (
    <CardShell app={app} title="Central Union Hub" neon="amber" index={index} icon={<Church className="w-4 h-4" />}>
      {/* Roster Table */}
      <div className="flex-1 flex flex-col justify-around py-1">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800 px-1">
          <span className="col-span-6">Ministry Member</span>
          <span className="col-span-4 text-center">Worship Role</span>
          <span className="col-span-2 text-right">Active</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-800/60 font-sans">
          {ROSTER_MEMBERS.map((member, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center py-2 px-1 hover:bg-slate-900/40 transition">
              {/* Member with Monogram Badge */}
              <div className="col-span-6 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono shrink-0 shadow-sm ${member.colorClass}`}>
                  {member.initials}
                </div>
                <span className="text-xs font-medium text-slate-200 truncate" title={member.name}>
                  {member.name}
                </span>
              </div>

              {/* Role */}
              <div className="col-span-4 text-center text-[11px] text-slate-400 truncate" title={member.role}>
                {member.role}
              </div>

              {/* Active Status Dot */}
              <div className="col-span-2 flex justify-end items-center pr-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  )
}
