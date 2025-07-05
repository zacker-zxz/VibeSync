"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface WeatherWidgetProps {
  weather: {
    temp: number
    condition: string
    icon: string
  }
  isLoading: boolean
}

export function WeatherWidget({ weather, isLoading }: WeatherWidgetProps) {
  return (
    <motion.div
      className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-blue-500/20"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      ) : (
        <span className="text-lg">{weather.icon}</span>
      )}
      <div className="text-sm">
        <div className="text-blue-300 font-medium">{isLoading ? "Loading..." : `${weather.temp}°C`}</div>
        <div className="text-gray-400 text-xs">{isLoading ? "Weather" : weather.condition}</div>
      </div>
    </motion.div>
  )
}
