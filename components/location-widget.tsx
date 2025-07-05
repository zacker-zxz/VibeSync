"use client"

import { motion } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"

interface LocationWidgetProps {
  location: {
    city: string
    country: string
  }
  isLoading: boolean
}

export function LocationWidget({ location, isLoading }: LocationWidgetProps) {
  return (
    <motion.div
      className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-green-500/20"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
      ) : (
        <MapPin className="w-4 h-4 text-green-400" />
      )}
      <div className="text-sm">
        <div className="text-green-300 font-medium">{isLoading ? "Locating..." : location.city}</div>
        <div className="text-gray-400 text-xs">{isLoading ? "Location" : location.country}</div>
      </div>
    </motion.div>
  )
}
