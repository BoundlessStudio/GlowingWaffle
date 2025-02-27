<script setup lang="ts">
import { ref, computed } from 'vue'
import Container from '../components/Container.vue'

const apiKeys = ref([
  {
    id: 1,
    name: 'Production API Key',
    key: 'pk_live_123456789',
    status: 'active',
    created: '2024-02-20',
    lastUsed: '2024-02-25',
    quotaUsed: 75,
    analytics: {
      ttl: {
        remaining: '18h',
        total: '24h'
      },
      limits: {
        current: 750,
        max: 1000,
        period: 'day'
      },
      timeout: {
        average: '120ms',
        max: '500ms'
      },
      throttling: {
        current: 85,
        max: 100,
        period: 'minute'
      }
    }
  },
  {
    id: 2,
    name: 'Testing API Key',
    key: 'pk_test_987654321',
    status: 'active',
    created: '2024-02-15',
    lastUsed: '2024-02-24',
    quotaUsed: 30,
    analytics: {
      ttl: {
        remaining: '8h',
        total: '12h'
      },
      limits: {
        current: 300,
        max: 1000,
        period: 'day'
      },
      timeout: {
        average: '95ms',
        max: '500ms'
      },
      throttling: {
        current: 45,
        max: 100,
        period: 'minute'
      }
    }
  },
  {
    id: 3,
    name: 'Revoked Test Key',
    key: 'pk_test_revoked123',
    status: 'revoked',
    created: '2024-01-15',
    lastUsed: '2024-02-10',
    quotaUsed: 0,
    analytics: {
      ttl: {
        remaining: '0h',
        total: '24h'
      },
      limits: {
        current: 0,
        max: 1000,
        period: 'day'
      },
      timeout: {
        average: '110ms',
        max: '500ms'
      },
      throttling: {
        current: 0,
        max: 100,
        period: 'minute'
      }
    }
  }
])

const selectedStatus = ref('active')
const showCreateModal = ref(false)

const filteredKeys = computed(() => {
  return apiKeys.value.filter(key => key.status === selectedStatus.value)
})

const createNewKey = () => {
  showCreateModal.value = true
}

const revokeKey = (id: number) => {
  const key = apiKeys.value.find(k => k.id === id)
  if (key) {
    key.status = 'revoked'
    key.analytics.ttl.remaining = '0h'
    key.analytics.limits.current = 0
    key.analytics.throttling.current = 0
  }
}
</script>

<template>
  <Container>
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">Tokens</h1>
        <div class="flex items-center space-x-2 ml-4">
          <button
            v-for="status in ['active', 'revoked']"
            :key="status"
            @click="selectedStatus = status"
            :class="[
              selectedStatus === status
                ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300'
                : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300',
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors'
            ]"
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>
      </div>
      <button
        @click="createNewKey"
        class="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Create Token
      </button>
    </div>

    <!-- API Keys List -->
    <div class="mt-8 space-y-6">
      <TransitionGroup
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-300 delay-300"
        leave-active-class="transition duration-300"
      >
      <div v-for="key in filteredKeys" :key="key.id" class="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-zinc-100">{{ key.name }}</h3>
              <code class="mt-1 text-sm text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">{{ key.key }}</code>
            </div>
            <div class="flex items-center">
              <button
                v-if="key.status === 'active'"
                @click="revokeKey(key.id)"
                class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm font-medium"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>

        <!-- Analytics Grid - Only show for active tokens -->
        <div v-if="key.status === 'active'" class="p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- TTL -->
          <div class="bg-gray-50 dark:bg-zinc-900/50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-2">Time-to-Live</h4>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{{ key.analytics.ttl.remaining }}</span>
              <span class="text-sm text-gray-500 dark:text-zinc-400">of {{ key.analytics.ttl.total }}</span>
            </div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(parseInt(key.analytics.ttl.remaining) / parseInt(key.analytics.ttl.total)) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Limits -->
          <div class="bg-gray-50 dark:bg-zinc-900/50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-2">Request Limits</h4>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{{ key.analytics.limits.current }}</span>
              <span class="text-sm text-gray-500 dark:text-zinc-400">of {{ key.analytics.limits.max }}/{{ key.analytics.limits.period }}</span>
            </div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(key.analytics.limits.current / key.analytics.limits.max) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Timeout -->
          <div class="bg-gray-50 dark:bg-zinc-900/50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-2">Response Time</h4>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{{ key.analytics.timeout.average }}</span>
              <span class="text-sm text-gray-500 dark:text-zinc-400">max {{ key.analytics.timeout.max }}</span>
            </div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(parseInt(key.analytics.timeout.average) / parseInt(key.analytics.timeout.max)) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Throttling -->
          <div class="bg-gray-50 dark:bg-zinc-900/50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-2">Throttling</h4>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{{ key.analytics.throttling.current }}</span>
              <span class="text-sm text-gray-500 dark:text-zinc-400">of {{ key.analytics.throttling.max }}/{{ key.analytics.throttling.period }}</span>
            </div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
              <div 
                class="bg-purple-600 h-2 rounded-full"
                :style="{ width: `${(key.analytics.throttling.current / key.analytics.throttling.max) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-700">
          <div class="flex justify-between text-sm text-gray-500 dark:text-zinc-400">
            <span>Created: {{ key.created }}</span>
            <span>Last Used: {{ key.lastUsed }}</span>
          </div>
        </div>
      </div>
      </TransitionGroup>
    </div>
  </Container>
</template>