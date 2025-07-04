"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Loader } from "lucide-react"

interface LocationData {
  city: string
  country: string
  lat: number
  lon: number
  region: string
  timezone: string
}

interface LocationMapProps {
  onLocationUpdate?: (location: LocationData) => void
}

export function LocationMap({ onLocationUpdate }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try browser geolocation first
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              // Reverse geocoding to get city/country
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                )
                const data = await response.json()

                const locationData: LocationData = {
                  city: data.city || data.locality || "Unknown City",
                  country: data.countryName || "Unknown Country",
                  lat: latitude,
                  lon: longitude,
                  region: data.principalSubdivision || "",
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }

                setLocation(locationData)
                onLocationUpdate?.(locationData)
                initializeMap(locationData)
              } catch (err) {
                console.error("Reverse geocoding failed:", err)
                // Fallback to IP-based location
                await getLocationByIP()
              }
            },
            async (error) => {
              console.error("Geolocation failed:", error)
              // Fallback to IP-based location
              await getLocationByIP()
            },
          )
        } else {
          // Fallback to IP-based location
          await getLocationByIP()
        }
      } catch (err) {
        console.error("Location detection failed:", err)
        setError("Unable to detect location")
        setLoading(false)
      }
    }

    const getLocationByIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        const locationData: LocationData = {
          city: data.city || "Unknown City",
          country: data.country_name || "Unknown Country",
          lat: data.latitude || 0,
          lon: data.longitude || 0,
          region: data.region || "",
          timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        }

        setLocation(locationData)
        onLocationUpdate?.(locationData)
        initializeMap(locationData)
      } catch (err) {
        console.error("IP location failed:", err)
        setError("Unable to detect location")
        setLoading(false)
      }
    }

    const initializeMap = async (locationData: LocationData) => {
      if (!mapRef.current) return

      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import("leaflet")).default

        // Clear any existing map
        mapRef.current.innerHTML = ""

        // Create map
        const map = L.map(mapRef.current).setView([locationData.lat, locationData.lon], 13)

        // Add tile layer with dark theme
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }).addTo(map)

        // Custom marker icon
        const customIcon = L.divIcon({
          html: `
            <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-2 border-white shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          `,
          className: "custom-marker",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })

        // Add marker
        L.marker([locationData.lat, locationData.lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div class="text-center p-2">
              <h3 class="font-bold text-purple-600">${locationData.city}</h3>
              <p class="text-sm text-gray-600">${locationData.country}</p>
            </div>
          `)

        setLoading(false)
      } catch (err) {
        console.error("Map initialization failed:", err)
        setError("Unable to load map")
        setLoading(false)
      }
    }

    detectLocation()
  }, [onLocationUpdate])

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="w-8 h-8 text-green-400 animate-spin mx-auto mb-4" />
            <p className="text-green-400">Detecting your location...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-red-500/20">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-green-500/20">
      <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        Your Location
      </h3>

      {location && (
        <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">City</p>
              <p className="text-white font-medium">{location.city}</p>
            </div>
            <div>
              <p className="text-gray-400">Country</p>
              <p className="text-white font-medium">{location.country}</p>
            </div>
            <div>
              <p className="text-gray-400">Region</p>
              <p className="text-white font-medium">{location.region || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400">Timezone</p>
              <p className="text-white font-medium">{location.timezone}</p>
            </div>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        className="w-full h-64 rounded-lg overflow-hidden border border-gray-700"
        style={{ minHeight: "256px" }}
      />
    </div>
  )
}
