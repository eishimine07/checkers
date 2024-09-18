<script setup lang="ts">
import { computed } from 'vue'
import IconCrown from '@/components/icons/IconCrown.vue'
import Player from '@/models/Player'

type GamePieceProps = {
  king?: boolean
  player: Player
  selected?: boolean
  col: number
  row: number
}

const props = defineProps<GamePieceProps>()

const type = computed(() => props.player === Player.DARK ? 'dark' : 'light')
</script>

<template>
  <div :class="['wrapper', selected && 'selected']">
    <div :class="['game-piece', type]">
      <IconCrown v-if="props.king" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  opacity: 0.6;
  padding: 8px;
  width: 100%;

  &.selected {
    opacity: 1;
  }
}

.game-piece {
  border-radius: 9999px;
  height: 100%;
  padding: 6px;
  width: 100%;

  &.dark {
    background-color: var(--c-piece-dark-1);
    box-shadow: 3px 4px var(--c-piece-dark-2);
  }

  &.light {
    background-color: var(--c-piece-light-1);
    box-shadow: 3px 4px var(--c-piece-light-2);
  }
}
</style>