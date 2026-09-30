import React from 'react'
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react'
import type { AppItem } from '../types'
import { DynamicIcon } from './DynamicIcon'

interface CyberAppCardProps {
  app: AppItem
}

export const CyberAppCard: React.FC<CyberAppCardProps> = ({ app }) => {
  // Border glow color mapping based on accentColor
  const getGlowStyle = (color: string) => {
    return {
      borderColor: `${color}40`,
      boxShadow: `0 0 25px -5px ${color}15`,
    }
  }

  return (
    <div
      style={getGlowStyle(app.accentColor)}
      className="group relative rounded-2xl bg-[#090D16]/90 hover:bg-[#0D1322] border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between backdrop-blur-xl p-5 sm:p-6"
    >
      {/* Top ambient highlight line */}
      <div
        style={{ background: `linear-gradient(to right, transparent, ${app.accentColor}, transparent)` }}
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div>
        {/* Card Header: Icon + Category + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              style={{ borderColor: `${app.accentColor}60` }}
              className="w-11 h-11 rounded-xl bg-slate-950/80 border p-1 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
            >
              <DynamicIcon name={app.iconName} className="w-5 h-5" style={{ color: app.accentColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight font-heading group-hover:text-cyan-300 transition-colors">
                  {app.title}
                </h3>
                {app.isFeatured && (
                  <span className="p-0.5 rounded text-amber-400" title="Core Command Center Application">
                    <Sparkles className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-medium">{app.subtitle}</p>
            </div>
          </div>

          {/* Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-slate-950/90 border border-slate-800 shadow-inner shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                app.status === 'online'
                  ? 'bg-emerald-400 ring-2 ring-emerald-500/30 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-300">{app.latencyMs ? `${app.latencyMs}ms` : 'ACTIVE'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-300/90 mb-4 line-clamp-3">
          {app.description}
        </p>

        {/* Stats Grid */}
        {app.stats && app.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {app.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium truncate">{stat.label}</div>
                <div className="text-xs font-bold font-mono truncate" style={{ color: app.accentColor }}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Sub-Route Shortcuts */}
        {app.shortcuts && app.shortcuts.length > 0 && (
          <div className="mb-4">
            <div className="text-[9px] uppercase tracking-wider text-slate-500 font-mono font-semibold mb-2 flex items-center gap-1">
              <span>Quick Routes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {app.shortcuts.map((sc, i) => (
                <a
                  key={i}
                  href={sc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer"
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
      <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono text-slate-500 truncate max-w-[170px]">
          {app.url.replace('https://', '').replace('http://', '')}
        </span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            borderColor: `${app.accentColor}60`,
            boxShadow: `0 0 15px -3px ${app.accentColor}30`,
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border transition-all duration-200 cursor-pointer"
        >
          <span>Launch</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
