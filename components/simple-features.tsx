"use client"

import { motion } from "framer-motion"
import { Headphones, MapPin, Zap, Music } from "lucide-react"

const features = [
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "🎧 Mood-Based Music Recommendations",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "📍 Location & Weather Synced Playlists",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "🎵 Real-time Vibe Matching Engine",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "💽 Powered by Spotify & Apple Music APIs",
    color: "from-green-500 to-emerald-500",
  },
]

export function SimpleFeatures() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="group relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full text-center">
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
            />

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
            >
              <div className="text-white">{feature.icon}</div>
            </div>

            {/* Title */}
            <h3
              className="text-lg font-bold text-white"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
              }}
            >
              {feature.title}
            </h3>

            {/* Hover glow border */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
