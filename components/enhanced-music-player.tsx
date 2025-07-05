"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { dummyTracks, type Track } from "@/data/dummy-music"
import type { WeatherTheme } from "@/lib/theme-utils"

interface EnhancedMusicPlayerProps {
  currentTrack?: Track
  isPlaying?: boolean
  onPlayPause?: () => void
  onNext?: () => void
  onPrevious?: () => void
  weatherTheme?: WeatherTheme
  weatherCondition?: string
}

export function EnhancedMusicPlayer({
  currentTrack = dummyTracks[0],
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrevious,
  weatherTheme,
  weatherCondition = "clear",
}: EnhancedMusicPlayerProps) {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "one" | "all">("off")
  const [isLiked, setIsLiked] = useState(false)

  const duration = Number(currentTrack.duration) || 180

  // Simulate progress when playing
  useEffect(() => {
  let interval: NodeJS.Timeout
  if (isPlaying) {
    interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        return newProgress >= duration ? 0 : newProgress
      })
    }, 1000)
  }
  return () => clearInterval(interval)
}, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTime = progress
const totalTime = duration

  // Apply weather theme styles
  const getWeatherStyles = () => {
    if (!weatherTheme) return {}

    return {
      "--weather-gradient": weatherTheme.gradient,
      "--weather-shadow": weatherTheme.shadow,
      "--weather-accent": weatherTheme.accent.replace("border-", "").replace("/30", ""),
    } as React.CSSProperties
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={getWeatherStyles()}
    >
      <Card
        className={`bg-gray-900/50 backdrop-blur-md border ${weatherTheme?.accent || "border-purple-500/20"} overflow-hidden`}
      >
        <CardContent className="p-6">
          {/* Album Art */}
          <div className="relative mb-6">
            <motion.div
              className="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600"
              animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <img
                src={currentTrack.albumArt || "https://media.istockphoto.com/id/480524526/vector/light-music-notes-on-background.jpg?s=612x612&w=0&k=20&c=2IX2dCH2dibMiOpnRaYv8lVHuldGuloiN9lvrr2J9H0="}
                alt={`${currentTrack.title} album art`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating particles when playing */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${weatherTheme ? "bg-current" : "bg-purple-400"}`}
                    style={{
                      color: weatherTheme ? `var(--weather-accent)` : undefined,
                      opacity: 0.6,
                    }}
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                    }}
                    animate={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-1">{currentTrack.title}</h3>
            <p className="text-gray-400">{currentTrack.artist}</p>
            <p className="text-sm text-gray-500 mt-1">{currentTrack.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
  value={[progress]}
  onValueChange={(value) => setProgress(value[0])}
  max={duration}
  step={1}
  className="w-full"
/>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={`text-gray-400 hover:text-white ${isShuffled ? "text-purple-400" : ""}`}
            >
              <Shuffle className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={onPrevious} className="text-gray-400 hover:text-white">
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={onPlayPause}
              className={`w-12 h-12 rounded-full ${
                weatherTheme
                  ? `bg-gradient-to-r ${weatherTheme.primary} hover:opacity-90`
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }`}
              style={weatherTheme ? { boxShadow: weatherTheme.shadow } : {}}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={onNext} className="text-gray-400 hover:text-white">
              <SkipForward className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeatMode((prev) => (prev === "off" ? "all" : prev === "all" ? "one" : "off"))}
              className={`text-gray-400 hover:text-white ${repeatMode !== "off" ? "text-purple-400" : ""}`}
            >
              <Repeat className="w-4 h-4" />
              {repeatMode === "one" && <span className="absolute -top-1 -right-1 text-xs">1</span>}
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`${isLiked ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>

            <div className="flex items-center space-x-2 flex-1 max-w-32 ml-4">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

          {/* Weather-based mood indicator */}
          {weatherCondition && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Playing music for {weatherCondition} weather</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
