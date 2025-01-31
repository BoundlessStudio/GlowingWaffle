<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apis = ref([
  {
    id: 1,
    name: 'Payment API',
    endpoint: 'https://api.example.com/v1/payments',
    status: 'active',
    version: '1.0.0',
    requests: '500K/day'
  },
  {
    id: 2,
    name: 'User API',
    endpoint: 'https://api.example.com/v1/users',
    status: 'active',
    version: '2.1.0',
    requests: '250K/day'
  }
])

const showCreateModal = ref(false)

const createNewKey = () => {
  showCreateModal.value = true
}

const configureApi = (id: number) => {
  router.push(`/apis/${id}`)
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">APIs</h1>
        <button
          class="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Register API
        </button>
      </div>

      <!-- APIs Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="api in apis" :key="api.id" class="bg-white shadow rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">{{ api.name }}</h3>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ api.status }}
              </span>
            </div>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-500">
                <span class="font-medium">Endpoint:</span>
                <code class="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">{{ api.endpoint }}</code>
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-medium">Version:</span>
                <span class="ml-2">{{ api.version }}</span>
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-medium">Requests:</span>
                <span class="ml-2">{{ api.requests }}</span>
              </p>
            </div>
            <div class="mt-6 flex space-x-3">
              <button 
                @click="configureApi(api.id)"
                class="flex-1 bg-purple-100 text-purple-900 hover:bg-purple-200 px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>