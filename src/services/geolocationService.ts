import type { LocationResult, Feature } from '@/types/geolocation'

export async function searchLocations(query: string): Promise<LocationResult[]> {
  const url = `http://pelias.smappen.com:4000/v1/search?text=${encodeURIComponent(query)}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response error')
  }
  const data = await response.json()

  return data.features.map((feature: Feature) => ({
    id: feature.properties.id,
    label: feature.properties.label,
    coords: feature.geometry.coordinates
  }))
}
