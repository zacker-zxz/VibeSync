"use client"

import { motion } from "framer-motion"
import { Play, Music, Clock } from "lucide-react"
import Image from "next/image"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
  genre?: string
  mood?: string
}

interface PlaylistQueueProps {
  tracks?: Track[]
  currentTrack?: Track
  onTrackSelect?: (track: Track) => void
}

export function PlaylistQueue({ tracks = [], currentTrack, onTrackSelect }: PlaylistQueueProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-green-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Music className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3
            className="text-xl font-bold text-green-400"
            style={{
              textShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
            }}
          >
            Up Next
          </h3>
          <p className="text-sm text-gray-400">{tracks.length} tracks in queue</p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tracks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tracks in queue</p>
          </div>
        ) : (
          tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id
            return (
              <motion.div
                key={track.id}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isCurrentTrack
                    ? "border-green-400/50 bg-green-500/10 shadow-lg shadow-green-500/20"
                    : "border-gray-700 bg-gray-800/30 hover:border-green-500/30 hover:bg-green-500/5"
                }`}
                onClick={() => onTrackSelect?.(track)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  isCurrentTrack
                    ? {
                        boxShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.2)",
                          "0 0 20px rgba(34, 197, 94, 0.4)",
                          "0 0 10px rgba(34, 197, 94, 0.2)",
                        ],
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: isCurrentTrack ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={track.cover || "/placeholder.svg?height=48&width=48"}
                      alt={track.album}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    {isCurrentTrack && (
                      <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Play className="w-4 h-4 text-green-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate ${isCurrentTrack ? "text-green-300" : "text-white"}`}>
                      {track.title}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                    {track.genre && (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          {track.genre}
                        </span>
                        {track.mood && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {track.mood}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{track.duration}</span>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}
