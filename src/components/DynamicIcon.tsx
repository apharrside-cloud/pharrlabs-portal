import type { ComponentType, CSSProperties } from 'react'
import {
  BookMarked, BookOpen, Bot, Church, Film, Headphones, Home,
  Layers, Server, ShieldAlert, Sparkles, TrendingUp, Tv,
} from 'lucide-react'

type IconCmp = ComponentType<{ className?: string; style?: CSSProperties }>

// Explicit map so the bundler can tree-shake lucide (was `import * as Icons`,
// which pulls in all ~1,500 icons). Add a name here when apps.ts uses a new one.
const ICONS: Record<string, IconCmp> = {
  BookMarked, BookOpen, Bot, Church, Film, Headphones, Home,
  Layers, Server, ShieldAlert, Sparkles, TrendingUp, Tv,
}

interface DynamicIconProps {
  name: string
  className?: string
  style?: CSSProperties
}

export function DynamicIcon({ name, className = 'w-5 h-5', style }: DynamicIconProps) {
  const Icon = ICONS[name] ?? Layers
  return <Icon className={className} style={style} />
}
