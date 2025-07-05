"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Loader2 } from "lucide-react"
import { ttsService, readHomepageContent } from "@/lib/tts-service"

export function TTSButton() {
  const [isSupported, setIsSupported] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if TTS is supported
    setIsSupported(ttsService.isAvailable())
  }, [])

  const handleTTSToggle = async () => {
    if (!isSupported) {
      alert("Text-to-speech is not supported in your browser")
      return
    }

    if (isPlaying) {
      // Stop current speech
      ttsService.stop()
      setIsPlaying(false)
      setIsLoading(false)
    } else {
      // Start reading homepage content
      setIsLoading(true)
      setIsPlaying(true)

      try {
        await readHomepageContent()
      } catch (error) {
        console.error("TTS Error:", error)
        alert("Sorry, there was an error with text-to-speech")
      } finally {
        setIsPlaying(false)
        setIsLoading(false)
      }
    }
  }

  if (!isSupported) {
    return null // Don't render if not supported
  }

  return (
    <motion.button
      onClick={handleTTSToggle}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
        isPlaying
          ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/25"
          : "bg-gray-900/80 backdrop-blur-md border border-purple-500/30 hover:border-purple-500/50"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isPlaying
          ? {
              boxShadow: [
                "0 0 20px rgba(236, 72, 153, 0.3)",
                "0 0 30px rgba(236, 72, 153, 0.6)",
                "0 0 20px rgba(236, 72, 153, 0.3)",
              ],
            }
          : {}
      }
      transition={
        isPlaying
          ? {
              boxShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }
          : {}
      }
      title={isPlaying ? "Stop reading" : "Read page content"}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-6 h-6 text-white" />
      ) : (
        <Volume2 className="w-6 h-6 text-purple-400" />
      )}
    </motion.button>
  )
}
