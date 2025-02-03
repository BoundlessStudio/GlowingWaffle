<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Container from '../components/Container.vue'

const route = useRoute()
const router = useRouter()
const apiDetails = ref({
  id: 0,
  name: '',
  key: '',
  status: 'active',
  endpoint: '',
  ttl: '5m',
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
  const id = Number(route.params.id)
  apiDetails.value = {
    id,
    name: 'Payment API',
    status: 'active',
    key: '**************************',
    endpoint: 'https://api.example.com/v1/payments',
    ttl: '5m',
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

const goToKeys = () => {
  router.push('/keys')
}
</script>

<template>
  <Container>
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
              <div class="w-2/3 pl-4">
                <select
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