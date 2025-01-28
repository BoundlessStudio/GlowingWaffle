<script setup lang="ts">
import { ref, computed } from 'vue'
import type { NewEphemeralDefinition } from '../types/ephemeral'

const emit = defineEmits<{
  (e: 'submit', definition: NewEphemeralDefinition): void
}>()

const formData = ref<NewEphemeralDefinition>({
  apiKey: '',
  baseUrl: '',
  ttl: 3600,
  limit: -10,
  claims: 0
})

const ttlConfig = ref({
  value: 1,
  unit: 'hours'
})

// Generate arrays for all possible values
const limitOptions = Array.from({ length: 12 }, (_, i) => (i - 1) *10) // -1 to 10
const claimsOptions = Array.from({ length: 12 }, (_, i) => i - 1) // -1 to 10

// Display markers for specific values
const limitMarkers = limitOptions
const claimsMarkers = claimsOptions

// Convert time units to seconds
const ttlInSeconds = computed(() => {
  const value = ttlConfig.value.value
  switch (ttlConfig.value.unit) {
    case 'minutes':
      return value * 60
    case 'hours':
      return value * 3600
    default:
      return value * 3600
  }
})

function formatValue(value: number): string {
  if (value < 0) return '∞'
  return value.toString()
}

function handleSubmit() {
  const submission = {
    ...formData.value,
    ttl: ttlInSeconds.value,
    limit: formData.value.limit,
    claims: formData.value.claims
  }
  
  emit('submit', submission)
  
  // Reset form
  formData.value = {
    apiKey: '',
    baseUrl: '',
    ttl: 3600,
    limit: 100,
    claims: 0
  }
  ttlConfig.value = { value: 1, unit: 'hours' }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 mb-8">
    <div class="grid grid-cols-1 gap-6">
      <!-- Base URL -->
      <div>
        <label for="baseUrl" class="block text-sm font-medium text-gray-700">Base URL</label>
        <input
          id="baseUrl"
          v-model="formData.baseUrl"
          type="url"
          required
          placeholder="Service base URL"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
      </div>

      <!-- API Key -->
      <div>
        <label for="apiKey" class="block text-sm font-medium text-gray-700">API Key</label>
        <input
          id="apiKey"
          v-model="formData.apiKey"
          type="text"
          required
          placeholder="URL key to replace"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
      </div>

      <!-- TTL -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Time to Live (TTL)</label>
          <div class="flex items-center">
            <input
              type="checkbox"
              checked
              disabled
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-not-allowed opacity-60"
            >
            <span class="ml-2 text-sm text-gray-500">Required</span>
          </div>
        </div>
        <div class="grid grid-cols-[auto_1fr] gap-4 items-start">
          <select
            v-model="ttlConfig.unit"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
          <div>
            <input
              v-model.number="ttlConfig.value"
              type="number"
              min="1"
              :max="ttlConfig.unit === 'minutes' ? 1440 : 24"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
            <p class="mt-1 text-sm text-gray-500">
              {{ ttlInSeconds }} seconds
            </p>
          </div>
        </div>
      </div>

      <!-- Usage Limit -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Usage Limit</label>
          <span class="text-sm font-medium text-gray-900">{{ formatValue(formData.limit) }}</span>
        </div>
        <div class="mt-2">
          <div class="flex flex-col gap-2">
            <input
              type="range"
              v-model.number="formData.limit"
              min="-10"
              max="100"
              step="10"
              list="limit-options"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <!--
            <datalist id="limit-options">
              <option v-for="value in limitOptions" :key="value" :value="value"></option>
            </datalist>
            -->
            <div class="flex justify-between px-2 text-xs text-gray-500">
              <span v-for="value in limitMarkers" :key="value">{{ formatValue(value) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Claims -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Claims</label>
          <span class="text-sm font-medium text-gray-900">{{ formatValue(formData.claims) }}</span>
        </div>
        <div class="mt-2">
          <div class="flex flex-col gap-2">
            <input
              type="range"
              v-model.number="formData.claims"
              min="-1"
              max="10"
              list="claims-options"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <!--
            <datalist id="claims-options">
              <option v-for="value in claimsOptions" :key="value" :value="value"></option>
            </datalist>
            -->
            <div class="flex justify-between px-2 text-xs text-gray-500">
              <span v-for="value in claimsMarkers" :key="value">{{ formatValue(value) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Definition
      </button>
    </div>
  </form>
</template>