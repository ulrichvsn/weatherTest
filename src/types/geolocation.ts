export interface LocationResult {
  id: string
  label: string
  coords: [number, number]
}

export interface Feature {
  properties: {
    id: string
    label: string
  }
  geometry: {
    coordinates: number[]
  }
}
