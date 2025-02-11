<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Container from '../components/Container.vue'
import ApiIcon from '../components/icons/ApiIcon.vue'

const router = useRouter()
const apis = ref([
  {
    id: 1,
    name: 'Payment API',
    baseUrl: 'api.example.com',
    status: 'active',
    ttl: '24h',
    usage: '1000/day'
  },
  {
    id: 2,
    name: 'User API',
    baseUrl: 'api.example.com',
    status: 'paused',
    ttl: '12h',
    usage: '500/day'
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
  <Container>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">APIs</h1>
      <button
        class="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Register API
      </button>
    </div>

    <!-- APIs Grid -->
    <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="api in apis" :key="api.id" class="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="space-y-4">
            <!-- Header with icon -->
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-zinc-700 text-black dark:text-white rounded flex justify-center items-center">
                <ApiIcon class="size-6" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-zinc-100">{{ api.name }}</h3>
            </div>

            <!-- Card body -->
            <div class="space-y-3">
              <p class="text-sm text-gray-500 dark:text-zinc-400">
                <span class="font-medium">Base URL:</span>
                <code class="ml-2 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded text-xs">{{ api.baseUrl }}</code>
              </p>
              <p class="text-sm text-gray-500 dark:text-zinc-400">
                <span class="font-medium">TTL:</span>
                <span class="ml-2">{{ api.ttl }}</span>
              </p>
              <p class="text-sm text-gray-500 dark:text-zinc-400">
                <span class="font-medium">Usage:</span>
                <span class="ml-2">{{ api.usage }}</span>
              </p>
              <p class="text-sm text-gray-500 dark:text-zinc-400">
                <span class="font-medium">Status:</span>
                <span class="ml-2">
                  <span :class="[
                    api.status === 'active' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
                    'px-2 py-1 text-xs font-semibold rounded-full'
                  ]">
                    {{ api.status }}
                  </span>
                </span>
              </p>
            </div>

            <!-- Card footer -->
            <div class="pt-2">
              <button 
                @click="configureApi(api.id)"
                class="w-full bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/30 px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>