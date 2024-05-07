// Response API weather
export interface ForecastApiResponse {
  list: Forecast[]
}

export interface Forecast {
  dt_txt: string // date of the forecast
  main: {
    temp: number // temperature
    feels_like: number // feels like temperature
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
}

export interface WeatherDetails {
  date: Date
  details: Details[]
}

interface Details {
  time: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
}
