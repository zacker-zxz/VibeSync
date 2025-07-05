"use client"

import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
}

interface MusicPlayerProps {
  currentTrack: Track
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
}

export function MusicPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: MusicPlayerProps) {
  const [progress, setProgress] = useState(45)
  const [volume, setVolume] = useState(75)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Album Art */}
      <div className="relative mb-6">
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <Image
            src={currentTrack.cover || "/placeholder.svg"}
            alt={currentTrack.album}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <motion.button
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md ${
            isLiked ? "bg-pink-500/30 text-pink-400" : "bg-black/30 text-gray-400"
          }`}
          onClick={() => setIsLiked(!isLiked)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h2>
        <p className="text-purple-400 text-lg">{currentTrack.artist}</p>
        <p className="text-gray-400">{currentTrack.album}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>1:23</span>
          <span>{currentTrack.duration}</span>
        </div>
        <div className="relative">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <motion.button
          className="p-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Shuffle className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="p-3 text-white hover:text-purple-400 transition-colors"
          onClick={onPrevious}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white hover:from-pink-400 hover:to-purple-400 transition-all"
          onClick={onPlayPause}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
          }}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </motion.button>

        <motion.button
          className="p-3 text-white hover:text-purple-400 transition-colors"
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="p-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Repeat className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Volume */}
      <div className="flex items-center space-x-3">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="flex-1 relative">
          <div className="h-1 bg-gray-700 rounded-full">
            <div
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${volume}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-sm text-gray-400 w-8">{volume}</span>
      </div>
    </motion.div>
  )
}
