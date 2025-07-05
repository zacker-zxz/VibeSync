"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export function TestimonialCard({ name, role, content, rating, avatar }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Image src={avatar || "/placeholder.svg"} alt={name} width={48} height={48} className="rounded-full" />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 leading-relaxed">{content}</p>
    </motion.div>
  )
}
