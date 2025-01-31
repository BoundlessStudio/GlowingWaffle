<script setup lang="ts">
import { ref } from 'vue'

const apiKeys = ref([
  {
    id: 1,
    name: 'Production API Key',
    key: 'pk_live_123456789',
    status: 'active',
    created: '2024-02-20',
    lastUsed: '2024-02-25',
    quotaUsed: 75
  },
  {
    id: 2,
    name: 'Testing API Key',
    key: 'pk_test_987654321',
    status: 'active',
    created: '2024-02-15',
    lastUsed: '2024-02-24',
    quotaUsed: 30
  }
])

const showCreateModal = ref(false)

const createNewKey = () => {
  showCreateModal.value = true
}

const revokeKey = (id: number) => {
  // Implementation for revoking key
  console.log('Revoking key:', id)
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">API Keys</h1>
        <button
          @click="createNewKey"
          class="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Create Token
        </button>
      </div>

      <!-- API Keys Table -->
      <div class="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quota Used</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="key in apiKeys" :key="key.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ key.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <code class="bg-gray-100 px-2 py-1 rounded">{{ key.key }}</code>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ key.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ key.created }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ key.lastUsed }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-purple-600 h-2.5 rounded-full" :style="{ width: `${key.quotaUsed}%` }"></div>
                </div>
                <span class="text-xs text-gray-500">{{ key.quotaUsed }}%</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="revokeKey(key.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Revoke
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>