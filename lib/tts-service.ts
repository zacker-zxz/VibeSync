export interface TTSOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice
}

export class TTSService {
  private synth: SpeechSynthesis | null = null
  private isSupported: boolean = false
  private currentUtterance: SpeechSynthesisUtterance | null = null

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis
      this.isSupported = true
    }
  }

  isAvailable(): boolean {
    return this.isSupported
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.synth ? this.synth.getVoices() : []
  }

  speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported || !this.synth) {
        reject(new Error("Text-to-speech is not supported in this browser"))
        return
      }
      // ...existing code...

      // Stop any current speech
      this.stop()

      const utterance = new SpeechSynthesisUtterance(text)

      // Set options
      utterance.rate = options.rate || 0.9
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 0.8

      if (options.voice) {
        utterance.voice = options.voice
      }

      // Set up event listeners
      utterance.onend = () => {
        this.currentUtterance = null
        resolve()
      }

      utterance.onerror = (event) => {
        this.currentUtterance = null
        reject(new Error(`Speech synthesis error: ${event.error}`))
      }

      this.currentUtterance = utterance
      this.synth.speak(utterance)
    })
  }

  stop(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel()
    }
    this.currentUtterance = null
  }

  pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause()
    }
  }

  resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume()
    }
  }

  isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false
  }

  isPaused(): boolean {
    return this.synth ? this.synth.paused : false
  }
}

// Singleton instance
export const ttsService = new TTSService()

// Helper function to read homepage content
export async function readHomepageContent(): Promise<void> {
  const content = [
    "Welcome to VibeSync - Your mood-based music recommendation platform.",
    "Discover music that matches your current vibe and location.",
    "Our key features include:",
    "Smart mood detection based on your environment and weather conditions.",
    "Location-based music discovery to find local artists and trending songs.",
    "Real-time weather integration that influences your music recommendations.",
    "Personalized playlists that adapt to your daily routine and preferences.",
    "Get started today and let VibeSync curate the perfect soundtrack for your life.",
  ]

  try {
    for (const text of content) {
      await ttsService.speak(text)
      // Small pause between sections
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  } catch (error) {
    console.error("Error reading homepage content:", error)
  }
}
