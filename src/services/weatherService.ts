import type { ForecastApiResponse } from '@/types/weather'

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<ForecastApiResponse> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching weather')
  }
  const data = await response.json()
  return data
}
