"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export function GlowButton({ children, onClick, size = "md", className = "" }: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      className={`
        relative font-semibold rounded-full
        bg-gradient-to-r from-pink-500 to-purple-500
        hover:from-pink-400 hover:to-purple-400
        transition-all duration-300
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: "0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-50 -z-10" />
    </motion.button>
  )
}
