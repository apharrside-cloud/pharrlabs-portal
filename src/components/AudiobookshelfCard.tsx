import React from 'react'
import { Headphones } from 'lucide-react'
import type { AppItem } from '../types'

interface AudiobookshelfCardProps {
  app: AppItem
}

interface Audiobook {
  title: string
  subtitle: string
  imagePath: string
}

// 100% Real official audiobook covers matching the titles
const AUDIOBOOKS: Audiobook[] = [
  {
    title: 'Project Hail Mary',
    subtitle: 'Andy Weir',
    imagePath: '/covers/project_hail_mary.jpg',
  },
  {
    title: 'The Sandman',
    subtitle: 'Neil Gaiman',
    imagePath: '/covers/the_sandman.jpg',
  },
  {
    title: 'Foundation',
    subtitle: 'Isaac Asimov',
    imagePath: '/covers/foundation.jpg',
  },
]

export const AudiobookshelfCard: React.FC<AudiobookshelfCardProps> = ({ app }) => {
  return (
    <div className="h-full rounded-3xl bg-[#0C101A]/95 border-2 border-fuchsia-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(232,121,249,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,121,249,0.35)]">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#111726] border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 shadow-inner group-hover:scale-105 transition">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-fuchsia-300 transition">
            Audiobookshelf
          </span>
        </a>

        {/* Active Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* 3 Square Audiobook Covers with Real High-Res Art */}
      <div className="grid grid-cols-3 gap-3 my-auto">
        {AUDIOBOOKS.map((book, idx) => (
          <a
            key={idx}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/book flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group-hover/book:border-fuchsia-400/80 transition-all duration-300 shadow-md group-hover/book:scale-[1.03]">
              <img
                src={book.imagePath}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/book:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/book:opacity-100 transition-opacity" />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-300 text-center truncate group-hover/book:text-fuchsia-300 transition" title={book.title}>
              {book.title}
            </span>
            <span className="text-[10px] font-mono text-fuchsia-400/80 text-center truncate">
              {book.subtitle}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
