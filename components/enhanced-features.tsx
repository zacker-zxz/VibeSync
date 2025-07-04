"use client"

import { motion } from "framer-motion"
import { Headphones, MapPin, Cloud, Zap, Music, BarChart3, Smartphone, Palette } from "lucide-react"

const features = [
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "Mood + Weather-based Music Curation",
    description:
      "Advanced AI algorithms analyze your current emotional state combined with real-time weather data to curate the perfect soundtrack for your moment. Whether it's a rainy melancholic evening or a sunny energetic morning, VibeSync adapts.",
    color: "from-pink-500 to-rose-500",
    details: [
      "Real-time mood detection",
      "Weather pattern analysis",
      "Contextual music matching",
      "Emotional resonance scoring",
    ],
  },
  {
    icon: <Music className="w-10 h-10" />,
    title: "Real-time Spotify & Apple Music Integration",
    description:
      "Seamlessly connect with your favorite streaming platforms. Access millions of tracks, sync your existing playlists, and discover new music across multiple services with unified controls and cross-platform compatibility.",
    color: "from-purple-500 to-indigo-500",
    details: ["Multi-platform sync", "Playlist importing", "Cross-service search", "Unified playback controls"],
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Personalized Audio Experience",
    description:
      "Machine learning creates a unique audio fingerprint based on your listening habits, preferences, and behavioral patterns. The more you use VibeSync, the better it understands your musical DNA.",
    color: "from-blue-500 to-cyan-500",
    details: ["Adaptive algorithms", "Listening pattern analysis", "Preference learning", "Behavioral insights"],
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Visual Syncing With Vibes",
    description:
      "Experience music through stunning visual representations. Dynamic particle effects, color-coded moods, and reactive animations create an immersive audio-visual journey that responds to your music in real-time.",
    color: "from-green-500 to-emerald-500",
    details: ["Real-time visualizations", "Mood-based colors", "Interactive particles", "Audio-reactive effects"],
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Cross-platform Responsive Support",
    description:
      "Enjoy VibeSync anywhere, anytime. Our responsive design ensures a consistent, beautiful experience across desktop, tablet, and mobile devices with offline capabilities and cloud synchronization.",
    color: "from-yellow-500 to-orange-500",
    details: ["Mobile optimization", "Offline playback", "Cloud sync", "Multi-device continuity"],
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "User Mood Tracker & History",
    description:
      "Track your emotional journey through music. Detailed analytics show mood patterns, music preferences over time, and personalized insights to help you understand your musical relationship better.",
    color: "from-red-500 to-pink-500",
    details: ["Mood analytics", "Listening history", "Pattern recognition", "Personal insights"],
  },
  {
    icon: <MapPin className="w-10 h-10" />,
    title: "Location-Aware Discovery",
    description:
      "Discover music that resonates with your surroundings. From local artists in your city to sounds that match your environment, location-based recommendations add a geographical dimension to your music discovery.",
    color: "from-teal-500 to-green-500",
    details: ["Local artist discovery", "Geographic music trends", "Environmental matching", "Cultural exploration"],
  },
  {
    icon: <Cloud className="w-10 h-10" />,
    title: "Weather-Responsive Playlists",
    description:
      "Let the weather set your musical mood. Our advanced weather integration creates dynamic playlists that evolve with changing conditions, from thunderstorm ambience to sunny day anthems.",
    color: "from-indigo-500 to-purple-500",
    details: ["Weather API integration", "Atmospheric matching", "Seasonal adaptations", "Climate-based moods"],
  },
]

export function EnhancedFeatures() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Revolutionary Features
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience the future of music discovery with cutting-edge technology that understands you, your
            environment, and your emotions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 h-full">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{feature.description}</p>

                {/* Feature details */}
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detailIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + detailIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                      <span className="text-sm text-gray-400">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover glow border */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-300 mb-8">Ready to revolutionize your music experience?</p>
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)",
            }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
