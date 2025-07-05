"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Heart, LogOut, X, Save, Palette } from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

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
const themeColors = [
  { name: "Purple-Pink", value: "purple-pink", gradient: "from-purple-500 to-pink-500" },
  { name: "Blue-Cyan", value: "blue-cyan", gradient: "from-blue-500 to-cyan-500" },
  { name: "Green-Teal", value: "green-teal", gradient: "from-green-500 to-teal-500" },
  { name: "Orange-Red", value: "orange-red", gradient: "from-orange-500 to-red-500" },
]

export function EnhancedSidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("settings")
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

  const handleSaveSettings = () => {
    localStorage.setItem("vibesync-settings", JSON.stringify(userSettings))
    // You could also trigger a global state update here
  }

  const handleLogout = () => {
    router.push("/")
    onClose()
  }

  const handleGenreToggle = (genre: string) => {
    setUserSettings((prev) => ({
      ...prev,
      preferredGenres: prev.preferredGenres.includes(genre)
        ? prev.preferredGenres.filter((g) => g !== genre)
        : [...prev.preferredGenres, genre],
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                VibeSync
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-purple-500/20">
              {[
                { id: "settings", icon: Settings, label: "Settings" },
                { id: "liked", icon: Heart, label: "Liked" },
                { id: "personalization", icon: Palette, label: "Style" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors ${
                    activeTab === tab.id
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Theme Color</label>
                    <div className="grid grid-cols-2 gap-3">
                      {themeColors.map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() => setUserSettings((prev) => ({ ...prev, themeColor: theme.value }))}
                          className={`p-3 rounded-lg border transition-all ${
                            userSettings.themeColor === theme.value
                              ? "border-white"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <div className={`w-full h-8 bg-gradient-to-r ${theme.gradient} rounded mb-2`} />
                          <p className="text-sm text-white">{theme.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

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
                    <span>Apply Theme</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Logout Button - Fixed at bottom */}
            <div className="p-6 border-t border-purple-500/20 bg-gray-900/95">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
