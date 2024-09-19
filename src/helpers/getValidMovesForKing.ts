import { BOARD_SIZE, type Board } from '@/models/Board'
import type { Direction } from '@/models/Direction'
import type Player from '@/models/Player'
import type { Position } from '@/models/Position'

export default function getValidMovesForKing(
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
    let newRow = row + dx
    let newCol = col + dy

    while (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      if (board[newRow][newCol] === null) {
        // Movimento simples para casas vazias, permitido se ainda não tiver saltado
        if (!hasJumped) {
          moves.push({ row: newRow, col: newCol })
        }
      } else if (board[newRow][newCol]?.player !== player) {
        // Encontra uma peça adversária, verifica se pode saltar
        const jumpRow = newRow + dx
        const jumpCol = newCol + dy

        if (
          board[jumpRow][jumpCol] === null &&
          !visited.some((pos) => pos.row === jumpRow && pos.col === jumpCol)
        ) {
          const newVisited: Position[] = [...visited, { row, col }]
          const newPosition: Position = { row: jumpRow, col: jumpCol }
          moves.push(newPosition)

          // Após o salto, verifica se pode continuar saltando (saltos múltiplos)
          if (!hasJumped) {
            const additionalMoves = getValidMovesForKing(
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
        // Se uma peça bloquear a passagem, não pode continuar nessa direção
        break
      } else {
        // A própria peça ou outra peça adversária bloqueia o caminho
        break
      }

      // Continua avançando na diagonal
      newRow += dx
      newCol += dy
    }
  }

  return moves
}
