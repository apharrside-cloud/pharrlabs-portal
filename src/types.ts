export type AppCategory = 'all' | 'featured' | 'family' | 'ministry' | 'finance' | 'systems' | 'media'

export interface AppShortcut {
  label: string
  url: string
  badge?: string
}

export interface AppStat {
  label: string
  value: string
}

export interface AppItem {
  id: string
  title: string
  subtitle: string
  description: string
  category: AppCategory
  isFeatured?: boolean
  url: string
  internalUrl?: string
  healthCheckUrl?: string
  status: 'online' | 'checking' | 'degraded' | 'offline'
  latencyMs?: number
  gradient: string
  iconName: string
  shortcuts: AppShortcut[]
  stats?: AppStat[]
  accentColor: string
}

export interface EcosystemTelemetry {
  onlineCount: number
  totalCount: number
  averageLatencyMs: number
  supervisorServices: number
  activeTunnel: boolean
  lastChecked: string
}
