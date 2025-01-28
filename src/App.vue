<script setup lang="ts">
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div v-if="userStore.isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-lg font-semibold text-gray-700">Loading...</div>
    </div>
    <div v-else class="min-h-screen">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex space-x-8 items-center">
              <router-link 
                to="/" 
                class="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'bg-gray-100': $route.name === 'dashboard' }"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/ephemerals" 
                class="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'bg-gray-100': $route.name === 'ephemerals' }"
              >
                Ephemerals
              </router-link>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view />
      </main>
    </div>
  </div>
</template>