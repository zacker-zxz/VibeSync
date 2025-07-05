"use client"
import { Brain, MapPin, Cloud, Smartphone, Users, Zap } from "lucide-react"
import { FeatureCard } from "./feature-card"

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Mood Detection",
    description:
      "Advanced algorithms analyze your listening patterns and current context to understand your emotional state.",
    color: "from-purple-500 to-pink-500",
    delay: 0,
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Weather Integration",
    description:
      "Music recommendations that perfectly match the weather outside, creating the ideal atmospheric experience.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Location Awareness",
    description:
      "Discover local music trends and artists in your area while exploring new sounds from around the world.",
    color: "from-green-500 to-emerald-500",
    delay: 0.2,
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Cross-Platform Sync",
    description: "Seamlessly sync your music experience across all devices with real-time updates and preferences.",
    color: "from-orange-500 to-red-500",
    delay: 0.3,
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Social Discovery",
    description: "Connect with friends and discover what they're listening to, share playlists, and explore together.",
    color: "from-indigo-500 to-purple-500",
    delay: 0.4,
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Adaptation",
    description: "Real-time music adaptation based on your activity, time of day, and environmental factors.",
    color: "from-yellow-500 to-orange-500",
    delay: 0.5,
  },
]

export function SimpleFeatures() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  )
}
