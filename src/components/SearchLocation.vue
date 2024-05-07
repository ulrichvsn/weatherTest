<template>
  <div class="flex justify-center">
    <div class="relative w-full max-w-md">
      <input
        type="text"
        class="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Recherche une ville ou un code postal"
        v-model="searchLocation.query"
        @input="handleSearch"
      />
      <i
        class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      ></i>

      <!-- Suggestions List -->
      <div class="absolute w-full mt-2">
        <ul class="bg-white shadow-lg rounded" v-if="searchLocation.results">
          <p v-if="!searchLocation.results.length" class="px-4 py-2 text-gray-700">
            Aucun résultat trouvé.
          </p>
          <li
            v-for="location in searchLocation.results"
            :key="location.id"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="handleLocation(location)"
          >
            {{ location.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { searchLocations } from '@/services/geolocationService'
import type { LocationResult } from '@/types/geolocation'

const searchLocation = reactive({
  query: '',
  queryTimeout: undefined as number | undefined,
  results: null as LocationResult[] | null
})
const emit = defineEmits(['location-data'])

const handleSearch = () => {
  clearTimeout(searchLocation.queryTimeout)

  searchLocation.queryTimeout = setTimeout(async () => {
    if (searchLocation.query.length > 2) {
      try {
        searchLocation.results = await searchLocations(searchLocation.query)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        searchLocation.results = null
      }
      return
    }
    searchLocation.results = null
  }, 500)
}

const handleLocation = async (location: LocationResult) => {
  emit('location-data', location)
  searchLocation.results = null
  searchLocation.query = ''
}
</script>
