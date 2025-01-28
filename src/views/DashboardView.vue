<script setup lang="ts">
import { useEphemeralStore } from '../stores/ephemeral'

const store = useEphemeralStore()
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-blue-50 p-6 rounded-lg">
          <h2 class="text-lg font-medium text-blue-900 mb-2">Total Definitions</h2>
          <p class="text-3xl font-bold text-blue-700">{{ store.definitions.length }}</p>
        </div>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h2 class="text-lg font-medium text-green-900 mb-2">Active Claims</h2>
          <p class="text-3xl font-bold text-green-700">
            {{ store.definitions.reduce((sum, def) => sum + def.claims, 0) }}
          </p>
        </div>
        
        <div class="bg-purple-50 p-6 rounded-lg">
          <h2 class="text-lg font-medium text-purple-900 mb-2">Total Limits</h2>
          <p class="text-3xl font-bold text-purple-700">
            {{ store.definitions.reduce((sum, def) => sum + def.limit, 0) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>