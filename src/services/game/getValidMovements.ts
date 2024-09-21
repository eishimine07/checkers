import type { Board } from '@/models/Board'
import type { Direction } from '@/models/Direction'
import Piece from '@/models/piece/Piece'
import type Player from '@/models/Player'
import type { Position } from '@/models/Position'
import type { ValidMovementOption } from '@/models/ValidMovementOption'

export default function getValidMovements(
  board: Board,
  position: Position,
  player: Player,
  directions: Direction[],
  captured: Position[] = []
): ValidMovementOption[] {
  const result: ValidMovementOption[] = []
  const { col, row } = position

  for (const [dx, dy] of directions) {
    const newRow = row + dy
    const newCol = col + dx

    if (captured.length === 0 && board[newRow][newCol] === null) {
      result.push({
        captured: captured,
        position: { row: newRow, col: newCol }
      })
    } else if (
      board[newRow] !== undefined &&
      board[newRow][newCol] instanceof Piece &&
      board[newRow][newCol].player !== player &&
      board[newRow + dy] !== undefined &&
      board[newRow + dy][newCol + dx] === null
    ) {
      const newJumped: Position[] = [...captured, { row: newRow, col: newCol }]
      const newPosition: Position = { row: newRow + dy, col: newCol + dx }

      result.push({
        captured: newJumped,
        position: newPosition
      })

      result.push(...getValidMovements(board, newPosition, player, directions, newJumped))
    }
  }

  return result
}
