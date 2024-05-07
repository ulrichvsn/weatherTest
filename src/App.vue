<template>
  <main>
    <!-- Title -->
    <h1 class="text-center text-3xl font-bold pb-4">
      <i class="fa-solid fa-rainbow"></i> Weather App
    </h1>

    <!-- Search -->
    <SearchLocation @location-data="addLocation" />

    <!-- Location -->
    <p v-if="location" class="text-center text-lg font-bold py-3">
      Prévisions meteo pour {{ location.label }}
    </p>

    <!-- Loader Icon -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <i class="fa-regular fa-sun text-4xl animate-spin text-orange-500"></i>
    </div>
    <div v-else v-for="(data, index) in weatherData" :key="index">
      <WeatherCard :weather="data" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchLocation from './components/SearchLocation.vue'
import WeatherCard from './components/WeatherCard.vue'
import type { WeatherDetails } from '@/types/weather'
import type { LocationResult } from '@/types/geolocation'
import { getWeather } from '@/services/weatherService'
import { extractWeatherDetails } from '@/helpers/weatherHelper'

const weatherData = ref<WeatherDetails[]>([])
const location = ref<LocationResult | null>(null)
const loading = ref(false)

const addLocation = async (data: LocationResult) => {
  loading.value = true

  location.value = data
  try {
    const dataWeather = await getWeather(data.coords[1], data.coords[0])
    weatherData.value = extractWeatherDetails(dataWeather)
  } catch (error) {
    console.error('Error fetching weather:', error)
  } finally {
    loading.value = false
  }
}
</script>
