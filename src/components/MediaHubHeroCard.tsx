import React from 'react'
import { Play } from 'lucide-react'
import type { AppItem } from '../types'

interface MediaHubHeroCardProps {
  app: AppItem
}

interface TrendingPoster {
  title: string
  label: string
  imagePath: string
}

// 100% Real posters from Andrew's Jellyfin media library
const TRENDING_POSTERS: TrendingPoster[] = [
  {
    title: 'The Avengers',
    label: 'The Avengers',
    imagePath: '/posters/the_avengers.jpg',
  },
  {
    title: 'Blade Runner 2049',
    label: 'Blade Runner 2049',
    imagePath: '/posters/blade_runner_2049.jpg',
  },
  {
    title: 'Everything Everywhere All at Once',
    label: 'Everything Everywhere',
    imagePath: '/posters/everything_everywhere.jpg',
  },
  {
    title: 'The Amazing Spider-Man',
    label: 'Spider-Man',
    imagePath: '/posters/spider_man.jpg',
  },
  {
    title: '1917',
    label: '1917',
    imagePath: '/posters/movie_1917.jpg',
  },
]

export const MediaHubHeroCard: React.FC<MediaHubHeroCardProps> = ({ app }) => {
  return (
    <div className="h-full rounded-3xl bg-[#0C101A]/95 border-2 border-cyan-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(34,211,238,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#111726] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm4 3v6l5-3-5-3z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-cyan-300 transition">
              Media Hub
            </span>
          </a>

          {/* Active Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active</span>
          </div>
        </div>

        {/* Subheading */}
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
            Trending Jellyfin Library
          </h3>
          <span className="text-[11px] font-mono text-cyan-400/80">4K HDR • 5.1 Surround</span>
        </div>
      </div>

      {/* 5-Poster Row with Real Movie Posters */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 my-auto">
        {TRENDING_POSTERS.map((poster, idx) => (
          <a
            key={idx}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/poster relative flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group-hover/poster:border-cyan-400/80 transition-all duration-300 shadow-lg group-hover/poster:scale-[1.03]">
              <img
                src={poster.imagePath}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Red 'N' style tag */}
              <div className="absolute top-1.5 left-1.5 font-black text-rose-500 text-[11px] leading-none drop-shadow-md">
                N
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover/poster:scale-110 group-hover/poster:bg-cyan-400 transition">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Poster Label */}
            <span className="mt-2 text-[11px] font-medium text-slate-300 text-center truncate group-hover/poster:text-cyan-300 transition" title={poster.title}>
              {poster.label}
            </span>
          </a>
        ))}
      </div>

      {/* Carousel Slider Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-5 h-1.5 rounded-full bg-cyan-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
      </div>
    </div>
  )
}
