import { useMemo, useState } from 'react'
import { Layers, ShieldCheck, Terminal } from 'lucide-react'
import { INITIAL_APPS } from './data/apps'
import type { AppItem } from './types'
import { AuthGate } from './components/AuthGate'
import { CyberNavbar } from './components/CyberNavbar'
import { MediaHubHeroCard, JellyfinPosterCard, AudiobookshelfCard } from './components/MediaCards'
import { TradingCandleCard } from './components/TradingCandleCard'
import { ChurchRosterCard } from './components/ChurchRosterCard'
import { RommConsoleCard } from './components/RommConsoleCard'
import { CyberAppCard } from './components/CyberAppCard'
import { useServiceStatus } from './lib/useServiceStatus'

const SECONDARY_IDS = ['family-hub', 'booklore', 'umbrel-dashboard', 'super-cos', 'bible-library', 'growing-up-wild']
const SESSION_KEY = 'pharrlabs_auth_session'

function readSession(): boolean {
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.authenticated && parsed.expiresAt > Date.now()) return true
    }
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)
  const [searchQuery, setSearchQuery] = useState('')

  // Real probes from the /api/status Pages Function. Replaces the client-side no-cors ping,
  // which could not fail and padded latency with Math.random().
  const { data, loading, refresh } = useServiceStatus(isAuthenticated)

  // Derived, not stored: merge live probe results over the static catalog.
  const apps = useMemo<AppItem[]>(() => {
    if (!data) return INITIAL_APPS
    const byId = new Map(data.services.map(s => [s.id, s]))
    return INITIAL_APPS.map(a => {
      const p = byId.get(a.id)
      return p ? { ...a, status: p.status, latencyMs: p.latencyMs ?? undefined } : a
    })
  }, [data])

  const byId = useMemo(() => new Map(apps.map(a => [a.id, a])), [apps])
  const getApp = (id: string) => byId.get(id)!

  const handleLock = () => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) return <AuthGate onUnlock={() => setIsAuthenticated(true)} />

  const q = searchQuery.trim().toLowerCase()
  const searchResults = q
    ? apps.filter(a =>
        [a.title, a.subtitle, a.description, ...a.shortcuts.map(s => s.label)].some(t => t.toLowerCase().includes(q)),
      )
    : []
  const secondaryApps = SECONDARY_IDS.map(id => byId.get(id)).filter((a): a is AppItem => !!a)

  return (
    <div className="deck-scan min-h-screen bg-[#070A10] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden font-sans p-3 sm:p-5 lg:p-6">
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-[1520px] w-full mx-auto relative z-10 flex flex-col flex-1">
        <CyberNavbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={refresh}
          onLock={handleLock}
          isRefreshing={loading}
        />

        {q ? (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono text-cyan-400">
                SEARCH RESULTS FOR &quot;{searchQuery}&quot; ({searchResults.length})
              </h2>
              <button onClick={() => setSearchQuery('')} className="text-xs font-mono text-slate-400 hover:text-white">
                Clear Search ✕
              </button>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.map(app => <CyberAppCard key={app.id} app={app} />)}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-800 bg-[#0C101A]/90 p-12 text-center max-w-md mx-auto my-12">
                <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No services found</h3>
                <p className="text-xs text-slate-400 mb-4 font-mono">No matching services or tools for &quot;{searchQuery}&quot;.</p>
                <button onClick={() => setSearchQuery('')} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              <div className="lg:col-span-6"><MediaHubHeroCard app={getApp('media-hub')} index={0} /></div>
              <div className="lg:col-span-3"><TradingCandleCard app={getApp('alpha-crucible')} index={1} /></div>
              <div className="lg:col-span-3"><ChurchRosterCard app={getApp('cucoc-hub')} index={2} /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              <div className="lg:col-span-4"><JellyfinPosterCard app={getApp('jellyfin-movies')} index={3} /></div>
              <div className="lg:col-span-4"><AudiobookshelfCard app={getApp('audiobookshelf')} index={4} /></div>
              <div className="lg:col-span-4 md:col-span-2"><RommConsoleCard app={getApp('romm-games')} index={5} /></div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 items-center justify-between border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase tracking-wider text-slate-300 font-semibold">Extended Subsystems &amp; Services</span>
                <span className="text-slate-400">· {secondaryApps.length} endpoints</span>
              </div>
              {/* Derived from real probes instead of a hardcoded "ALL SYSTEMS SECURE". */}
              <SystemsSummary apps={apps} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {secondaryApps.map(app => <CyberAppCard key={app.id} app={app} />)}
            </div>
          </div>
        )}

        <footer className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>© 2026 PharrLabs Cyber Command Deck</span>
          </div>
          <span>Cloudflare Edge Active</span>
        </footer>
      </div>
    </div>
  )
}

function SystemsSummary({ apps }: { apps: AppItem[] }) {
  const down = apps.filter(a => a.status === 'offline' || a.status === 'degraded')
  const ok = down.length === 0
  return (
    <div className={`flex items-center gap-1.5 font-mono text-xs ${ok ? 'text-emerald-400' : 'text-amber-400'}`} role="status">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>{ok ? 'ALL SYSTEMS NOMINAL' : `${down.length} SERVICE${down.length > 1 ? 'S' : ''} NEED ATTENTION`}</span>
    </div>
  )
}

export default App
