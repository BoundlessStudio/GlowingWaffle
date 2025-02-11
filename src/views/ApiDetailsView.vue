<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Container from '../components/Container.vue'
import AlertIcon from '../components/icons/AlertIcon.vue'
import ApiIcon from '../components/icons/ApiIcon.vue'
import PlayIcon from '../components/icons/PlayIcon.vue'
import KeyIcon from '../components/icons/KeyIcon.vue'
import TicketIcon from '../components/icons/TicketIcon.vue'
import CheckIcon from '../components/icons/CheckIcon.vue'
import RevokeIcon from '../components/icons/RevokeIcon.vue'
import TrashIcon from '../components/icons/TrashIcon.vue'

const route = useRoute()
const router = useRouter()
const apiDetails = ref({
  id: 0,
  name: 'Payment API',
  status: 'active',
  key: '**************************',
  endpoint: 'https://api.example.com/v1/payments',
  ttl: '5m',
  isLeaked: false,
  analytics: {
    tokens: {
      current: 10,
    },
    errorRate: {
      current: 0.5,
      trend: -0.2,
    },
    claims: {
      current: 850,
      max: 1000
    },
    limit: {
      current: 85,
      max: 100
    },
    latency: {
      average: '120ms',
      trend: -5,
      min: '180ms',
      max: '250ms'
    }
  },
  middleware: {
    limit: {
      enabled: false,
      value: 0
    },
    timeout: {
      enabled: false,
      value: 30
    },
    retries: {
      enabled: false,
      value: 3
    },
    throttling: {
      enabled: false,
      value: 100
    },
    logging: {
      enabled: false,
      type: 'inbound'
    },
    claims: {
      enabled: false,
      amount: 1000
    }
  }
})

