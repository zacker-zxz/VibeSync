import { WEATHER_API_KEY } from "@/src/config/profile"

export interface WeatherData {
  temp: number
  condition: string
  icon: string
  description: string
}

export async function getWeatherData(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    if (!WEATHER_API_KEY) {
      console.warn("OpenWeatherMap API key not found, using fallback weather data")
      return getFallbackWeather()
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
    )

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("OpenWeatherMap API key is invalid or expired, using fallback weather data")
      } else {
        console.warn(`OpenWeatherMap API request failed with status: ${response.status}`)
      }
      return getFallbackWeather()
    }

    const data = await response.json()

    if (!data || !data.main || !data.weather || !data.weather[0]) {
      console.warn("Invalid weather data received, using fallback")
      return getFallbackWeather()
    }

    const weatherCondition = data.weather[0].main.toLowerCase()
    const description = data.weather[0].description

    return {
      temp: Math.round(data.main.temp),
      condition: getWeatherCondition(weatherCondition),
      icon: getWeatherIcon(weatherCondition, data.weather[0].icon),
      description: description,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return getFallbackWeather()
  }
}

function getWeatherCondition(condition: string): string {
  const conditionMap: { [key: string]: string } = {
    clear: "Clear",
    clouds: "Cloudy",
    rain: "Rainy",
    drizzle: "Drizzle",
    thunderstorm: "Stormy",
    snow: "Snowy",
    mist: "Misty",
    fog: "Foggy",
    haze: "Hazy",
    dust: "Dusty",
    sand: "Sandy",
    ash: "Ashy",
    squall: "Squally",
    tornado: "Tornado",
  }

  return conditionMap[condition] || "Pleasant"
}

function getWeatherIcon(condition: string, iconCode?: string): string {
  // Use OpenWeatherMap icon if available
  if (iconCode) {
    const iconMap: { [key: string]: string } = {
      "01d": "☀️", // clear sky day
      "01n": "🌙", // clear sky night
      "02d": "⛅", // few clouds day
      "02n": "☁️", // few clouds night
      "03d": "☁️", // scattered clouds
      "03n": "☁️",
      "04d": "☁️", // broken clouds
      "04n": "☁️",
      "09d": "🌧️", // shower rain
      "09n": "🌧️",
      "10d": "🌦️", // rain day
      "10n": "🌧️", // rain night
      "11d": "⛈️", // thunderstorm
      "11n": "⛈️",
      "13d": "❄️", // snow
      "13n": "❄️",
      "50d": "🌫️", // mist
      "50n": "🌫️",
    }

    if (iconMap[iconCode]) {
      return iconMap[iconCode]
    }
  }

  // Fallback to condition-based icons
  const conditionIcons: { [key: string]: string } = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧️",
    drizzle: "🌦️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
    fog: "🌫️",
    haze: "🌫️",
  }

  return conditionIcons[condition] || "🌤️"
}

function getFallbackWeather(): WeatherData {
  // Generate realistic fallback weather based on current time
  const hour = new Date().getHours()
  const isNight = hour < 6 || hour > 20

  const fallbackOptions = [
    {
      temp: 22,
      condition: "Pleasant",
      icon: isNight ? "🌙" : "☀️",
      description: "Clear and pleasant",
    },
    {
      temp: 18,
      condition: "Cloudy",
      icon: "☁️",
      description: "Partly cloudy",
    },
    {
      temp: 25,
      condition: "Sunny",
      icon: "☀️",
      description: "Bright and sunny",
    },
    {
      temp: 15,
      condition: "Cool",
      icon: "🌤️",
      description: "Cool and comfortable",
    },
  ]

  // Return a random fallback option for variety
  const randomIndex = Math.floor(Math.random() * fallbackOptions.length)
  return fallbackOptions[randomIndex]
}
