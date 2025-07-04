"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Heart, LogOut, X, Save, Palette } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserSettings {
  name: string
  age: string
  gender: string
  personType: string
  preferredGenres: string[]
  themeColor: string
  backgroundAnimation: boolean
}

const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "R&B", "Country", "Indie", "Alternative"]

export function FixedSidebar() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "Music Lover",
    age: "25",
    gender: "prefer-not-to-say",
    personType: "explorer",
    preferredGenres: ["Electronic", "Pop"],
    themeColor: "purple-pink",
    backgroundAnimation: true,
  })

  const [likedSongs] = useState([
    { id: 1, title: "Neon Dreams", artist: "Synthwave Collective", liked: true },
    { id: 2, title: "Midnight Vibes", artist: "Lo-Fi Masters", liked: true },
    { id: 3, title: "Electric Pulse", artist: "Future Bass", liked: true },
    { id: 4, title: "Cosmic Journey", artist: "Space Ambient", liked: true },
  ])

  useEffect(() => {
    const saved = localStorage.getItem("vibesync-settings")
    if (saved) {
      setUserSettings(JSON.parse(saved))
    }
  }, [])

  const handleSaveSettings = () => {
    localStorage.setItem("vibesync-settings", JSON.stringify(userSettings))
    alert("Settings saved successfully!")
  }

  const handleLogout = () => {
    localStorage.removeItem("vibesync-settings")
    router.push("/")
  }

  const handleGenreToggle = (genre: string) => {
    setUserSettings((prev) => ({
      ...prev,
      preferredGenres: prev.preferredGenres.includes(genre)
        ? prev.preferredGenres.filter((g) => g !== genre)
        : [...prev.preferredGenres, genre],
    }))
  }

  const sidebarItems = [
    { id: "settings", icon: Settings, label: "Settings", color: "text-purple-400" },
    { id: "liked", icon: Heart, label: "Liked", color: "text-pink-400" },
    { id: "personalization", icon: Palette, label: "Style", color: "text-blue-400" },
  ]

  return (
    <>
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-20 h-full w-20 bg-gray-900/80 backdrop-blur-md border-r border-purple-500/30 flex flex-col items-center py-8 space-y-6 z-40">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(activeTab === item.id ? null : item.id)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id
                ? "bg-purple-500/30 border border-purple-400"
                : "bg-gray-800/30 hover:bg-gray-700/50 border border-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: activeTab === item.id ? "0 0 20px rgba(147, 51, 234, 0.5)" : "none",
            }}
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </motion.button>
        ))}

        <div className="flex-1" />

        <motion.button
          onClick={handleLogout}
          className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
          }}
        >
          <LogOut className="w-6 h-6 text-red-400" />
        </motion.button>
      </div>

      {/* Expandable Panel */}
      <AnimatePresence>
        {activeTab && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTab(null)}
            />

            {/* Panel */}
            <motion.div
              className="fixed left-20 top-20 bottom-0 w-96 bg-gray-900/95 backdrop-blur-md border-r border-purple-500/30 z-50 overflow-y-auto"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                <h2 className="text-xl font-bold text-white">
                  {sidebarItems.find((item) => item.id === activeTab)?.label}
                </h2>
                <button
                  onClick={() => setActiveTab(null)}
                  className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "settings" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={userSettings.name}
                        onChange={(e) => setUserSettings((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                      <input
                        type="number"
                        value={userSettings.age}
                        onChange={(e) => setUserSettings((prev) => ({ ...prev, age: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                      <select
                        value={userSettings.gender}
                        onChange={(e) => setUserSettings((prev) => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none text-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type of Person</label>
                      <select
                        value={userSettings.personType}
                        onChange={(e) => setUserSettings((prev) => ({ ...prev, personType: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none text-white"
                      >
                        <option value="explorer">Music Explorer</option>
                        <option value="casual">Casual Listener</option>
                        <option value="enthusiast">Music Enthusiast</option>
                        <option value="creator">Music Creator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Genres</label>
                      <div className="grid grid-cols-2 gap-2">
                        {genres.map((genre) => (
                          <button
                            key={genre}
                            onClick={() => handleGenreToggle(genre)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              userSettings.preferredGenres.includes(genre)
                                ? "bg-purple-500/30 text-purple-300 border border-purple-400"
                                : "bg-gray-800/50 text-gray-400 border border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSaveSettings}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>
                  </motion.div>
                )}

                {activeTab === "liked" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Liked Songs ({likedSongs.length})</h3>
                    {likedSongs.map((song) => (
                      <div
                        key={song.id}
                        className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white fill-current" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{song.title}</p>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "personalization" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Background Animation</p>
                        <p className="text-sm text-gray-400">Enhanced particle effects</p>
                      </div>
                      <button
                        onClick={() =>
                          setUserSettings((prev) => ({ ...prev, backgroundAnimation: !prev.backgroundAnimation }))
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          userSettings.backgroundAnimation ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            userSettings.backgroundAnimation ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      onClick={handleSaveSettings}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all"
                    >
                      <Palette className="w-4 h-4" />
                      <span>Apply Settings</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