onMounted(async () => {
  apiDetails.value.id = Number(route.params.id)
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

const goToKeys = () => {
  router.push('/keys')
}
</script>

<template>
  <Container>
    <!-- Security Alert -->
    <div v-if="apiDetails.isLeaked" class="mb-6 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <AlertIcon class="h-5 w-5 text-amber-400" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">Security Alert</h3>
          <div class="mt-2 text-sm text-amber-700 dark:text-amber-300">
            <p>This API key has been detected in a public repository. For security reasons, you should revoke this key immediately and replace it with a new one.</p>
          </div>
          <div class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <button type="button" class="bg-amber-50 dark:bg-amber-900/30 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Command Bar -->
    <div class="bg-white dark:bg-zinc-800 shadow-sm rounded-lg mb-6">
      <div class="px-4 py-3 sm:px-6 flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-zinc-700 text-black dark:text-white rounded flex justify-center items-center mr-3">
            <ApiIcon class="size-6" />
          </div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.name }}</h1>
          <span :class="[
            apiDetails.status === 'active' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
            'ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium'
          ]">
            {{ apiDetails.status.charAt(0).toUpperCase() + apiDetails.status.slice(1) }}
          </span>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="testApi"
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <PlayIcon class="h-4 w-4 mr-2" />
            Test
          </button>
          <button
            @click="goToKeys"
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <KeyIcon class="h-4 w-4 mr-2" />
            Keys
          </button>
          <button
            v-if="apiDetails.middleware.claims.enabled"
            @click="manageClaims"
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <TicketIcon class="h-4 w-4 mr-2" />
            Claim
          </button>
          <button
            @click="saveChanges"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <CheckIcon class="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      <!-- Active Keys -->
      <div class="bg-white dark:bg-zinc-800 shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 dark:text-zinc-400 truncate">Active Keys</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.analytics.tokens.current }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Rate -->
      <div class="bg-white dark:bg-zinc-800 shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 dark:text-zinc-400 truncate">Error Rate</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.analytics.errorRate.current }}%</p>
            </div>
            <div class="ml-4">
              <span :class="[
                apiDetails.analytics.errorRate.trend < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
              ]">
                {{ apiDetails.analytics.errorRate.trend > 0 ? '+' : '' }}{{ apiDetails.analytics.errorRate.trend }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Response Time -->
      <div class="bg-white dark:bg-zinc-800 shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 dark:text-zinc-400 truncate">Response Time</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.analytics.latency.average }}</p>
            </div>
            <div class="ml-4">
              <span :class="[
                apiDetails.analytics.latency.trend < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
              ]">
                {{ apiDetails.analytics.latency.trend > 0 ? '+' : '' }}{{ apiDetails.analytics.latency.trend }}%
              </span>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-between text-xs text-gray-500 dark:text-zinc-400">
              <span>min: {{ apiDetails.analytics.latency.min }}</span>
              <span>max: {{ apiDetails.analytics.latency.max }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Limit -->
      <Transition 
        enter-from-class="opacity-0" 
        leave-to-class="opacity-0" 
        enter-active-class="transition duration-300" 
        leave-active-class="transition duration-300"
      >
        <div v-if="apiDetails.middleware.limit.enabled" class="bg-white dark:bg-zinc-800 shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-500 dark:text-zinc-400 truncate">Limit</p>
                <div class="mt-1 flex items-baseline">
                  <p class="text-3xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.analytics.limit.current }}</p>
                  <p class="ml-2 text-sm text-gray-500 dark:text-zinc-400">/{{ apiDetails.analytics.limit.max }}</p>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                <div 
                  class="bg-purple-600 h-2 rounded-full"
                  :style="{ width: `${(apiDetails.analytics.limit.current / apiDetails.analytics.limit.max) * 100}%` }"
                ></div>
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-zinc-400 text-right">
                {{ Math.round((apiDetails.analytics.limit.current / apiDetails.analytics.limit.max) * 100) }}%
              </p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Claims Rate -->
      <Transition 
        enter-from-class="opacity-0" 
        leave-to-class="opacity-0" 
        enter-active-class="transition duration-300" 
        leave-active-class="transition duration-300"
      >
        <div v-if="apiDetails.middleware.claims.enabled" class="bg-white dark:bg-zinc-800 shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-500 dark:text-zinc-400 truncate">Claims</p>
                <div class="mt-1 flex items-baseline">
                  <p class="text-3xl font-semibold text-gray-900 dark:text-zinc-100">{{ apiDetails.analytics.claims.current }}</p>
                  <p class="ml-2 text-sm text-gray-500 dark:text-zinc-400">/{{ apiDetails.analytics.claims.max }}</p>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                <div 
                  class="bg-purple-600 h-2 rounded-full"
                  :style="{ width: `${(apiDetails.analytics.claims.current / apiDetails.analytics.claims.max) * 100}%` }"
                ></div>
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-zinc-400 text-right">
                {{ Math.round((apiDetails.analytics.claims.current / apiDetails.analytics.claims.max) * 100) }}%
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- API Configuration -->
    <div class="space-y-6">
      <!-- Basic Configuration -->
      <div class="bg-white dark:bg-zinc-800 shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-6">Configuration</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Endpoint</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">The base URL for your API endpoint.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.endpoint"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">API Name</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">A descriptive name for your API.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.name"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">API Key</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">An API Key from the provider.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.key"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Status</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Current operational status of the Gateway.</p>
              </div>
              <div class="w-2/3 pl-4">
                <select
                  v-model="apiDetails.status"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">TTL</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Time-to-live duration for API tokens.</p>
              </div>
              <div class="w-2/3 pl-4">
                <select
                  v-model="apiDetails.ttl"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="5m">5 Minutes</option>
                  <option value="30m">30 Minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="12h">12 hours</option>
                  <option value="24h">24 hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Middleware Configuration -->
      <div class="bg-white dark:bg-zinc-800 shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-6">Middleware</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Limits</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Control the number of requests.</p>
                  <label class="relative inline-flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.limit.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.limit.value"
                  :disabled="!apiDetails.middleware.limit.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                  placeholder="Requests per minute"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Claims</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Enable token claiming functionality.</p>
                  <label class="relative inline-flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.claims.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.claims.amount"
                  :disabled="!apiDetails.middleware.claims.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                  placeholder="Claims amount"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Timeout</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Set request timeout duration.</p>
                  <label class="relative inline-flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.timeout.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.timeout.value"
                  :disabled="!apiDetails.middleware.timeout.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                  placeholder="Timeout in seconds"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Retries</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Configure automatic retry attempts.</p>
                  <label class="relative inline -flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.retries.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.retries.value"
                  :disabled="!apiDetails.middleware.retries.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                  placeholder="Number of retries"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900  dark:text-zinc-100">Throttling</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Control request rate with throttling.</p>
                  <label class="relative inline-flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.throttling.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  v-model="apiDetails.middleware.throttling.value"
                  :disabled="!apiDetails.middleware.throttling.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                  placeholder="Requests per minute"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Logging</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Configure request logging options.</p>
                  <label class="relative inline-flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.logging.enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <select
                  v-model="apiDetails.middleware.logging.type"
                  :disabled="!apiDetails.middleware.logging.enabled"
                  class="block w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-base text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
                >
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white dark:bg-zinc-800 shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-6">Danger Zone</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="flex-none">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Revoke All Tokens</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Immediately invalidate all active API tokens.</p>
              </div>
              <div class="grow"></div>
              <div class="flex-none pl-4">
                <button class="inline-flex items-center justify-center w-64 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                  <RevokeIcon class="h-4 w-4 mr-2" />
                  Revoke Tokens
                </button>
              </div>
            </div>

            <div class="flex">
              <div class="flex-none">
                <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100">Delete API</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">Permanently remove this API and all its configurations.</p>
              </div>
              <div class="grow"></div>
              <div class="flex-none pl-4">
                <button
                  @click="deleteApi"
                  class="inline-flex items-center justify-center w-64 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <TrashIcon class="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>