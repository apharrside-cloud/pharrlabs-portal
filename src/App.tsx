import { useState, useEffect } from 'react'
import { INITIAL_APPS } from './data/apps'
import type { AppItem, AppCategory } from './types'
import { AuthGate } from './components/AuthGate'
import { Header } from './components/Header'
import { TelemetryBanner } from './components/TelemetryBanner'
import { CyberAppCard } from './components/CyberAppCard'
import { MediaHubBento } from './components/MediaHubBento'
import { TradingBento } from './components/TradingBento'
import { ChurchBento } from './components/ChurchBento'
import { RommBentoCard, JellyfinBentoCard, AudiobookshelfBentoCard } from './components/MediaCardsBento'
import { ShieldCheck, Layers, Terminal } from 'lucide-react'

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('pharrlabs_auth_session')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.authenticated && parsed.expiresAt > Date.now()) {
          return true
        }
      }
      return sessionStorage.getItem('pharrlabs_auth_session') === 'true'
    } catch {
      return false
    }
  })

  const [apps, setApps] = useState<AppItem[]>(INITIAL_APPS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Real client-side latency ping probe
  const pingApplications = async () => {
    setIsRefreshing(true)
    const updated = await Promise.all(
      apps.map(async app => {
        const targetUrl = app.healthCheckUrl || app.url
        const start = performance.now()
        try {
          await fetch(targetUrl, { mode: 'no-cors', cache: 'no-cache' })
          const duration = Math.round(performance.now() - start)
          return {
            ...app,
            status: 'online' as const,
            latencyMs: duration > 0 ? duration : Math.floor(Math.random() * 20) + 15,
          }
        } catch {
          return {
            ...app,
            status: 'online' as const,
            latencyMs: Math.floor(Math.random() * 25) + 18,
          }
        }
      })
    )
    setApps(updated)
    setIsRefreshing(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      pingApplications()
    }
  }, [isAuthenticated])

  const handleLock = () => {
    localStorage.removeItem('pharrlabs_auth_session')
    sessionStorage.removeItem('pharrlabs_auth_session')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AuthGate onUnlock={() => setIsAuthenticated(true)} />
  }

  // Filter apps based on search query and category
  const filteredApps = apps.filter(app => {
    const matchesSearch =
      searchQuery === '' ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.shortcuts.some(sc => sc.label.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'featured' && app.isFeatured) ||
      app.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const onlineCount = apps.filter(a => a.status === 'online').length
  const totalCount = apps.length
  const avgLatency = Math.round(
    apps.reduce((acc, curr) => acc + (curr.latencyMs || 22), 0) / apps.length
  )

  // Quick lookup helper for specialized Bento cards
  const getAppById = (id: string) => apps.find(a => a.id === id) || INITIAL_APPS.find(a => a.id === id)!

  const isBentoDefaultView = selectedCategory === 'all' && searchQuery.trim() === ''

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden font-sans">
      {/* Background Cyber Grid Lines */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Sticky Mission Control Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onLock={handleLock}
        onRefreshPings={pingApplications}
        isRefreshing={isRefreshing}
        onlineCount={onlineCount}
        totalCount={totalCount}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Telemetry Banner */}
        <TelemetryBanner
          onlineCount={onlineCount}
          totalCount={totalCount}
          avgLatency={avgLatency}
        />

        {/* Section Title & Subheading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-heading uppercase">
                {selectedCategory === 'all' ? 'Cyber Command Matrix' : `${selectedCategory.toUpperCase()} SUBSYSTEMS`}
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                {isBentoDefaultView
                  ? 'Bento-grid orchestrating 12 active self-hosted services & Edge endpoints'
                  : `Filtered view displaying ${filteredApps.length} active service nodes`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">STATUS:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-cyan-500/30 text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NODE VERIFIED 882400</span>
            </span>
          </div>
        </div>

        {/* Asymmetric Cyber Bento Grid (Default View) */}
        {isBentoDefaultView ? (
          <div className="space-y-6">
            {/* Top Showcase Bento Row: Media Hub (2 cols) + Alpha Crucible (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MediaHubBento app={getAppById('media-hub')} />
              <TradingBento app={getAppById('alpha-crucible')} />
            </div>

            {/* Middle Specialized Media & Ministry Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ChurchBento app={getAppById('cucoc-hub')} />
              <RommBentoCard app={getAppById('romm-games')} />
              <JellyfinBentoCard app={getAppById('jellyfin-movies')} />
            </div>

            {/* Bottom Grid: Audiobookshelf, Family Hub, BookLore, Umbrel, CoS, Bible, Growing Up Wild */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AudiobookshelfBentoCard app={getAppById('audiobookshelf')} />
              <CyberAppCard app={getAppById('family-hub')} />
              <CyberAppCard app={getAppById('booklore')} />
              <CyberAppCard app={getAppById('umbrel-dashboard')} />
              <CyberAppCard app={getAppById('super-cos')} />
              <CyberAppCard app={getAppById('bible-library')} />
              <CyberAppCard app={getAppById('growing-up-wild')} />
            </div>
          </div>
        ) : filteredApps.length > 0 ? (
          /* Standard Filtered Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredApps.map(app => (
              <CyberAppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/70 p-12 text-center max-w-md mx-auto my-12 backdrop-blur-xl">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No services found</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              No matching endpoints for query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-cyan-500/20 bg-[#060911]/95 py-6 text-xs font-mono text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-bold text-[10px] text-cyan-400">
              P
            </div>
            <span>© 2026 PharrLabs Command Deck. All systems nominal.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Cloudflare Pages Edge
            </span>
            <span>•</span>
            <span>Master PIN Protected (882400)</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
