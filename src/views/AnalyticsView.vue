<script setup lang="ts">
import { ref } from 'vue'

const timeRange = ref('24h')
const metrics = ref([
  { name: 'Total Requests', value: '1.2M', change: '+12%' },
  { name: 'Average Latency', value: '125ms', change: '-5%' },
  { name: 'Error Rate', value: '0.5%', change: '-0.2%' },
  { name: 'Success Rate', value: '99.5%', change: '+0.2%' }
])
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">Analytics</h1>
        <div class="flex space-x-2">
          <button
            v-for="range in ['24h', '7d', '30d', '90d']"
            :key="range"
            @click="timeRange = range"
            :class="[
              timeRange === range
                ? 'bg-purple-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors'
            ]"
          >
            {{ range }}
          </button>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="metric in metrics" :key="metric.name" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-500 truncate">{{ metric.name }}</p>
                <p class="mt-1 text-3xl font-semibold text-gray-900">{{ metric.value }}</p>
              </div>
              <div class="ml-4">
                <span :class="[
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
                ]">
                  {{ metric.change }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Placeholder -->
      <div class="mt-8 bg-white shadow rounded-lg p-6">
        <div class="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <p class="text-gray-500">API Usage Chart would go here</p>
        </div>
      </div>

      <!-- Request Log -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Recent Requests</h2>
        <div class="mt-4 bg-white shadow rounded-lg overflow-hidden">
          <div class="p-4 text-center text-gray-500">
            Request log table would go here
          </div>
        </div>
      </div>
    </div>
  </div>
</template>