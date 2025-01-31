<script setup lang="ts">
import { useUserStore } from './stores/user'
import NavBar from './components/NavBar.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="userStore.isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-lg font-semibold text-gray-700">Loading...</div>
    </div>
    <div v-else class="min-h-screen">
      <NavBar />
      <div class="pt-16">
        <router-view />
      </div>
    </div>
  </div>
</template>