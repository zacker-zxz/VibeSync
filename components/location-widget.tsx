"use client"

import { MapPin } from "lucide-react"

interface LocationWidgetProps {
  location: {
    city: string
    country: string
  }
}

export function LocationWidget({ location }: LocationWidgetProps) {
  return (
    <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-md rounded-lg px-3 py-2 border border-green-500/20">
      <MapPin className="w-4 h-4 text-green-400" />
      <span className="text-sm text-white">{location.city}</span>
      <span className="text-xs text-gray-400">{location.country}</span>
    </div>
  )
}
