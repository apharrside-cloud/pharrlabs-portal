import React from 'react'
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react'
import type { AppItem } from '../types'
import { DynamicIcon } from './DynamicIcon'

interface AppCardProps {
  app: AppItem
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="group relative rounded-2xl sm:rounded-3xl bg-[#0E1524]/90 hover:bg-[#121B2F] border border-slate-800/90 hover:border-slate-700/90 p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between backdrop-blur-xl">
      {/* Top ambient highlight on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        {/* Card Header: Icon + Category + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.gradient} p-[2px] shadow-lg shadow-black/40`}>
              <div className="w-full h-full bg-[#0B0F17] rounded-2xl flex items-center justify-center text-white">
                <DynamicIcon name={app.iconName} className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-heading group-hover:text-sky-300 transition-colors">
                  {app.title}
                </h3>
                {app.isFeatured && (
                  <span className="p-0.5 rounded text-amber-400" title="Featured Core Application">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium">{app.subtitle}</p>
            </div>
          </div>

          {/* Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 shadow-sm shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                app.status === 'online'
                  ? 'bg-emerald-400 ring-2 ring-emerald-500/30 animate-pulse'
                  : app.status === 'checking'
                  ? 'bg-amber-400 animate-spin'
                  : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-300">{app.latencyMs ? `${app.latencyMs}ms` : '200 OK'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-300/90 mb-4 line-clamp-3">
          {app.description}
        </p>

        {/* Stats Grid */}
        {app.stats && app.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/60 border border-slate-850">
            {app.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] text-slate-400 font-medium truncate">{stat.label}</div>
                <div className="text-xs font-bold text-white font-mono truncate">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Sub-Route Shortcuts */}
        {app.shortcuts && app.shortcuts.length > 0 && (
          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1">
              <span>Quick Routes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {app.shortcuts.map((sc, i) => (
                <a
                  key={i}
                  href={sc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-900/90 hover:bg-slate-800 active:bg-slate-750 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                >
                  <span>{sc.label}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
          {app.url.replace('https://', '').replace('http://', '')}
        </span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white text-xs font-semibold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-200 cursor-pointer"
        >
          <span>Launch</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
