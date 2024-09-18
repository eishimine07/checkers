<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
</script>

<template>
  <main class="main">
    <GameBoard />
  </main>
</template>

<style lang="scss" scoped>
.main {
  height: var(--board-size-1);
  width: var(--board-size-1);
}
</style>