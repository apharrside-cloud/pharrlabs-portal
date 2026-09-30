import { useCallback, useEffect, useRef, useState } from 'react'

export interface ServiceProbe {
  id: string
  status: 'online' | 'degraded' | 'offline'
  latencyMs: number | null
  code: number
}
export interface StatusPayload { checkedAt: number; services: ServiceProbe[] }

/** Polls /api/status, pauses while the tab is hidden, aborts in-flight requests on unmount. Zero dependencies. */
export function useServiceStatus(enabled: boolean, intervalMs = 30_000) {
  const [data, setData] = useState<StatusPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const inflight = useRef<AbortController | null>(null)

  const refresh = useCallback(async () => {
    inflight.current?.abort()
    const ac = new AbortController()
    inflight.current = ac
    setLoading(true)
    try {
      const res = await fetch('/api/status', { signal: ac.signal, cache: 'no-store' })
      if (res.ok) setData((await res.json()) as StatusPayload)
    } catch {
      /* aborted or offline: keep last good data */
    } finally {
      if (!ac.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const tick = () => { if (!document.hidden) void refresh() }
    void refresh() // always probe once on mount; only the polling pauses while the tab is hidden
    const timer = window.setInterval(tick, intervalMs)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
      inflight.current?.abort()
    }
  }, [enabled, intervalMs, refresh])

  return { data, loading, refresh }
}
