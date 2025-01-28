<script setup lang="ts">
import { useEphemeralStore } from '../stores/ephemeral'
import EphemeralForm from '../components/EphemeralForm.vue'
import EphemeralList from '../components/EphemeralList.vue'
import type { NewEphemeralDefinition } from '../types/ephemeral'

const store = useEphemeralStore()

function handleNewDefinition(definition: NewEphemeralDefinition) {
  store.addDefinition(definition)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-2xl font-semibold text-gray-900 mb-6">Ephemeral Definitions</h1>
      <EphemeralForm @submit="handleNewDefinition" />
      <EphemeralList />
    </div>
  </div>
</template>