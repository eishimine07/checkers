import { BOARD_SIZE, type Board } from '@/models/Board'
import DarkPiece from '@/models/piece/DarkPiece'
import KingPiece from '@/models/piece/KingPiece'
import LightPiece from '@/models/piece/LightPiece'
import Player from '@/models/Player'

export default function getInitialGameState(): Board {
  const board: Board = new Array(BOARD_SIZE)

  // initialize board
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(BOARD_SIZE).fill(null)
  }

  // fill with dark pieces
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = new DarkPiece({ row, col })
      }
    }
  }

  // fill with light pieces
  for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = new LightPiece({ row, col })
      }
    }
  }

  return board
}
