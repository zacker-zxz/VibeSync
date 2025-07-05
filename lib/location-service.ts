import { IPAPI_KEY } from "@/src/config/profile"

export interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
}

export async function getUserLocation(): Promise<LocationData | null> {
  try {
    console.log("Starting location detection...")

    // Try browser geolocation first
    const browserLocation = await getBrowserLocation()
    if (browserLocation) {
      console.log("Browser location successful:", browserLocation)
      return browserLocation
    }

    // Fallback to IP-based location
    console.log("Browser location failed, trying IP-based location...")
    const ipLocation = await getIPLocation()
    if (ipLocation) {
      console.log("IP location successful:", ipLocation)
      return ipLocation
    }

    console.warn("All location methods failed")
    return null
  } catch (error) {
    console.error("Error in getUserLocation:", error)
    return null
  }
}

async function getBrowserLocation(): Promise<LocationData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser")
      resolve(null)
      return
    }

    const timeoutId = setTimeout(() => {
      console.warn("Browser geolocation timeout")
      resolve(null)
    }, 10000) // 10 second timeout

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId)
        try {
          const { latitude, longitude } = position.coords
          console.log("Browser coordinates:", latitude, longitude)

          // Reverse geocode to get city and country
          const locationData = await reverseGeocode(latitude, longitude)
          if (locationData) {
            resolve({
              ...locationData,
              latitude,
              longitude,
            })
          } else {
            resolve({
              city: "Unknown City",
              country: "Unknown Country",
              latitude,
              longitude,
            })
          }
        } catch (error) {
          console.error("Error processing browser location:", error)
          resolve(null)
        }
      },
      (error) => {
        clearTimeout(timeoutId)
        console.warn("Browser geolocation error:", error.message)
        resolve(null)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  })
}

async function getIPLocation(): Promise<LocationData | null> {
  const endpoints = [
    // Primary: ipapi.co with API key
    IPAPI_KEY ? `https://ipapi.co/json/?key=${IPAPI_KEY}` : null,
    // Fallback: ipapi.co without API key (limited requests)
    "https://ipapi.co/json/",
    // Additional fallback: ipinfo.io
    "https://ipinfo.io/json",
  ].filter(Boolean) as string[]

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying IP location endpoint: ${endpoint}`)
      const response = await fetch(endpoint, {
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        console.warn(`IP location endpoint failed: ${response.status}`)
        continue
      }

      const data = await response.json()
      console.log("IP location response:", data)

      // Handle different API response formats
      if (endpoint.includes("ipapi.co")) {
        if (data.error) {
          console.warn("ipapi.co error:", data.reason)
          continue
        }

        return {
          city: data.city || "Unknown City",
          country: data.country_name || data.country || "Unknown Country",
          latitude: Number.parseFloat(data.latitude) || 0,
          longitude: Number.parseFloat(data.longitude) || 0,
        }
      } else if (endpoint.includes("ipinfo.io")) {
        if (!data.loc) {
          console.warn("ipinfo.io: no location data")
          continue
        }

        const [lat, lon] = data.loc.split(",")
        return {
          city: data.city || "Unknown City",
          country: data.country || "Unknown Country",
          latitude: Number.parseFloat(lat) || 0,
          longitude: Number.parseFloat(lon) || 0,
        }
      }
    } catch (error) {
      console.error(`Error with IP location endpoint ${endpoint}:`, error)
      continue
    }
  }

  return null
}

async function reverseGeocode(latitude: number, longitude: number): Promise<{ city: string; country: string } | null> {
  try {
    // Using a free reverse geocoding service
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    )

    if (!response.ok) {
      console.warn("Reverse geocoding failed:", response.status)
      return null
    }

    const data = await response.json()
    console.log("Reverse geocoding response:", data)

    return {
      city: data.city || data.locality || "Unknown City",
      country: data.countryName || "Unknown Country",
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error)
    return null
  }
}
