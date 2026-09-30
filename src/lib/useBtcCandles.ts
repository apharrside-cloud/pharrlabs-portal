import { useEffect, useState } from 'react'

export interface Candle { t: number; low: number; high: number; open: number; close: number }

/** Coinbase Exchange public market data (verified: CORS *, no key, no auth). Hourly candles, refreshed every 30s. */
export function useBtcCandles(count = 36, pollMs = 30_000) {
  const [candles, setCandles] = useState<Candle[]>([])
  const [change24h, setChange24h] = useState<number | null>(null)

  useEffect(() => {
    let ac: AbortController | null = null
    const load = async () => {
      ac?.abort()
      ac = new AbortController()
      try {
        const r = await fetch('https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=3600', { signal: ac.signal })
        if (!r.ok) return
        // rows: [time, low, high, open, close, volume], newest first
        const rows = (await r.json()) as number[][]
        const asc = rows.map(([t, low, high, open, close]) => ({ t, low, high, open, close })).reverse()
        setCandles(asc.slice(-count))
        const day = asc.slice(-24)
        if (day.length === 24) setChange24h(((day[23].close - day[0].open) / day[0].open) * 100)
      } catch {
        /* keep last good data */
      }
    }
    // Always fetch once on mount (even in a background tab); only the polling pauses while hidden.
    void load()
    const tick = () => { if (!document.hidden) void load() }
    const id = window.setInterval(tick, pollMs)
    document.addEventListener('visibilitychange', tick) // catch up the moment the tab is shown again
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
      ac?.abort()
    }
  }, [count, pollMs])

  return { candles, change24h }
}
