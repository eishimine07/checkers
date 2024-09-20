import Player from '@/models/Player'
import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

const MAX_SCORE = 12

export const useScoreStore = defineStore('score', () => {
  const dark = ref(0)
  const light = ref(0)
  const winner = computed<Player | null>(() => {
    if (dark.value === MAX_SCORE) return Player.DARK

    if (light.value === MAX_SCORE) return Player.LIGHT

    return null
  })

  function incrementDark(): void {
    dark.value += 1
  }

  function incrementLight(): void {
    light.value += 1
  }

  function reset(): void {
    dark.value = 0
    light.value = 0
  }

  return {
    dark: readonly(dark),
    incrementDark,
    incrementLight,
    light: readonly(light),
    reset,
    winner
  }
})
