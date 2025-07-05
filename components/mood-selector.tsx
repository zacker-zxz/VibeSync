"use client"

import { motion } from "framer-motion"
import { Smile, Frown, Meh, Heart, Zap, Sun, Cloud, Moon } from "lucide-react"

interface MoodSelectorProps {
  currentMood: string
  onMoodChange: (mood: string) => void
}

const moods = [
  { name: "Happy", icon: Smile, color: "from-yellow-400 to-orange-500" },
  { name: "Energetic", icon: Zap, color: "from-red-400 to-pink-500" },
  { name: "Romantic", icon: Heart, color: "from-pink-400 to-rose-500" },
  { name: "Chill", icon: Sun, color: "from-blue-400 to-cyan-500" },
  { name: "Melancholy", icon: Cloud, color: "from-gray-400 to-slate-500" },
  { name: "Peaceful", icon: Moon, color: "from-indigo-400 to-purple-500" },
  { name: "Neutral", icon: Meh, color: "from-gray-500 to-gray-600" },
  { name: "Sad", icon: Frown, color: "from-blue-600 to-indigo-600" },
]

export function MoodSelector({ currentMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {moods.map((mood) => {
        const isSelected = currentMood === mood.name
        return (
          <motion.button
            key={mood.name}
            onClick={() => onMoodChange(mood.name)}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              isSelected
                ? "border-purple-400/50 bg-purple-500/20 shadow-lg shadow-purple-500/25"
                : "border-gray-600 bg-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              isSelected
                ? {
                    boxShadow: [
                      "0 0 15px rgba(147, 51, 234, 0.3)",
                      "0 0 25px rgba(147, 51, 234, 0.5)",
                      "0 0 15px rgba(147, 51, 234, 0.3)",
                    ],
                  }
                : {}
            }
            transition={{
              boxShadow: {
                duration: 2,
                repeat: isSelected ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              },
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${mood.color}`}>
                <mood.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-sm font-medium ${isSelected ? "text-purple-300" : "text-gray-300"}`}>
                {mood.name}
              </span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
