import { BOARD_SIZE, type Board } from '@/models/Board'
import type { Direction } from '@/models/Direction'
import type Player from '@/models/Player'
import type { Position } from '@/models/Position'
import type { ValidMovementOption } from '@/models/ValidMovementOption'
import isValidPosition from './isValidPosition'

function getPerpendicularDirections([dx, dy]: Direction): Direction[] {
  return Math.abs(dx + dy) === 2
    ? [
        [-1, 1],
        [1, -1]
      ]
    : [
        [1, 1],
        [-1, -1]
      ]
}

export default function getValidMovementsForKing(
  board: Board,
  position: Position,
  player: Player,
  directions: Direction[],
  captured: Position[] = []
): ValidMovementOption[] {
  const result: ValidMovementOption[] = []
  const { col, row } = position

  for (const [dx, dy] of directions) {
    let newRow = row + dy
    let newCol = col + dx
    let jumped = false
    const newCaptured: Position[] = []

    while (isValidPosition(newRow, newCol)) {
      if (board[newRow] !== undefined && board[newRow][newCol] === null) {
        if (captured.length === 0 || jumped) {
          result.push({
            captured: [...captured, ...newCaptured],
            position: { row: newRow, col: newCol }
          })

          if (jumped) {
            result.push(
              ...getValidMovementsForKing(
                board,
                { row: newRow, col: newCol },
                player,
                getPerpendicularDirections([dx, dy]),
                [...captured, ...newCaptured]
              )
            )
          }
        }
      } else if (board[newRow] !== undefined && board[newRow][newCol]?.player !== player) {
        // Encontra uma peça adversária, verifica se pode saltar
        const jumpRow = newRow + dy
        const jumpCol = newCol + dx

        if (
          board[jumpRow] !== undefined &&
          board[jumpRow][jumpCol] === null
          // !visited.some((pos) => pos.row === jumpRow && pos.col === jumpCol)
        ) {
          jumped = true
          newCaptured.push({ row: newRow, col: newCol })
        } else {
          break
        }
      } else if (board[newRow] !== undefined && board[newRow][newCol]?.player === player) {
        break
      }

      // Continua avançando na diagonal
      newRow += dy
      newCol += dx
    }
  }

  return result
}
