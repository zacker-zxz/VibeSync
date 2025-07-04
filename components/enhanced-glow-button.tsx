"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface EnhancedGlowButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
}

export function EnhancedGlowButton({ children, onClick, size = "md", className = "", href }: EnhancedGlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const buttonContent = (
    <motion.button
      className={`
        relative font-semibold rounded-full
        bg-gradient-to-r from-pink-500 to-purple-500
        transition-all duration-300
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(147, 51, 234, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return <a href={href}>{buttonContent}</a>
  }

  return buttonContent
}
