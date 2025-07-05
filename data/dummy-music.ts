export interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
  genre: string
  mood: string
}

export const dummyTracks: Track[] = [
  {
    id: 1,
    title: "Midnight Vibes",
    artist: "Luna Eclipse",
    album: "Nocturnal Dreams",
    duration: "3:42",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Electronic",
    mood: "Chill",
  },
  {
    id: 2,
    title: "Summer Breeze",
    artist: "Ocean Waves",
    album: "Coastal Memories",
    duration: "4:15",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Indie Pop",
    mood: "Happy",
  },
  {
    id: 3,
    title: "Neon Lights",
    artist: "Cyber Dreams",
    album: "Digital Horizon",
    duration: "3:28",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Synthwave",
    mood: "Energetic",
  },
  {
    id: 4,
    title: "Rainy Day Blues",
    artist: "Melancholy Soul",
    album: "Weathered Heart",
    duration: "5:03",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Blues",
    mood: "Melancholy",
  },
  {
    id: 5,
    title: "Dancing Stars",
    artist: "Cosmic Rhythm",
    album: "Galaxy Groove",
    duration: "3:56",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Dance",
    mood: "Energetic",
  },
  {
    id: 6,
    title: "Peaceful Morning",
    artist: "Zen Garden",
    album: "Tranquil Moments",
    duration: "4:22",
    cover: "/placeholder.svg?height=300&width=300",
    genre: "Ambient",
    mood: "Peaceful",
  },
]

export function searchTracks(query: string): Track[] {
  const lowercaseQuery = query.toLowerCase()
  return dummyTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.artist.toLowerCase().includes(lowercaseQuery) ||
      track.album.toLowerCase().includes(lowercaseQuery) ||
      track.genre.toLowerCase().includes(lowercaseQuery) ||
      track.mood.toLowerCase().includes(lowercaseQuery),
  )
}
