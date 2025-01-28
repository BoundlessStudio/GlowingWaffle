<script setup lang="ts">
import { useEphemeralStore } from '../stores/ephemeral'

const store = useEphemeralStore()

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this definition?')) {
    store.removeDefinition(id)
  }
}
</script>

<template>
  <div class="overflow-x-auto">
    <table v-if="store.definitions.length" class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">API Key</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Base URL</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TTL</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Limit</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Claims</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="def in store.definitions" :key="def.id">
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{{ def.apiKey }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ def.baseUrl }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ def.ttl }}s</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ def.limit }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ def.claims }}</td>
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm">
            <button
              @click="handleDelete(def.id)"
              class="text-red-600 hover:text-red-900 font-medium"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-center text-gray-500 my-8">No definitions added yet.</p>
  </div>
</template>