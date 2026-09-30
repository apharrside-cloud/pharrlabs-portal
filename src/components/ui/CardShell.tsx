import type { CSSProperties, ReactNode } from 'react'
import { StatusBadge } from './StatusBadge'
import type { AppItem } from '../../types'

// RGB triplets so one CSS rule (.neon-card) derives border, glow and hover from a single value.
export const NEON = {
  cyan: '34 211 238',
  indigo: '129 140 248',
  amber: '251 191 36',
  purple: '192 132 252',
  fuchsia: '232 121 249',
  sky: '56 189 248',
} as const
export type NeonName = keyof typeof NEON

interface CardShellProps {
  app: AppItem
  title: string
  neon: NeonName
  icon: ReactNode
  index?: number
  children: ReactNode
}

/** Shared chrome for every hero card: neon border, header link, live status badge. */
export function CardShell({ app, title, neon, icon, index = 0, children }: CardShellProps) {
  const style = { '--neon': NEON[neon], '--i': index } as CSSProperties
  return (
    <section
      style={style}
      aria-label={title}
      className="neon-card deck-enter h-full rounded-3xl bg-[#0C101A]/95 p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
    >
      <header className="flex items-center justify-between mb-4">
        <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
          <span
            className="w-8 h-8 rounded-xl bg-[#111726] border flex items-center justify-center shadow-inner transition group-hover:scale-105"
            style={{ borderColor: `rgb(${NEON[neon]} / 0.45)`, color: `rgb(${NEON[neon]})` }}
          >
            {icon}
          </span>
          <span className="font-heading font-bold text-white text-base tracking-wide transition group-hover:[color:rgb(var(--neon))]">
            {title}
          </span>
        </a>
        <StatusBadge status={app.status} latencyMs={app.latencyMs} />
      </header>
      {children}
    </section>
  )
}
