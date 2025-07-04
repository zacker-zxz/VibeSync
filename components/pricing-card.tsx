"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { GlowButton } from "./glow-button"

interface PricingCardProps {
  title: string
  price: string
  period: string
  features: string[]
  color: string
  popular?: boolean
  delay: number
}

export function PricingCard({ title, price, period, features, color, popular, delay }: PricingCardProps) {
  return (
    <motion.div
      className={`
        bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border relative
        ${popular ? "border-purple-400/60 scale-105" : "border-purple-500/20"}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400 ml-1">{period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <GlowButton className="w-full">Get Started</GlowButton>
    </motion.div>
  )
}
