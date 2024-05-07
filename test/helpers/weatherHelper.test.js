import { describe, it, expect } from 'vitest'
import { extractWeatherDetails } from '@/helpers/weatherHelper'

const mockData = {
  list: [
    {
      dt_txt: '2023-10-05 06:00:00',
      main: {
        temp: 15,
        feels_like: 14,
        humidity: 80
      },
      wind: {
        speed: 10
      },
      weather: [
        {
          description: 'light rain',
          icon: '10d'
        }
      ]
    },
    {
      dt_txt: '2023-10-05 12:00:00',
      main: {
        temp: 18,
        feels_like: 18,
        humidity: 50
      },
      wind: {
        speed: 5
      },
      weather: [
        {
          description: 'cloudy',
          icon: '04d'
        }
      ]
    },
    {
      dt_txt: '2023-10-06 06:00:00',
      main: {
        temp: 11,
        feels_like: 10,
        humidity: 90
      },
      wind: {
        speed: 15
      },
      weather: [
        {
          description: 'rain',
          icon: '10d'
        }
      ]
    }
  ]
}

describe('extractWeatherDetails', () => {
  it('should extract weather details and organize them by date', () => {
    const result = extractWeatherDetails(mockData)
    expect(result.length).toBe(2) // Checking if we have two days worth of data
    expect(result[0].date).toEqual(new Date('2023-10-05')) // Check the first day
    expect(result[0].details.length).toBe(2) // Check number of time entries for the first day
    expect(result[1].date).toEqual(new Date('2023-10-06')) // Check the second day
    expect(result[1].details.length).toBe(1) // Check number of time entries for the second day
  })

  it('should correctly format each weather detail entry', () => {
    const result = extractWeatherDetails(mockData)
    // Check details of the first entry of the first day
    expect(result[0].details[0]).toEqual({
      time: '2023-10-05 06:00:00',
      temp: 15,
      feelsLike: 14,
      humidity: 80,
      windSpeed: 10,
      description: 'light rain',
      icon: '10d'
    })
  })
})
