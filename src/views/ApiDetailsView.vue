<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const apiDetails = ref({
  id: 0,
  name: '',
  status: 'active',
  endpoint: '',
  version: '',
  requests: '',
  upstream: {
    url: 'https://api.example.com',
    timeout: 30,
    retries: 3
  },
  server: {
    port: 8080,
    host: 'localhost',
    cors: true,
    rateLimit: 1000
  }
})

onMounted(async () => {
  // In a real app, this would be an API call
  // For now, we'll simulate fetching the API details
  const id = Number(route.params.id)
  apiDetails.value = {
    id,
    name: 'Payment API',
    status: 'active',
    endpoint: 'https://api.example.com/v1/payments',
    version: '1.0.0',
    requests: '500K/day',
    upstream: {
      url: 'https://api.example.com',
      timeout: 30,
      retries: 3
    },
    server: {
      port: 8080,
      host: 'localhost',
      cors: true,
      rateLimit: 1000
    }
  }
})

const testApi = () => {
  console.log('Testing API...')
}

const manageClaims = () => {
  console.log('Managing claims...')
}

const saveChanges = () => {
  console.log('Saving changes...')
}

const deleteApi = () => {
  console.log('Deleting API...')
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Command Bar -->
      <div class="bg-white shadow-sm rounded-lg mb-6">
        <div class="px-4 py-3 sm:px-6 flex items-center justify-between">
          <div class="flex items-center">
            <h1 class="text-2xl font-semibold text-gray-900">{{ apiDetails.name }}</h1>
            <span :class="[
              apiDetails.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
              'ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium'
            ]">
              {{ apiDetails.status.charAt(0).toUpperCase() + apiDetails.status.slice(1) }}
            </span>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="testApi"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              Test
            </button>
            <button
              @click="manageClaims"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-2v2h12V4H4zm0 4v6h12V8H4z" clip-rule="evenodd" />
              </svg>
              Claims
            </button>
            <button
              @click="saveChanges"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Save Changes
            </button>
            <button
              @click="deleteApi"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- API Details Form -->
      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">API Name</label>
                <input
                  type="text"
                  v-model="apiDetails.name"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="apiDetails.status"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Endpoint</label>
                <input
                  type="text"
                  v-model="apiDetails.endpoint"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Upstream Configuration -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Upstream Configuration</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Upstream URL</label>
                <input
                  type="text"
                  v-model="apiDetails.upstream.url"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Timeout (seconds)</label>
                <input
                  type="number"
                  v-model="apiDetails.upstream.timeout"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Retries</label>
                <input
                  type="number"
                  v-model="apiDetails.upstream.retries"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Server Configuration -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Server Configuration</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Port</label>
                <input
                  type="number"
                  v-model="apiDetails.server.port"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Host</label>
                <input
                  type="text"
                  v-model="apiDetails.server.host"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">Rate Limit (requests/minute)</label>
                <input
                  type="number"
                  v-model="apiDetails.server.rateLimit"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">CORS Enabled</label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      v-model="apiDetails.server.cors"
                      class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span class="ml-2 text-base text-gray-700">Enable CORS</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>