"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Cloud, Thermometer, Search } from "lucide-react"
import Link from "next/link"
import { EnhancedParticleBackground } from "@/components/enhanced-particle-background"
import { MoodSelector } from "@/components/mood-selector"
import { PlaylistQueue } from "@/components/playlist-queue"
import { WeatherWidget } from "@/components/weather-widget"
import { LocationWidget } from "@/components/location-widget"
import { FixedSidebar } from "@/components/fixed-sidebar"
import { LocationMap } from "@/components/location-map"
import { EnhancedMusicPlayer } from "@/components/enhanced-music-player"
import { dummyTracks, searchTracks, type Track } from "@/data/dummy-music"

export default function AppPage() {
  const [currentTrack, setCurrentTrack] = useState(dummyTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMood, setCurrentMood] = useState("Energetic")
  const [weather, setWeather] = useState({ temp: 72, condition: "Sunny", icon: "☀️" })
  const [location, setLocation] = useState({ city: "San Francisco", country: "US" })

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Track[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setSearchResults(searchTracks(query))
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedParticleBackground />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span
              className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
              }}
            >
              VibeSync
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search music..."
                className="bg-gray-900/50 border border-purple-500/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-64"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <WeatherWidget weather={weather} />
            <LocationWidget location={location} />
          </div>
        </div>
      </header>

      {/* Fixed Sidebar */}
      <FixedSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-20 pt-20 p-8">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Current Status */}
          <div className="space-y-6">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-xl font-bold mb-4 text-purple-400"
                style={{
                  textShadow: "0 0 15px rgba(147, 51, 234, 0.4)",
                }}
              >
                Current Mood
              </h3>
              <MoodSelector currentMood={currentMood} onMoodChange={setCurrentMood} />
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3
                className="text-xl font-bold mb-4 text-blue-400"
                style={{
                  textShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
                }}
              >
                Environment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-blue-400" />
                    <span>Weather</span>
                  </div>
                  <span className="text-blue-300">{weather.condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-orange-400" />
                    <span>Temperature</span>
                  </div>
                  <span className="text-orange-300">{weather.temp}°F</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span>Location</span>
                  </div>
                  <span className="text-green-300">{location.city}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column - Music Player */}
          <div className="space-y-6">
            <EnhancedMusicPlayer
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onNext={() => {
                const currentIndex = dummyTracks.findIndex((track) => track.id === currentTrack.id)
                const nextIndex = (currentIndex + 1) % dummyTracks.length
                setCurrentTrack(dummyTracks[nextIndex])
              }}
              onPrevious={() => {
                const currentIndex = dummyTracks.findIndex((track) => track.id === currentTrack.id)
                const prevIndex = currentIndex === 0 ? dummyTracks.length - 1 : currentIndex - 1
                setCurrentTrack(dummyTracks[prevIndex])
              }}
            />
          </div>

          {/* Right Column - Playlist Queue */}
          <div className="space-y-6">
            <PlaylistQueue
              tracks={searchResults.length > 0 ? searchResults : dummyTracks}
              currentTrack={currentTrack}
              onTrackSelect={setCurrentTrack}
            />
            <LocationMap />
          </div>
        </div>
      </div>
    </div>
  )
}
