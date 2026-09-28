import React from 'react'
import * as Icons from 'lucide-react'

interface DynamicIconProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', style }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.Layers
  return <IconComponent className={className} style={style} />
}
