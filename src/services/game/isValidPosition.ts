import { BOARD_SIZE } from '@/models/Board'

export default function isValidPosition(row: number, col: number, boardSize = BOARD_SIZE): boolean {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize
}
