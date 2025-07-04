export interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
  genre: string
  mood: string
  year: number
  popularity: number
}

export const dummyTracks: Track[] = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    album: "Cyber Nights",
    duration: "3:45",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Synthwave",
    mood: "Energetic",
    year: 2023,
    popularity: 85,
  },
  {
    id: 2,
    title: "Midnight Vibes",
    artist: "Lo-Fi Masters",
    album: "Chill Sessions",
    duration: "4:12",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Lo-Fi",
    mood: "Chill",
    year: 2023,
    popularity: 92,
  },
  {
    id: 3,
    title: "Electric Pulse",
    artist: "Future Bass",
    album: "Digital Emotions",
    duration: "3:28",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Electronic",
    mood: "Energetic",
    year: 2024,
    popularity: 78,
  },
  {
    id: 4,
    title: "Cosmic Journey",
    artist: "Space Ambient",
    album: "Stellar Sounds",
    duration: "5:33",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Ambient",
    mood: "Dreamy",
    year: 2023,
    popularity: 67,
  },
  {
    id: 5,
    title: "Urban Nights",
    artist: "City Beats",
    album: "Metropolitan",
    duration: "3:56",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Hip-Hop",
    mood: "Cool",
    year: 2024,
    popularity: 89,
  },
  {
    id: 6,
    title: "Rainy Day Blues",
    artist: "Melancholy Minds",
    album: "Weather Moods",
    duration: "4:23",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Blues",
    mood: "Melancholic",
    year: 2023,
    popularity: 73,
  },
  {
    id: 7,
    title: "Summer Breeze",
    artist: "Tropical Waves",
    album: "Sunny Days",
    duration: "3:17",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Tropical House",
    mood: "Happy",
    year: 2024,
    popularity: 94,
  },
  {
    id: 8,
    title: "Focus Flow",
    artist: "Productivity Sounds",
    album: "Work Vibes",
    duration: "6:45",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Ambient",
    mood: "Focused",
    year: 2023,
    popularity: 81,
  },
  {
    id: 9,
    title: "Romantic Sunset",
    artist: "Love Ballads",
    album: "Heart Strings",
    duration: "4:56",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "R&B",
    mood: "Romantic",
    year: 2024,
    popularity: 88,
  },
  {
    id: 10,
    title: "Morning Energy",
    artist: "Wake Up Crew",
    album: "Rise & Shine",
    duration: "3:34",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Pop",
    mood: "Energetic",
    year: 2024,
    popularity: 91,
  },
  {
    id: 11,
    title: "Deep Thoughts",
    artist: "Introspective",
    album: "Mind Wandering",
    duration: "5:12",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Alternative",
    mood: "Contemplative",
    year: 2023,
    popularity: 76,
  },
  {
    id: 12,
    title: "Party Anthem",
    artist: "Club Masters",
    album: "Dance Floor",
    duration: "3:21",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "EDM",
    mood: "Energetic",
    year: 2024,
    popularity: 96,
  },
  {
    id: 13,
    title: "Peaceful Mind",
    artist: "Meditation Sounds",
    album: "Inner Peace",
    duration: "7:18",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "New Age",
    mood: "Peaceful",
    year: 2023,
    popularity: 69,
  },
  {
    id: 14,
    title: "Retro Funk",
    artist: "Groove Machine",
    album: "Back to the 80s",
    duration: "4:07",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Funk",
    mood: "Groovy",
    year: 2024,
    popularity: 84,
  },
  {
    id: 15,
    title: "Stormy Weather",
    artist: "Thunder & Rain",
    album: "Natural Sounds",
    duration: "8:45",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Ambient",
    mood: "Dramatic",
    year: 2023,
    popularity: 72,
  },
]

export const getTracksByMood = (mood: string): Track[] => {
  return dummyTracks.filter((track) => track.mood.toLowerCase() === mood.toLowerCase())
}

export const getTracksByGenre = (genre: string): Track[] => {
  return dummyTracks.filter((track) => track.genre.toLowerCase() === genre.toLowerCase())
}

export const searchTracks = (query: string): Track[] => {
  const lowercaseQuery = query.toLowerCase()
  return dummyTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.artist.toLowerCase().includes(lowercaseQuery) ||
      track.album.toLowerCase().includes(lowercaseQuery) ||
      track.genre.toLowerCase().includes(lowercaseQuery),
  )
}
