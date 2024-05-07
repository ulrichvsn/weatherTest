import type { ForecastApiResponse } from '@/types/weather'

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<ForecastApiResponse> {
  const apiKey = '65212b3d0f894936542704a703a7b0f3'
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching weather')
  }
  const data = await response.json()
  return data
}
