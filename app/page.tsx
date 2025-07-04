"use client"

import { motion } from "framer-motion"
import { Music } from "lucide-react"
import Link from "next/link"
import { EnhancedParticleBackground } from "@/components/enhanced-particle-background"
import { EnhancedGlowButton } from "@/components/enhanced-glow-button"
import { TestimonialCard } from "@/components/testimonial-card"
import { SimpleFeatures } from "@/components/simple-features"
import { EnhancedFooter } from "@/components/enhanced-footer"

export default function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <EnhancedParticleBackground interactive enhanced />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).triggerParticleEnhancement) {
                ;(window as any).triggerParticleEnhancement()
              }
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
              }}
            >
              VibeSync
            </span>
          </motion.div>

          <motion.div
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={scrollToTop}
              className="hover:text-pink-400 transition-colors"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              Home
            </button>
            <a
              href="#features"
              className="hover:text-pink-400 transition-colors"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-purple-400 transition-colors"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/app">
              <EnhancedGlowButton>Launch App</EnhancedGlowButton>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent glow-heading hero-pulse"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              textShadow:
                "0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(147, 51, 234, 0.6), 0 0 120px rgba(59, 130, 246, 0.4)",
              filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))",
            }}
          >
            Sync Your Mood.
            <br />
            Feel the Vibe.
            <br />
            Hear the World.
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto glow-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: "0 0 20px rgba(209, 213, 219, 0.6), 0 0 40px rgba(147, 51, 234, 0.3)",
            }}
          >
            Experience music like never before. VibeSync creates personalized playlists based on your mood, weather, and
            location for the perfect sonic journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/app">
              <EnhancedGlowButton size="lg" className="text-xl px-12 py-4">
                Get Started
              </EnhancedGlowButton>
            </Link>
            <button
              className="text-lg text-gray-300 hover:text-white transition-colors border-b border-transparent hover:border-purple-400"
              style={{
                textShadow: "0 0 10px rgba(209, 213, 219, 0.2)",
              }}
            >
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
              }}
            >
              Revolutionary Features
            </h2>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{
                textShadow: "0 0 10px rgba(209, 213, 219, 0.2)",
              }}
            >
              Discover how VibeSync revolutionizes your music experience with cutting-edge technology
            </p>
          </motion.div>

          <SimpleFeatures />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent glow-heading"
              style={{
                textShadow: "0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
                filter: "drop-shadow(0 0 15px rgba(34, 197, 94, 0.4))",
              }}
            >
              What Users Say
            </h2>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{
                textShadow: "0 0 10px rgba(209, 213, 219, 0.2)",
              }}
            >
              Join thousands of music lovers who've transformed their listening experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              role="Music Producer"
              content="VibeSync completely changed how I discover music. The mood-based recommendations are incredibly accurate!"
              rating={5}
              delay={0}
            />
            <TestimonialCard
              name="Marcus Johnson"
              role="DJ & Artist"
              content="The weather sync feature is genius. My playlists now perfectly match the atmosphere of every gig."
              rating={5}
              delay={0.1}
            />
            <TestimonialCard
              name="Elena Rodriguez"
              role="Music Enthusiast"
              content="I've discovered so many amazing artists through VibeSync's location-based recommendations. It's like having a personal music curator."
              rating={5}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
              }}
            >
              Get In Touch
            </h2>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{
                textShadow: "0 0 10px rgba(209, 213, 219, 0.2)",
              }}
            >
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3
                  className="text-2xl font-bold mb-4 text-purple-400"
                  style={{
                    textShadow: "0 0 15px rgba(147, 51, 234, 0.4)",
                  }}
                >
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-3">
                    <span className="text-pink-400">📧</span>
                    <span>hello@vibesync.com</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="text-blue-400">🌐</span>
                    <span>www.vibesync.com</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="text-green-400">📱</span>
                    <span>+1 (555) 123-VIBE</span>
                  </p>
                </div>
              </div>
              <div>
                <h3
                  className="text-2xl font-bold mb-4 text-purple-400"
                  style={{
                    textShadow: "0 0 15px rgba(147, 51, 234, 0.4)",
                  }}
                >
                  Quick Message
                </h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
                  />
                  <EnhancedGlowButton className="w-full">Send Message</EnhancedGlowButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  )
}
