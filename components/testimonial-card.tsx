"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  delay: number
}

export function TestimonialCard({ name, role, content, rating, delay }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-300 mb-4 italic">"{content}"</p>
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-purple-400">{role}</p>
      </div>
    </motion.div>
  )
}
