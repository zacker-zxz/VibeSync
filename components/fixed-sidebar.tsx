"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Heart, X, Save, Palette, Home, Music, TrendingUp, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Music, label: "Discover", href: "/app" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

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

  return (
    <>
      {/* Fixed Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-20 bg-gray-900/50 backdrop-blur-md border-r border-purple-500/20 z-40 flex flex-col items-center py-6"
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white font-bold text-lg">V</span>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col space-y-4">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.button
                  className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </nav>
         {/* Logout Button */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <motion.button
            onClick={handleLogout}
            className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/30 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Logout"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Bottom Indicator */}
        <motion.div
          className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

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
                  {sidebarItems.find((item) => item.label === activeTab)?.label}
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
                {activeTab === "Settings" && (
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
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all mb-4"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}

                {activeTab === "Favorites" && (
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

                {activeTab === "Profile" && (
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
