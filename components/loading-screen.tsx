"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface LoadingScreenProps {
  isVisible: boolean
  onComplete: () => void
}

const loadingSteps = [
  { text: "Detecting Location...", duration: 2000 },
  { text: "Fetching IP Address...", duration: 2500 },
  { text: "Collecting Weather Information...", duration: 3000 },
  { text: "Syncing Vibe Data...", duration: 2500 },
  { text: "Preparing Your Experience...", duration: 2000 },
]

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!isVisible) return

    let stepTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const runLoadingSequence = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i)

        // Animate progress for current step
        const stepDuration = loadingSteps[i].duration
        const progressIncrement = 100 / loadingSteps.length / (stepDuration / 50)

        progressTimer = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + progressIncrement
            const maxProgress = ((i + 1) / loadingSteps.length) * 100
            return Math.min(newProgress, maxProgress)
          })
        }, 50)

        await new Promise((resolve) => {
          stepTimer = setTimeout(resolve, stepDuration)
        })

        clearInterval(progressTimer)
      }

      // Complete loading
      setProgress(100)

      // Wait a moment then navigate
      setTimeout(() => {
        onComplete()
        router.push("/app")
      }, 1000)
    }

    runLoadingSequence()

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressTimer)
    }
  }, [isVisible, onComplete, router])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Animated Logo */}
          <motion.div
            className="mb-8"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.h2
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-bold text-white mb-2"
            style={{
              textShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
            }}
          >
            {loadingSteps[currentStep]?.text}
          </motion.h2>

          <p className="text-gray-400 mb-8">Setting up your personalized music experience...</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="text-purple-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
