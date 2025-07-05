"use client"

import { motion } from "framer-motion"
import { MapPin, Globe } from "lucide-react"

export function LocationMap() {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Globe className="w-5 h-5 text-cyan-400" />
        </div>
        <h3
          className="text-xl font-bold text-cyan-400"
          style={{
            textShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
          }}
        >
          Music Map
        </h3>
      </div>

      <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 flex items-center justify-center relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
          </motion.div>
          <p className="text-cyan-300 font-medium">Discovering Local Vibes</p>
          <p className="text-gray-400 text-sm mt-1">Music trends in your area</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Trending Genre</span>
          <span className="text-cyan-300">Electronic</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Local Artists</span>
          <span className="text-cyan-300">127 nearby</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Live Events</span>
          <span className="text-cyan-300">3 this week</span>
        </div>
      </div>
    </motion.div>
  )
}
