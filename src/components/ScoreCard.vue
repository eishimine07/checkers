<script setup lang="ts">
import Player from '@/models/Player'
import { computed } from 'vue'

type ScoreCardProps = {
  player: Player
  score: number
  selected: boolean
  winner: boolean
}

const props = defineProps<ScoreCardProps>()

const type = computed(() => props.player === Player.DARK ? 'dark' : 'light')
</script>

<template>
  <div :class="['score-card', type, selected && 'selected']">
    <h2>{{ player }}</h2>

    <h3>{{ winner ? 'Won' : score }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.score-card {
  border: 2px solid var(--color-border);
  text-align: center;
  padding: 16px;

  &.dark {
    color: var(--c-piece-dark-1);

    &.selected {
      color: var(--color-text);
      background-color: var(--c-piece-dark-2);
    }
  }

  &.light {
    color: var(--c-piece-light-1);

    &.selected {
      color: var(--color-text);
      background-color: var(--c-piece-light-2);
    }
  }
}
</style>