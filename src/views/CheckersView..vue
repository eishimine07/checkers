<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import ScoreCard from '@/components/ScoreCard.vue'
import Player from '@/models/Player'
import { useBoardStore } from '@/stores/board'
import { useScoreStore } from '@/stores/score'

const scoreStore = useScoreStore()
const boardStore = useBoardStore()

const restart = () => {
  scoreStore.reset()
  boardStore.reset()
}
</script>

<template>
  <header class="header">
    <h1>Checkers (8x8)</h1>
  </header>

  <main class="main">
    <div>
      <div class="game-score-wrapper">
        <ScoreCard :player="Player.DARK" :score="scoreStore.dark" :selected="boardStore.currentPlayer === Player.DARK"
          :winner="scoreStore.winner === Player.DARK" />

        <button class="restart-button" @click="restart">
          Restart
        </button>

        <ScoreCard :player="Player.LIGHT" :score="scoreStore.light"
          :selected="boardStore.currentPlayer === Player.LIGHT" :winner="scoreStore.winner === Player.LIGHT" />
      </div>
    </div>

    <div class="game-board-wrapper">
      <GameBoard />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
}

.main {
  display: flex;
  gap: 1rem;
  text-align: center;
}

.game-score-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: center;
}

.game-board-wrapper {
  height: var(--board-size-2);
  width: var(--board-size-2);
}

.restart-button {
  padding: 16px 0;
}

@media (max-width: 600px) {
  .game-board-wrapper {
    height: var(--board-size-1);
    width: var(--board-size-1);
  }
}
</style>