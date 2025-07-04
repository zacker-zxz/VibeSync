"use client"

import { motion } from "framer-motion"

const moods = [
  { name: "Energetic", color: "from-red-500 to-orange-500", emoji: "⚡" },
  { name: "Chill", color: "from-blue-500 to-cyan-500", emoji: "😌" },
  { name: "Happy", color: "from-yellow-500 to-orange-500", emoji: "😊" },
  { name: "Melancholic", color: "from-purple-500 to-indigo-500", emoji: "🌙" },
  { name: "Focused", color: "from-green-500 to-teal-500", emoji: "🎯" },
  { name: "Romantic", color: "from-pink-500 to-rose-500", emoji: "💕" },
]

interface MoodSelectorProps {
  currentMood: string
  onMoodChange: (mood: string) => void
}

export function MoodSelector({ currentMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {moods.map((mood) => (
        <motion.button
          key={mood.name}
          className={`
            p-3 rounded-xl border transition-all duration-300
            ${
              currentMood === mood.name ? "border-purple-400 bg-purple-500/20" : "border-gray-600 hover:border-gray-500"
            }
          `}
          onClick={() => onMoodChange(mood.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-1">{mood.emoji}</div>
            <div className="text-sm font-medium">{mood.name}</div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
