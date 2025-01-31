<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { name: 'Total APIs', value: '12', change: '+2', changeType: 'increase' },
  { name: 'Active Keys', value: '45', change: '+5', changeType: 'increase' },
  { name: 'Total Requests', value: '1.2M', change: '+12%', changeType: 'increase' },
  { name: 'Error Rate', value: '0.5%', change: '-0.2%', changeType: 'decrease' }
])

const recentActivity = ref([
  { id: 1, type: 'key_created', message: 'New API key created for Project Alpha', time: '2 hours ago' },
  { id: 2, type: 'api_updated', message: 'Updated rate limits for Payment API', time: '5 hours ago' },
  { id: 3, type: 'key_revoked', message: 'API key revoked for Test Environment', time: '1 day ago' }
])
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <!-- Stats Grid -->
      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in stats" :key="item.name" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-500 truncate">{{ item.name }}</p>
                <p class="mt-1 text-3xl font-semibold text-gray-900">{{ item.value }}</p>
              </div>
              <div class="ml-4">
                <span :class="[
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
                ]">
                  {{ item.change }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div class="mt-4 bg-white shadow rounded-lg">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="activity in recentActivity" :key="activity.id" class="p-4">
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <p class="text-sm text-gray-900">{{ activity.message }}</p>
                  <p class="text-sm text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>