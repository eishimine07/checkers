<script setup lang="ts">
import Piece from '@/models/piece/Piece'
import { useBoardStore } from '@/stores/board'
import { onBeforeMount } from 'vue'
import EmptySquare from '@/components/EmptySquare.vue'
import GamePiece from '@/components/GamePiece.vue'

const boardStore = useBoardStore()

onBeforeMount(() => {
  boardStore.reset()
})
</script>

<template>
  <div class="game-board">
    <template v-for="cols, row in boardStore.state">
      <template v-for="element, col in cols">
        <GamePiece v-if="element instanceof Piece" :key="`${row}-${col}-${element.id}`" :king="element.isKing"
          :col="element.position.col" :row="element.position.row" :player="element.player"
          :selected="boardStore.selectedPiece?.id === element.id"
          @click.prevent="boardStore.handlePieceClick(element)" />

        <EmptySquare v-else :key="`${row}-${col}`"
          :highlight="!!boardStore.previewMovementOptions.find((preview) => preview.col === col && preview.row === row)"
          @click.prevent="boardStore.handleEmptySquareClick({ col, row })" />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.game-board {
  background-image: url('@/assets/board.svg');
  background-size: contain;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 100%;
  position: relative;
  width: 100%;
}
</style>