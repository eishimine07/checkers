import type { Board } from '@/models/Board'
import type { Direction } from '@/models/Direction'
import Piece from '@/models/piece/Piece'
import type Player from '@/models/Player'
import type { Position } from '@/models/Position'

export default function getValidMoves(
  board: Board,
  position: Position,
  player: Player,
  directions: Direction[],
  visited: Position[] = [],
  hasJumped = false
): Position[] {
  const moves: Position[] = []
  const { col, row } = position

  for (const [dx, dy] of directions) {
    const newRow = row + dy
    const newCol = col + dx
    console.log(newRow, newCol)

    // Verifica se a casa vizinha está livre
    if (!hasJumped && board[newRow][newCol] === null) {
      moves.push({ row: newRow, col: newCol })
    }
    // Verifica se é possível saltar sobre uma peça
    else if (
      board[newRow][newCol] instanceof Piece &&
      board[newRow][newCol].player !== player &&
      board[newRow + dy][newCol + dx] === null &&
      !visited.some((pos) => pos.row === newRow + dy && pos.col === newCol + dx)
    ) {
      const newVisited: Position[] = [...visited, { row, col }]
      const newPosition: Position = { row: newRow + dy, col: newCol + dx }

      moves.push(newPosition)

      // Continuar verificando apenas se ainda não houver saltado
      if (!hasJumped) {
        const additionalMoves = getValidMoves(
          board,
          newPosition,
          player,
          directions,
          newVisited,
          true
        )

        moves.push(...additionalMoves)
      }
    }
  }

  return moves
}
