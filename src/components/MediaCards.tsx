import type { ReactNode } from 'react'
import { Play, Headphones } from 'lucide-react'
import type { AppItem } from '../types'
import { CardShell, type NeonName } from './ui/CardShell'

interface Tile { title: string; sub: string; img: string }

// Until these are fetched live from the Jellyfin/ABS APIs (see hooks section of the audit),
// keep the lists as data at the top of the file so swapping to an API response is a one-line change.
const TRENDING: Tile[] = [
  { title: 'The Avengers', sub: 'The Avengers', img: 'the_avengers' },
  { title: 'Blade Runner 2049', sub: 'Blade Runner 2049', img: 'blade_runner_2049' },
  { title: 'Everything Everywhere All at Once', sub: 'Everything Everywhere', img: 'everything_everywhere' },
  { title: 'The Amazing Spider-Man', sub: 'Spider-Man', img: 'spider_man' },
  { title: '1917', sub: '1917', img: 'movie_1917' },
]
const MOVIES: Tile[] = [
  { title: 'Interstellar', sub: '2014', img: 'interstellar' },
  { title: 'Dune', sub: '2021', img: 'dune' },
  { title: 'Blade Runner 2049', sub: '2017', img: 'blade_runner_2049' },
]
const BOOKS: Tile[] = [
  { title: 'Project Hail Mary', sub: 'Andy Weir', img: 'project_hail_mary' },
  { title: 'The Sandman', sub: 'Neil Gaiman', img: 'the_sandman' },
  { title: 'Foundation', sub: 'Isaac Asimov', img: 'foundation' },
]

interface ArtGridProps {
  app: AppItem
  tiles: Tile[]
  dir: 'posters' | 'covers'
  ratio: 'aspect-[2/3]' | 'aspect-square'
  cols: 'grid-cols-5' | 'grid-cols-3'
  neon: NeonName
  overlay?: ReactNode
}

/** One responsive artwork grid for all three media cards. WebP, explicit size, lazy below the fold. */
function ArtGrid({ app, tiles, dir, ratio, cols, overlay }: ArtGridProps) {
  return (
    <div className={`grid ${cols} gap-2.5 sm:gap-3 my-auto`}>
      {tiles.map(t => (
        <a
          key={t.img}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.title} - open ${app.title}`}
          className="group/tile flex flex-col"
        >
          <div className={`relative ${ratio} w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 transition duration-300 group-hover/tile:[border-color:rgb(var(--neon))] group-hover/tile:scale-[1.03]`}>
            <img
              src={`/${dir}/${t.img}.webp`}
              alt=""
              width={400}
              height={dir === 'posters' ? 600 : 400}
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {overlay && (
              <div className="absolute inset-0 grid place-items-center opacity-90 group-hover/tile:opacity-100 transition">
                {overlay}
              </div>
            )}
          </div>
          <span className="mt-2 text-xs font-medium text-slate-300 text-center truncate group-hover/tile:text-white transition" title={t.title}>
            {t.sub}
          </span>
        </a>
      ))}
    </div>
  )
}

const PlayDot = (
  <span className="w-7 h-7 rounded-full bg-white/90 text-black grid place-items-center shadow-lg group-hover/tile:scale-110 group-hover/tile:bg-cyan-400 transition">
    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
  </span>
)

export function MediaHubHeroCard({ app, index }: { app: AppItem; index?: number }) {
  return (
    <CardShell app={app} title="Media Hub" neon="cyan" index={index} icon={<Play className="w-4 h-4 fill-current" />}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide">Trending Jellyfin Library</h3>
        <span className="text-[11px] font-mono text-cyan-300">4K HDR · 5.1 Surround</span>
      </div>
      <ArtGrid app={app} tiles={TRENDING} dir="posters" ratio="aspect-[2/3]" cols="grid-cols-5" neon="cyan" overlay={PlayDot} />
    </CardShell>
  )
}

export function JellyfinPosterCard({ app, index }: { app: AppItem; index?: number }) {
  return (
    <CardShell app={app} title="Jellyfin Movies" neon="purple" index={index} icon={<Play className="w-4 h-4" />}>
      <ArtGrid app={app} tiles={MOVIES} dir="posters" ratio="aspect-[2/3]" cols="grid-cols-3" neon="purple" />
    </CardShell>
  )
}

export function AudiobookshelfCard({ app, index }: { app: AppItem; index?: number }) {
  return (
    <CardShell app={app} title="Audiobookshelf" neon="fuchsia" index={index} icon={<Headphones className="w-4 h-4" />}>
      <ArtGrid app={app} tiles={BOOKS} dir="covers" ratio="aspect-square" cols="grid-cols-3" neon="fuchsia" />
    </CardShell>
  )
}
