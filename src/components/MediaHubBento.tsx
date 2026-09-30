import React from 'react'
import { Play, Tv, ArrowRight, ShieldCheck } from 'lucide-react'
import type { AppItem } from '../types'

interface MediaHubBentoProps {
  app: AppItem
}

const POSTERS = [
  {
    title: 'Interstellar',
    badge: '4K HDR',
    bg: 'from-blue-900/60 via-slate-900 to-black',
    tag: 'Sci-Fi',
  },
  {
    title: 'Dune: Part Two',
    badge: 'Dolby Atmos',
    bg: 'from-amber-900/60 via-stone-900 to-black',
    tag: 'Epic',
  },
  {
    title: 'Blade Runner 2049',
    badge: '1080p',
    bg: 'from-cyan-900/60 via-slate-900 to-black',
    tag: 'Cyberpunk',
  },
  {
    title: 'Project Hail Mary',
    badge: 'Audiobook',
    bg: 'from-yellow-900/60 via-slate-900 to-black',
    tag: 'Audible',
  },
  {
    title: 'The Sandman',
    badge: 'Series',
    bg: 'from-purple-900/60 via-slate-900 to-black',
    tag: 'Fantasy',
  },
]

export const MediaHubBento: React.FC<MediaHubBentoProps> = ({ app }) => {
  return (
    <div className="relative rounded-3xl bg-[#090D16]/95 border border-cyan-500/40 p-6 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between backdrop-blur-xl overflow-hidden col-span-1 md:col-span-2 lg:col-span-2">
      {/* Cyber Neon Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 p-2.5 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight font-heading">
                  {app.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  PWA APP
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Unified Streaming & Artwork Launcher</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* Live Poster Artwork Carousel Row */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-2.5">
            <span className="uppercase tracking-wider font-mono text-cyan-400/90 flex items-center gap-1.5">
              <span>●</span> Trending Library Media
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Synced to Jellyfin & ABS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {POSTERS.map((poster, idx) => (
              <div
                key={idx}
                className={`relative group rounded-xl bg-gradient-to-b ${poster.bg} border border-slate-800 hover:border-cyan-500/60 p-3 h-28 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                    {poster.badge}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-black flex items-center justify-center transition-colors">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block uppercase tracking-wider">{poster.tag}</span>
                  <span className="text-xs font-bold text-white leading-tight block truncate group-hover:text-cyan-200">
                    {poster.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Security Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 mb-4">
          <p className="line-clamp-2">
            Netflix-style hub installable as a native Chrome desktop app. PIN-gated with live poster artwork, multi-track audio, and cross-service media indexing.
          </p>
          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>PIN Protected</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400/90 font-medium">media.pharrlabs.com</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
            Chrome PWA Ready
          </span>
        </div>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 cursor-pointer"
        >
          <span>Launch Media Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
