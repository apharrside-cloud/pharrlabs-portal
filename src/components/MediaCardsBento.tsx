import React from 'react'
import { Film, Headphones, Gamepad2, ArrowRight } from 'lucide-react'
import type { AppItem } from '../types'

interface MediaSubCardProps {
  app: AppItem
}

// Specialized RomM Retro Games Bento with console pills
export const RommBentoCard: React.FC<MediaSubCardProps> = ({ app }) => {
  const CONSOLES = [
    { name: 'NES', count: '142' },
    { name: 'SNES', count: '98' },
    { name: 'Genesis', count: '84' },
    { name: 'GBA', count: '115' },
    { name: 'PS1', count: '62' },
  ]

  return (
    <div className="relative rounded-2xl bg-[#090D16]/90 border border-indigo-500/40 p-5 shadow-xl shadow-indigo-500/10 flex flex-col justify-between backdrop-blur-xl group hover:border-indigo-400 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/50 p-2 flex items-center justify-center text-indigo-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                RomM Retro Games
              </h4>
              <p className="text-[11px] text-slate-400">Browser Emulation & ROMs</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            200 OK
          </span>
        </div>

        <p className="text-xs text-slate-300/90 mb-3 line-clamp-2">
          Self-hosted retro ROM manager with IGDB metadata and in-browser EmulatorJS gaming.
        </p>

        {/* Retro Consoles Badges */}
        <div className="mb-4">
          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
            Supported Platforms
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CONSOLES.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-950 border border-slate-800 text-indigo-300"
              >
                <span>{c.name}</span>
                <span className="text-slate-500 text-[9px]">({c.count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-indigo-400/90">games.pharrlabs.com</span>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>Play Games</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

// Specialized Jellyfin Movies Bento with movie cover styles
export const JellyfinBentoCard: React.FC<MediaSubCardProps> = ({ app }) => {
  return (
    <div className="relative rounded-2xl bg-[#090D16]/90 border border-purple-500/40 p-5 shadow-xl shadow-purple-500/10 flex flex-col justify-between backdrop-blur-xl group hover:border-purple-400 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/50 p-2 flex items-center justify-center text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                Jellyfin Movies & TV
              </h4>
              <p className="text-[11px] text-slate-400">Hardware Transcoding Node</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            302 /web/
          </span>
        </div>

        <p className="text-xs text-slate-300/90 mb-3 line-clamp-2">
          Personal video streaming platform with on-the-fly hardware transcoding and resume states.
        </p>

        {/* Features / Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Stream</span>
            <span className="text-xs font-bold font-mono text-purple-300">4K Direct</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Port</span>
            <span className="text-xs font-bold font-mono text-white">8096</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Audio</span>
            <span className="text-xs font-bold font-mono text-purple-300">5.1 / 7.1</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-purple-400/90">movies.pharrlabs.com</span>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
        >
          <span>Watch Movies</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

// Specialized Audiobookshelf Bento
export const AudiobookshelfBentoCard: React.FC<MediaSubCardProps> = ({ app }) => {
  return (
    <div className="relative rounded-2xl bg-[#090D16]/90 border border-amber-500/40 p-5 shadow-xl shadow-amber-500/10 flex flex-col justify-between backdrop-blur-xl group hover:border-amber-400 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/50 p-2 flex items-center justify-center text-amber-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                Audiobookshelf
              </h4>
              <p className="text-[11px] text-slate-400">Spoken Audio & Chapters</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            200 OK
          </span>
        </div>

        <p className="text-xs text-slate-300/90 mb-3 line-clamp-2">
          Self-hosted audiobook player with multi-device sync, sleep timer, and rich chapter metadata.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Library</span>
            <span className="text-xs font-bold font-mono text-amber-300">Audible Sync</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Port</span>
            <span className="text-xs font-bold font-mono text-white">13378</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] uppercase font-mono text-slate-400 block">Progress</span>
            <span className="text-xs font-bold font-mono text-amber-300">Cloud Sync</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-amber-400/90">audiobooks.pharrlabs.com</span>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <span>Listen</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
