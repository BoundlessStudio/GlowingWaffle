<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEphemeralStore } from '../stores/ephemeral'
import type { NewEphemeralDefinition } from '../types/ephemeral'

const store = useEphemeralStore()

// Form state
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

// Compute TTL in seconds from user-friendly dropdown
const ttlInSeconds = computed(() => {
  const val = ttlConfig.value.value
  switch (ttlConfig.value.unit) {
    case 'minutes':
      return val * 60
    case 'hours':
      return val * 3600
    default:
      return val * 3600
  }
})

// Helper to show “∞” for negative values
function formatValue(value: number): string {
  return value < 0 ? '∞' : value.toString()
}

function handleSubmit() {
  const submission = {
    ...formData.value,
    ttl: ttlInSeconds.value
  }

  store.addDefinition(submission)

  // Reset form
  formData.value = {
    apiKey: '',
    baseUrl: '',
    ttl: 3600,
    limit: -10,
    claims: 0
  }
  ttlConfig.value = { value: 1, unit: 'hours' }
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this definition?')) {
    store.removeDefinition(id)
  }
}
</script>
<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <!-- Page header -->
    <div class="mb-8 px-4">
      <h1 class="text-3xl font-bold text-gray-900 text-center">Ephemeral Definitions</h1>
    </div>

    <!-- 3-column grid for cards -->
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


      <!-- Card #1: New Definition Form -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">New Definition</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- API Key -->
          <div>
            <label for="apiKey" class="block text-sm font-medium text-gray-700">API Key</label>
            <input
              id="apiKey"
              v-model="formData.apiKey"
              type="text"
              required
              class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              placeholder="Enter API Key"
            />
          </div>

          <!-- Base URL -->
          <div>
            <label for="baseUrl" class="block text-sm font-medium text-gray-700">Base URL</label>
            <input
              id="baseUrl"
              v-model="formData.baseUrl"
              type="url"
              required
              class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              placeholder="Enter Base URL"
            />
          </div>

          <!-- TTL -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Time to Live (TTL)</label>
            <div class="mt-2 flex items-center gap-4">
              <select
                v-model="ttlConfig.unit"
                class="block w-28 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
              <input
                v-model.number="ttlConfig.value"
                type="number"
                min="1"
                :max="ttlConfig.unit === 'minutes' ? 1440 : 24"
                class="block w-24 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              />
            </div>
            <p class="mt-2 text-xs text-gray-500">{{ ttlInSeconds }} seconds</p>
          </div>

          <!-- Limit -->
          <div>
            <label for="limit" class="block text-sm font-medium text-gray-700">Usage Limit</label>
            <input
              id="limit"
              type="range"
              v-model.number="formData.limit"
              min="-10"
              max="100"
              step="10"
              class="mt-3 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div class="mt-2 text-xs text-gray-500">{{ formatValue(formData.limit) }}</div>
          </div>

          <!-- Claims -->
          <div>
            <label for="claims" class="block text-sm font-medium text-gray-700">Claims</label>
            <input
              id="claims"
              type="range"
              v-model.number="formData.claims"
              min="-1"
              max="10"
              class="mt-3 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div class="mt-2 text-xs text-gray-500">{{ formatValue(formData.claims) }}</div>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Definition
            </button>
          </div>
        </form>
      </div>

      <!-- Cards for existing definitions -->
      <div
        v-for="def in store.definitions"
        :key="def.id"
        class="bg-white rounded-xl shadow-lg p-8"
      >
        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-800">
            API Key: {{ def.apiKey }}
          </h3>
        </div>
        <p class="text-sm text-gray-700 mb-2">
          <span class="font-medium">Base URL:</span> {{ def.baseUrl }}
        </p>
        <p class="text-sm text-gray-700 mb-2">
          <span class="font-medium">TTL:</span> {{ def.ttl }}s
        </p>
        <p class="text-sm text-gray-700 mb-2">
          <span class="font-medium">Limit:</span> {{ formatValue(def.limit) }}
        </p>
        <p class="text-sm text-gray-700 mb-4">
          <span class="font-medium">Claims:</span> {{ formatValue(def.claims) }}
        </p>
        <button
          @click="handleDelete(def.id)"
          class="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>

      <!-- Optional "no definitions" text if the store is empty -->
      <div
        v-if="!store.definitions.length"
        class="col-span-full text-center text-gray-500 text-sm p-4"
      >
        No definitions added yet.
      </div>
    </div>
  </div>
</template>
