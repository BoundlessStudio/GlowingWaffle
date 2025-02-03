<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Container from '../components/Container.vue'

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
  // const id = Number(route.params.id)
  // apiDetails.value = {
  //   id,
  //   name: 'Payment API',
  //   status: 'active',
  //   key: '**************************',
  //   endpoint: 'https://api.example.com/v1/payments',
  //   ttl: '5m',
  //   isLeaked: false,
  //   analytics: {
  //     tokens: {
  //       current: 100,
  //       trend: -0.2,
  //     },
  //     errorRate: {
  //       current: 0.5,
  //       trend: 1
  //     },
  //     claims: {
  //       current: 850,
  //       max: 1000,
  //     },
  //     limit: {
  //       current: 85,
  //       max: 100,
  //     },
  //     latency: {
  //       average: '120ms',
  //       trend: -5,
  //       min: '180ms',
  //       max: '250ms'
  //     }
  //   },
  //   middleware: {
  //     limit: {
  //       enabled: false,
  //       value: 0
  //     },
  //     timeout: {
  //       enabled: false,
  //       value: 30
  //     },
  //     retries: {
  //       enabled: false,
  //       value: 3
  //     },
  //     throttling: {
  //       enabled: false,
  //       value: 100
  //     },
  //     logging: {
  //       enabled: false,
  //       type: 'inbound'
  //     },
  //     claims: {
  //       enabled: false,
  //       amount: 1000
  //     }
  //   }
  // }
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
    <div v-if="apiDetails.isLeaked" class="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-amber-800">Security Alert</h3>
          <div class="mt-2 text-sm text-amber-700">
            <p>This API key has been detected in a public repository. For security reasons, you should revoke this key immediately and replace it with a new one.</p>
          </div>
          <div class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <button type="button" class="bg-amber-50 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-amber-600">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Test
          </button>
          <button
            @click="goToKeys"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            Keys
          </button>
          <button
            v-if="apiDetails.middleware.claims.enabled"
            @click="manageClaims"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>
            Claim
          </button>
          <button
            @click="saveChanges"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">

      <!-- Active Keys -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">Active Keys</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900">{{ apiDetails.analytics.tokens.current }}</p>
            </div>         
          </div>
        </div>
      </div>

      <!-- Error Rate -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">Error Rate</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900">{{ apiDetails.analytics.errorRate.current }}%</p>
            </div>
            <div class="ml-4">
              <span :class="[
                apiDetails.analytics.errorRate.trend < 0 ? 'text-green-600' : 'text-red-600',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
              ]">
                {{ apiDetails.analytics.errorRate.trend > 0 ? '+' : '' }}{{ apiDetails.analytics.errorRate.trend }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Response Time -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">Response Time</p>
              <p class="mt-1 text-3xl font-semibold text-gray-900">{{ apiDetails.analytics.latency.average }}</p>
            </div>
            <div class="ml-4">
              <span :class="[
                apiDetails.analytics.latency.trend < 0 ? 'text-green-600' : 'text-red-600',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
              ]">
                {{ apiDetails.analytics.latency.trend > 0 ? '+' : '' }}{{ apiDetails.analytics.latency.trend }}%
              </span>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-between text-xs text-gray-500">
              <span>min: {{ apiDetails.analytics.latency.min }}</span>
              <span>max: {{ apiDetails.analytics.latency.max }}</span>
            </div>
          </div>
        </div>
      </div>

       


      <!-- Limit -->
      <div v-if="apiDetails.middleware.limit.enabled" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">Limit</p>
              <div class="mt-1 flex items-baseline">
                <p class="text-3xl font-semibold text-gray-900">{{ apiDetails.analytics.limit.current }}</p>
                <p class="ml-2 text-sm text-gray-500">/{{ apiDetails.analytics.limit.max }}</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(apiDetails.analytics.limit.current / apiDetails.analytics.limit.max) * 100}%` }"
              ></div>
            </div>
            <p class="mt-1 text-xs text-gray-500 text-right">
              {{ Math.round((apiDetails.analytics.limit.current / apiDetails.analytics.limit.max) * 100) }}%
            </p>
          </div>
        </div>
      </div>

      <!-- Claims Rate -->
      <div v-if="apiDetails.middleware.claims.enabled" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">Claims</p>
              <div class="mt-1 flex items-baseline">
                <p class="text-3xl font-semibold text-gray-900">{{ apiDetails.analytics.claims.current }}</p>
                <p class="ml-2 text-sm text-gray-500">/{{ apiDetails.analytics.claims.max }}</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(apiDetails.analytics.claims.current / apiDetails.analytics.claims.max) * 100}%` }"
              ></div>
            </div>
            <p class="mt-1 text-xs text-gray-500 text-right">
              {{ Math.round((apiDetails.analytics.claims.current / apiDetails.analytics.claims.max) * 100) }}%
            </p>
          </div>
        </div>
      </div>

      

    </div>

    <!-- API Configuration -->
    <div class="space-y-6">
      <!-- Basic Configuration -->
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Configuration</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900">Endpoint</h4>
                <p class="mt-1 text-sm text-gray-500">The base URL for your API endpoint.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.endpoint"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900">API Name</h4>
                <p class="mt-1 text-sm text-gray-500">A descriptive name for your API.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.name"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900">API Key</h4>
                <p class="mt-1 text-sm text-gray-500">An API Key from the provider.</p>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="text"
                  v-model="apiDetails.key"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900">Status</h4>
                <p class="mt-1 text-sm text-gray-500">Current operational status of the Gateway.</p>
              </div>
              <div class="w-2/3 pl-4">
                <select
                  v-model="apiDetails.status"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3">
                <h4 class="text-sm font-medium text-gray-900">TTL</h4>
                <p class="mt-1 text-sm text-gray-500">Time-to-live duration for API tokens.</p>
              </div>
              <div class="w-2/3 pl-4">
                <select
                  v-model="apiDetails.ttl"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Middleware</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Limits</h4>
                  <p class="mt-1 text-sm text-gray-500">Control the number of requests.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.limit.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.limit.value"
                  :disabled="!apiDetails.middleware.limit.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Requests per minute"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Claims</h4>
                  <p class="mt-1 text-sm text-gray-500">Enable token claiming functionality.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.claims.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.claims.amount"
                  :disabled="!apiDetails.middleware.claims.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Claims amount"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Timeout</h4>
                  <p class="mt-1 text-sm text-gray-500">Set request timeout duration.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.timeout.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.timeout.value"
                  :disabled="!apiDetails.middleware.timeout.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Timeout in seconds"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Retries</h4>
                  <p class="mt-1 text-sm text-gray-500">Configure automatic retry attempts.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.retries.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.retries.value"
                  :disabled="!apiDetails.middleware.retries.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Number of retries"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Throttling</h4>
                  <p class="mt-1 text-sm text-gray-500">Control request rate with throttling.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.throttling.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4">
                <input
                  type="number"
                  v-model="apiDetails.middleware.throttling.value"
                  :disabled="!apiDetails.middleware.throttling.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Requests per minute"
                />
              </div>
            </div>

            <div class="flex">
              <div class="w-1/3 space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Logging</h4>
                  <p class="mt-1 text-sm text-gray-500">Configure request logging options.</p>
                  <label class="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      v-model="apiDetails.middleware.logging.enabled"
                      class="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm text-gray-600">Enable</span>
                  </label>
                </div>
              </div>
              <div class="w-2/3 pl-4"> <select
                  v-model="apiDetails.middleware.logging.type"
                  :disabled="!apiDetails.middleware.logging.enabled"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
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
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Danger Zone</h3>
          <div class="space-y-6">
            <div class="flex">
              <div class="flex-none">
                <h4 class="text-sm font-medium text-gray-900">Revoke All Tokens</h4>
                <p class="mt-1 text-sm text-gray-500">Immediately invalidate all active API tokens.</p>
              </div>
              <div class="grow"></div>
              <div class="flex-none pl-4">
                <button class="inline-flex items-center justify-center w-64 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                  </svg>
                  Revoke Tokens
                </button>
              </div>
            </div>

            <div class="flex">
              <div class="flex-none">
                <h4 class="text-sm font-medium text-gray-900">Delete API</h4>
                <p class="mt-1 text-sm text-gray-500">Permanently remove this API and all its configurations.</p>
              </div>
              <div class="grow"></div>
              <div class="flex-none pl-4">
                <button
                  @click="deleteApi"
                  class="inline-flex items-center justify-center w-64 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
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