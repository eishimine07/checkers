import { ref, readonly, computed } from 'vue'
import { defineStore } from 'pinia'
import Player from '@/models/Player'
import type Piece from '@/models/piece/Piece'
import type { Board } from '@/models/Board'
import getInitialGameState from '@/services/getInitialGameState'
import type { Position } from '@/models/Position'

export const useBoardStore = defineStore('board', () => {
  const state = ref<Board>([])
  const currentPlayer = ref<Player>(Player.DARK)
  const selectedPiece = ref<Piece | null>(null)
  const previewMovementOptions = computed(
    () => selectedPiece.value?.previewMoveOptions(state.value) ?? []
  )

  function reset(): void {
    state.value = getInitialGameState()
    currentPlayer.value = Player.DARK
    selectedPiece.value = null
  }

  function handleEmptySquareClick(position: Position): void {
    if (!selectedPiece.value) return

    if (
      !previewMovementOptions.value.find(
        (preview) => preview.col === position.col && preview.row === position.row
      )
    )
      return

    moveSelectedPiece(position)
  }

  function handlePieceClick(piece: Piece): void {
    if (currentPlayer.value !== piece.player) return

    selectedPiece.value = piece
  }

  function moveSelectedPiece(toPosition: Position): void {
    if (!selectedPiece.value) return

    const piece = selectedPiece.value

    state.value[piece.position.row][piece.position.col] = null

    piece.position = toPosition
    state.value[toPosition.row][toPosition.col] = piece

    selectedPiece.value = null
    currentPlayer.value = currentPlayer.value === Player.DARK ? Player.LIGHT : Player.DARK
  }

  // function isValidMove(startRow, startCol, endRow, endCol, player) {
  //   // Verifica se o destino está vazio e se o movimento é diagonal
  //   if (
  //     board[endRow][endCol] !== null ||
  //     Math.abs(endRow - startRow) !== 1 ||
  //     Math.abs(endCol - startCol) !== 1
  //   ) {
  //     return false
  //   }

  //   // Verifica se a peça está se movendo na direção correta
  //   const piece = board[startRow][startCol]
  //   const direction = player === 'white' ? -1 : 1

  //   return piece.isKing || endRow - startRow === direction
  // }

  // function promoteToKing(row, col) {
  //   const piece = board[row][col]
  //   if (piece.player === 'white' && row === 0) {
  //     piece.isKing = true
  //   } else if (piece.player === 'black' && row === SIZE - 1) {
  //     piece.isKing = true
  //   }
  // }

  return {
    currentPlayer: readonly(currentPlayer),
    handleEmptySquareClick,
    handlePieceClick,
    previewMovementOptions,
    reset,
    selectedPiece: readonly(selectedPiece),
    state: readonly(state)
  }
})
