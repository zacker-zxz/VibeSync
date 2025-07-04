"use client"

import { motion } from "framer-motion"
import { Play, MoreHorizontal } from "lucide-react"
import Image from "next/image"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
}

interface PlaylistQueueProps {
  tracks: Track[]
  currentTrack: Track
  onTrackSelect: (track: Track) => void
}

export function PlaylistQueue({ tracks, currentTrack, onTrackSelect }: PlaylistQueueProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-6 text-purple-400">Up Next</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            className={`
              flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300
              ${currentTrack.id === track.id ? "bg-purple-500/20 border border-purple-400/40" : "hover:bg-gray-800/50"}
            `}
            onClick={() => onTrackSelect(track)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
              <Image
                src={track.cover || "/placeholder.svg"}
                alt={track.album}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
              {currentTrack.id === track.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${currentTrack.id === track.id ? "text-purple-400" : "text-white"}`}>
                {track.title}
              </p>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-sm">{track.duration}</span>
              <button className="p-1 hover:text-white transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
