// Cloudflare Pages Function -> https://pharrlabs.com/api/status
// Probes each service server-side. Needed because movies. and audiobooks. send no CORS headers,
// so the browser cannot read their responses (the old client-side no-cors ping could never fail).
interface Probe { id: string; url: string }

const PROBES: Probe[] = [
  { id: 'media-hub',        url: 'https://media.pharrlabs.com/' },
  { id: 'jellyfin-movies',  url: 'https://movies.pharrlabs.com/System/Info/Public' },
  { id: 'audiobookshelf',   url: 'https://audiobooks.pharrlabs.com/ping' },
  { id: 'romm-games',       url: 'https://games.pharrlabs.com/api/heartbeat' },
  { id: 'booklore',         url: 'https://books.pharrlabs.com/' },
  { id: 'umbrel-dashboard', url: 'https://umbrel.pharrlabs.com/' }, // 302 to Cloudflare Access = protected and up
  { id: 'agents-hub',       url: 'https://agents.pharrlabs.com/' }, // 200/302 Cloudflare Access = protected and up
]

async function probe(p: Probe) {
  const t = Date.now()
  try {
    const r = await fetch(p.url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(4000),
      headers: { 'user-agent': 'pharrlabs-status/1' },
    })
    const latencyMs = Date.now() - t
    // 2xx/3xx = up. 4xx = reachable behind an auth wall. 5xx = tunnel is up but the app is broken (RomM 502s).
    const status = r.status >= 500 ? 'degraded' : 'online'
    return { id: p.id, status, latencyMs, code: r.status }
  } catch {
    return { id: p.id, status: 'offline', latencyMs: null, code: 0 }
  }
}

export const onRequestGet = async () => {
  const services = await Promise.all(PROBES.map(probe))
  return Response.json(
    { checkedAt: Date.now(), services },
    { headers: { 'cache-control': 'public, max-age=15', 'access-control-allow-origin': '*' } },
  )
}
