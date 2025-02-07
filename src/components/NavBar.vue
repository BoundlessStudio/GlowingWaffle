<script setup lang="ts">
</script>

<template>
  <nav class="bg-white dark:bg-zinc-800 shadow-sm fixed w-full top-0 z-50 transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a href="https://ephemerals.dev/" class="text-2xl font-bold text-purple-900 dark:text-purple-400">Ephemerals</a>
          <div class="hidden md:flex space-x-8 ml-10">
            <router-link 
              to="/"
              class="text-gray-700 dark:text-zinc-300 hover:text-purple-900 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-purple-900 dark:text-purple-400 font-semibold': $route.path === '/' }"
            >
              Dashboard
            </router-link>
            <router-link 
              v-for="link in ['APIs', 'Keys']"
              :key="link"
              :to="'/' + link.toLowerCase()"
              class="text-gray-700 dark:text-zinc-300 hover:text-purple-900 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-purple-900 dark:text-purple-400 font-semibold': $route.path.includes(link.toLowerCase()) }"
            >
              {{ link }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.title {
  font-family: "Neonderthaw", sans-serif;
}
</style>