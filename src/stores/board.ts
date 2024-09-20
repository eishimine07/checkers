import { ref, readonly, computed } from 'vue'
import { defineStore } from 'pinia'
import Player from '@/models/Player'
import type Piece from '@/models/piece/Piece'
import { BOARD_SIZE, type Board } from '@/models/Board'
import getInitialGameState from '@/services/game/getInitialGameState'
import type { Position } from '@/models/Position'
import KingPiece from '@/models/piece/KingPiece'
import { useScoreStore } from '@/stores/score'

export const useBoardStore = defineStore('board', () => {
  const scoreStore = useScoreStore()
  const state = ref<Board>([])
  const currentPlayer = ref<Player>(Player.DARK)
  const selectedPiece = ref<Piece | null>(null)
  const validMovementOptions = computed(
    () => selectedPiece.value?.validMovementOptions(state.value) ?? []
  )

  function reset(): void {
    state.value = getInitialGameState()
    currentPlayer.value = Player.DARK
    selectedPiece.value = null
    scoreStore.reset()
  }

  function handleEmptySquareClick(position: Position): void {
    if (scoreStore.winner !== null || !selectedPiece.value) return

    const validMove = validMovementOptions.value.find(
      (move) => move.position.col === position.col && move.position.row === position.row
    )

    if (!validMove) return

    moveSelectedPiece(validMove.position)
    removeJumpedPieces(validMove.captured)
    turnEnd()
  }

  function handlePieceClick(piece: Piece): void {
    if (scoreStore.winner !== null || currentPlayer.value !== piece.player) return

    selectedPiece.value = piece
  }

  function moveSelectedPiece(toPosition: Position): void {
    if (!selectedPiece.value) return

    const piece = selectedPiece.value

    state.value[piece.position.row][piece.position.col] = null

    piece.position = toPosition
    state.value[toPosition.row][toPosition.col] = piece

    promoteToKing(piece.position, piece.player)
  }

  function removeJumpedPieces(jumped: Position[]): void {
    jumped.forEach((position) => {
      if (state.value[position.row][position.col]?.player === Player.DARK) {
        scoreStore.incrementLight()
      } else if (state.value[position.row][position.col]?.player === Player.LIGHT) {
        scoreStore.incrementDark()
      }

      state.value[position.row][position.col] = null
    })
  }

  function turnEnd(): void {
    selectedPiece.value = null

    if (scoreStore.winner) return

    currentPlayer.value = currentPlayer.value === Player.DARK ? Player.LIGHT : Player.DARK
  }

  function promoteToKing(position: Position, player: Player): void {
    if (
      (player === Player.DARK && position.row === BOARD_SIZE - 1) ||
      (player === Player.LIGHT && position.row === 0)
    ) {
      state.value[position.row][position.col] = new KingPiece(player, position)
    }
  }

  return {
    currentPlayer: readonly(currentPlayer),
    handleEmptySquareClick,
    handlePieceClick,
    validMovementOptions,
    reset,
    selectedPiece: readonly(selectedPiece),
    state: readonly(state)
  }
})
