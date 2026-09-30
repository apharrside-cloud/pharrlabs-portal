import React from 'react'
import { Headphones } from 'lucide-react'
import type { AppItem } from '../types'

interface AudiobookshelfCardProps {
  app: AppItem
}

interface Audiobook {
  title: string
  imageUrl: string
  subtitle: string
}

const AUDIOBOOKS: Audiobook[] = [
  {
    title: 'Project Hail Mary',
    subtitle: 'Andy Weir',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', // Vibrant space art
  },
  {
    title: 'The Sandman',
    subtitle: 'Neil Gaiman',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', // Dark fantasy portrait
  },
  {
    title: 'Foundation',
    subtitle: 'Isaac Asimov',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', // Sci-fi cosmic expanse
  },
]

export const AudiobookshelfCard: React.FC<AudiobookshelfCardProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#0C101A]/95 border-2 border-fuchsia-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(232,121,249,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,121,249,0.35)]">
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

      {/* 3 Square Audiobook Covers */}
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
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/book:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Title overlay */}
              <div className="absolute bottom-2 inset-x-1 text-center font-heading font-bold text-[9px] tracking-wider text-white uppercase drop-shadow">
                {book.title}
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-300 text-center truncate group-hover/book:text-fuchsia-300 transition">
              {book.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
