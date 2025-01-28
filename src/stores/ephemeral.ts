import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EphemeralDefinition, NewEphemeralDefinition } from '../types/ephemeral'

export const useEphemeralStore = defineStore('ephemeral', () => {
  const definitions = ref<EphemeralDefinition[]>([])

  function addDefinition(definition: NewEphemeralDefinition) {
    definitions.value.push({
      id: crypto.randomUUID(),
      ...definition
    })
  }

  function updateDefinition(id: string, definition: Partial<EphemeralDefinition>) {
    const index = definitions.value.findIndex(d => d.id === id)
    if (index !== -1) {
      definitions.value[index] = {
        ...definitions.value[index],
        ...definition
      }
    }
  }

  function removeDefinition(id: string) {
    definitions.value = definitions.value.filter(d => d.id !== id)
  }

  return {
    definitions,
    addDefinition,
    updateDefinition,
    removeDefinition
  }
})