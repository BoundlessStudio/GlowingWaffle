<script setup lang="ts">
import { useUserStore } from './stores/user'
import NavBar from './components/NavBar.vue'
const userStore = useUserStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
    <div v-if="userStore.isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-lg font-semibold text-gray-700 dark:text-zinc-200">Loading...</div>
    </div>
    <div v-else class="min-h-screen">
      <NavBar />
      <div class="pt-16">
        <Transition 
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition duration-100 delay-100"
          leave-active-class="transition duration-100"
        >
          <router-view />
        </Transition>
      </div>
    </div>
  </div>
</template>