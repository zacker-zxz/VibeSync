"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Play, Music, MapPin, Cloud, Users, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedParticleBackground } from "@/components/enhanced-particle-background"
import { SimpleFeatures } from "@/components/simple-features"
import { TestimonialCard } from "@/components/testimonial-card"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { TTSButton } from "@/components/tts-button"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(false)

  const handleGetStarted = () => {
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <EnhancedParticleBackground />

      {/* Loading Screen */}
      <LoadingScreen isVisible={showLoading} onComplete={handleLoadingComplete} />

      {/* TTS Button - Only on homepage */}
      <TTSButton />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span
              className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
              }}
            >
              VibeSync
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300"
            style={{
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
            }}
          >
            Launch App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(236, 72, 153, 0.3)",
                lineHeight: "1.1",
              }}
            >
              VibeSync
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
              style={{ marginTop: "2rem" }}
            >
              Discover music that matches your mood, location, and the world around you.
              <br />
              Let AI curate the perfect soundtrack for every moment of your life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                style={{
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
                }}
              >
                <Play className="w-5 h-5" />
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Button>

              
            </motion.div>
          </motion.div>

          {/* Floating Music Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[Music, MapPin, Cloud, Users, Sparkles].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
              >
                <Icon className="w-8 h-8 text-purple-400/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent Music Discovery
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of music recommendation with our AI-powered platform that understands your mood,
              environment, and preferences.
            </p>
          </motion.div>

          <SimpleFeatures />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of music lovers who have transformed their listening experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              name="Sarah Chen"
              role="Music Producer"
              content="VibeSync has completely changed how I discover new music. The mood-based recommendations are incredibly accurate!"
              avatar="/placeholder.svg?height=60&width=60"
            />
            <TestimonialCard
              name="Marcus Johnson"
              role="DJ & Artist"
              content="The location-based features help me find local talent and understand regional music trends. It's a game-changer!"
              avatar="/placeholder.svg?height=60&width=60"
            />
            <TestimonialCard
              name="Elena Rodriguez"
              role="Music Enthusiast"
              content="I love how it adapts to the weather and time of day. It's like having a personal DJ who knows exactly what I need."
              avatar="/placeholder.svg?height=60&width=60"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            <Card className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 relative overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-pulse" />

              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-8">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      background: "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    Get in Touch
                  </motion.h2>
                  <p className="text-gray-400 text-lg">Ready to revolutionize your music experience? Let's connect!</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder="Tell us about your music preferences and how we can help..."
                    />
                  </div>

                  <div className="text-center">
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: "0 0 25px rgba(147, 51, 234, 0.4)",
                      }}
                    >
                      <span>Send Message</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </form>

                {/* Pulsing Icons */}
                <div className="flex justify-center space-x-8 mt-8">
                  {[Music, MapPin, Cloud].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      <Icon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  )
}
