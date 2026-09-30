import React from 'react'
import type { AppItem } from '../types'

interface JellyfinPosterCardProps {
  app: AppItem
}

interface MoviePoster {
  title: string
  year: string
  imagePath: string
}

// 100% Real posters from Jellyfin & TMDB matching the titles exactly
const MOVIES: MoviePoster[] = [
  {
    title: 'Interstellar',
    year: '2014',
    imagePath: '/posters/interstellar.jpg',
  },
  {
    title: 'Dune',
    year: '2021',
    imagePath: '/posters/dune.jpg',
  },
  {
    title: 'Blade Runner 2049',
    year: '2017',
    imagePath: '/posters/blade_runner_2049.jpg',
  },
]

export const JellyfinPosterCard: React.FC<JellyfinPosterCardProps> = ({ app }) => {
  return (
    <div className="h-full rounded-3xl bg-[#0C101A]/95 border-2 border-purple-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(192,132,252,0.22)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.35)]">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#111726] border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-inner group-hover:scale-105 transition">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2L2 22h20L12 2zm0 5l6.5 13h-13L12 7z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-white text-base tracking-wide group-hover:text-purple-300 transition">
            Jellyfin Movies
          </span>
        </a>

        {/* Active Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111726] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* 3 Vertical Movie Posters with Real High-Res Art */}
      <div className="grid grid-cols-3 gap-3 my-auto">
        {MOVIES.map((movie, idx) => (
          <a
            key={idx}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/poster flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group-hover/poster:border-purple-400/80 transition-all duration-300 shadow-md group-hover/poster:scale-[1.03]">
              <img
                src={movie.imagePath}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {/* Cinematic Bottom Banner Title */}
              <div className="absolute bottom-2 inset-x-1 text-center font-heading font-extrabold text-[9px] tracking-wider text-white uppercase drop-shadow-md">
                {movie.title}
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-300 text-center truncate group-hover/poster:text-purple-300 transition" title={movie.title}>
              {movie.title}
            </span>
            <span className="text-[10px] font-mono text-purple-400/80 text-center">
              {movie.year}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
