import type { ForecastApiResponse, WeatherDetails } from '@/types/weather'

export const extractWeatherDetails = (data: ForecastApiResponse): WeatherDetails[] => {
  const weatherByDay: { [key: string]: WeatherDetails['details'] } = {}

  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0] // Take the date without the time

    if (!weatherByDay[date]) {
      weatherByDay[date] = [] // Init the array for this day
    }

    // Create an object with the weather details
    const details = {
      time: entry.dt_txt,
      temp: entry.main.temp,
      feelsLike: entry.main.feels_like,
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
      description: entry.weather[0].description,
      icon: entry.weather[0].icon
    }

    // add the weather details to the array for this day
    weatherByDay[date].push(details)
  })

  // Transform the object into an array of days for easier access
  return Object.keys(weatherByDay).map((date) => ({
    date: new Date(date),
    details: weatherByDay[date]
  }))
}
