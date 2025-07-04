"use client"

import { Cloud, Sun, CloudRain } from "lucide-react"

interface WeatherWidgetProps {
  weather: {
    temp: number
    condition: string
    icon: string
  }
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const getWeatherIcon = () => {
    switch (weather.condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-4 h-4 text-yellow-400" />
      case "cloudy":
        return <Cloud className="w-4 h-4 text-gray-400" />
      case "rainy":
        return <CloudRain className="w-4 h-4 text-blue-400" />
      default:
        return <Sun className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-md rounded-lg px-3 py-2 border border-blue-500/20">
      {getWeatherIcon()}
      <span className="text-sm text-white">{weather.temp}°F</span>
      <span className="text-xs text-gray-400">{weather.condition}</span>
    </div>
  )
}
