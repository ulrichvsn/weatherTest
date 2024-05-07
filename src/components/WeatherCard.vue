<template>
  <div class="bg-neutral-800 text-white shadow rounded-lg p-5 my-5">
    <!-- Title & Button -->
    <div class="flex justify-between">
      <h2 class="font-bold text-lg mr-2">{{ formatDay(weather.date) }}</h2>
      <div v-if="!showMoreInfo" class="relative flex flex-col items-center group">
        <button @click="handleClick" class="text-xl hidden md:inline-block">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <div class="absolute bottom-full mb-2 hidden group-hover:block">
          <div class="bg-gray-800 text-white text-xs rounded py-1 px-3 shadow-lg">Plus</div>
        </div>
      </div>

      <div v-else class="relative flex flex-col items-center group">
        <button @click="handleClick" class="text-xl hidden md:inline-block">
          <i class="fa-regular fa-circle-up"></i>
        </button>
        <div class="absolute bottom-full mb-2 hidden group-hover:block">
          <div class="bg-gray-800 text-white text-xs rounded py-1 px-3 shadow-lg">Moins</div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex mt-4 mb-2">
      <div class="flex-1">
        <div class="flex justify-between">
          <template v-for="day in weather.details" :key="day.date">
            <div class="flex-1 text-center">
              <div class="text-md">{{ formatTime(day.time) }}</div>
              <div>
                <img
                  :src="`http://openweathermap.org/img/w/${day.icon}.png`"
                  :alt="day.description"
                  loading="lazy"
                  class="mx-auto"
                  @click="handleClick"
                />
                <div class="font-semibold mt-1.5">{{ Math.round(day.temp) }}&deg;</div>
                <div class="text-xs capitalize">
                  {{ day.description }}
                </div>
              </div>

              <div v-if="showMoreInfo" class="hidden md:inline-block">
                <hr class="h-px mx-8 my-3 bg-gray-200 border-0" />

                <div class="text-xs mb-1 capitalize">
                  <i class="fa-solid fa-temperature-half"></i> T. ressentie:
                  {{ Math.round(day.feelsLike) }}&deg;
                </div>

                <div class="text-xs mb-1">
                  <i class="fa-solid fa-wind"></i> Vent: {{ Math.round(day.windSpeed) }} km/h
                </div>
                <div class="text-xs mb-1">
                  <i class="fa-solid fa-droplet"></i> Humidité: {{ day.humidity }} %
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { formatDay, formatTime } from '@/helpers/dateHelper'
import type { WeatherDetails } from '@/types/weather'

defineProps<{
  weather: WeatherDetails
}>()

const showMoreInfo = ref(false)

const handleClick = () => {
  showMoreInfo.value = !showMoreInfo.value
}
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>
