"use client"

import { motion } from "framer-motion"
import { Music, Instagram, Twitter, Github, Linkedin } from "lucide-react"

export function EnhancedFooter() {
  const socialLinks = [
    { icon: Instagram, href: "#", color: "text-pink-400 hover:text-pink-300" },
    { icon: Twitter, href: "#", color: "text-blue-400 hover:text-blue-300" },
    { icon: Github, href: "#", color: "text-purple-400 hover:text-purple-300" },
    { icon: Linkedin, href: "#", color: "text-cyan-400 hover:text-cyan-300" },
  ]

  const footerLinks = [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Support", href: "#" },
  ]

  return (
    <footer className="py-16 px-6 border-t border-purple-500/20 bg-gray-900/30 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span
                className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
                }}
              >
                VibeSync
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-left max-w-xs">
              Sync your mood, feel the vibe, hear the world. The future of music discovery.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-4 text-white"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
              }}
            >
              Quick Links
            </h3>
            <div className="space-y-3">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:glow"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.5)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = "none"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-4 text-white"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
              }}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-3 rounded-full bg-gray-800/50 border border-gray-600 ${social.color} transition-all duration-300`}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="text-center pt-8 border-t border-purple-500/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p
            className="text-gray-500"
            style={{
              textShadow: "0 0 5px rgba(156, 163, 175, 0.2)",
            }}
          >
            &copy; 2024 VibeSync. All rights reserved. Made with 💜 for music lovers worldwide.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
