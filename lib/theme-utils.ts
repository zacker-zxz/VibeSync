export interface WeatherTheme {
  primary: string
  secondary: string
  accent: string
  gradient: string
  shadow: string
}

export function getWeatherTheme(condition: string, temperature?: number): WeatherTheme {
  const normalizedCondition = condition.toLowerCase()

  // Sunny/Clear weather - warm theme
  if (
    normalizedCondition.includes("sunny") ||
    normalizedCondition.includes("clear") ||
    (temperature && temperature > 25)
  ) {
    return {
      primary: "from-yellow-400 to-orange-500",
      secondary: "from-orange-400 to-red-500",
      accent: "border-yellow-500/30",
      gradient: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
      shadow: "0 0 20px rgba(251, 191, 36, 0.3)",
    }
  }

  // Rainy weather - neutral theme
  if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle") ||
    normalizedCondition.includes("shower")
  ) {
    return {
      primary: "from-blue-400 to-gray-500",
      secondary: "from-gray-400 to-blue-500",
      accent: "border-blue-500/30",
      gradient: "bg-gradient-to-r from-blue-500/20 to-gray-500/20",
      shadow: "0 0 20px rgba(59, 130, 246, 0.3)",
    }
  }

  // Cold/Cloudy weather - cool theme
  if (
    normalizedCondition.includes("cloud") ||
    normalizedCondition.includes("overcast") ||
    normalizedCondition.includes("snow") ||
    normalizedCondition.includes("cold") ||
    (temperature && temperature < 10)
  ) {
    return {
      primary: "from-blue-600 to-purple-600",
      secondary: "from-purple-500 to-indigo-600",
      accent: "border-blue-600/30",
      gradient: "bg-gradient-to-r from-blue-600/20 to-purple-600/20",
      shadow: "0 0 20px rgba(37, 99, 235, 0.3)",
    }
  }

  // Default theme - pleasant weather
  return {
    primary: "from-purple-500 to-pink-500",
    secondary: "from-pink-400 to-purple-600",
    accent: "border-purple-500/30",
    gradient: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    shadow: "0 0 20px rgba(147, 51, 234, 0.3)",
  }
}

export function applyWeatherTheme(theme: WeatherTheme) {
  // Apply CSS custom properties for dynamic theming
  const root = document.documentElement
  root.style.setProperty("--weather-primary", theme.primary)
  root.style.setProperty("--weather-secondary", theme.secondary)
  root.style.setProperty("--weather-accent", theme.accent)
  root.style.setProperty("--weather-gradient", theme.gradient)
  root.style.setProperty("--weather-shadow", theme.shadow)
}
