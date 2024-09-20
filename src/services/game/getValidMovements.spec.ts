import { describe, it, expect } from 'vitest'
import { BOARD_SIZE, type Board } from '@/models/Board'
import DarkPiece from '@/models/piece/DarkPiece'
import getValidMovements from '@/services/game/getValidMovements'
import type { ValidMovementOption } from '@/models/ValidMovementOption'
import LightPiece from '@/models/piece/LightPiece'

describe('getValidMovements', () => {
  function getEmptyBoard(): Board {
    const board: Board = new Array(BOARD_SIZE)

    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(BOARD_SIZE).fill(null)
    }

    return board
  }

  it('should return valid moves', () => {
    const board = getEmptyBoard()
    const row = 0
    const col = 1
    const position = { row, col }
    const darkPiece = new DarkPiece(position)
    board[row][col] = darkPiece

    const movements = getValidMovements(
      board,
      position,
      darkPiece.player,
      darkPiece.getDirections()
    )
    const expected: ValidMovementOption[] = [
      {
        captured: [],
        position: { row: 1, col: 0 }
      },
      {
        captured: [],
        position: { row: 1, col: 2 }
      }
    ]

    expect(movements).toHaveLength(expected.length)
    expect(movements).toContainEqual(expected[0])
    expect(movements).toContainEqual(expected[1])
  })

  it('should not allow moves when blocked by another piece', () => {
    const board = getEmptyBoard()
    const darkPiece1 = new DarkPiece({ row: 0, col: 1 })
    const darkPiece2 = new DarkPiece({ row: 1, col: 2 })
    board[darkPiece1.position.row][darkPiece1.position.col] = darkPiece1
    board[darkPiece2.position.row][darkPiece2.position.col] = darkPiece2

    const movements = getValidMovements(
      board,
      darkPiece1.position,
      darkPiece1.player,
      darkPiece1.getDirections()
    )
    const expected: ValidMovementOption[] = [
      {
        captured: [],
        position: { row: 1, col: 0 }
      }
    ]

    expect(movements).toStrictEqual(expected)
  })

  it('should return valid moves when a single jump is available', () => {
    const board = getEmptyBoard()
    const darkPiece = new DarkPiece({ row: 0, col: 1 })
    const lightPiece = new LightPiece({ row: 1, col: 2 })
    board[darkPiece.position.row][darkPiece.position.col] = darkPiece
    board[lightPiece.position.row][lightPiece.position.col] = lightPiece

    const movements = getValidMovements(
      board,
      darkPiece.position,
      darkPiece.player,
      darkPiece.getDirections()
    )
    const expected: ValidMovementOption[] = [
      {
        captured: [],
        position: { row: 1, col: 0 }
      },
      {
        captured: [{ row: 1, col: 2 }],
        position: { row: 2, col: 3 }
      }
    ]

    expect(movements).toHaveLength(expected.length)
    expect(movements).toContainEqual(expected[0])
    expect(movements).toContainEqual(expected[1])
  })

  it('should return valid moves when multiple jumps are available', () => {
    const board = getEmptyBoard()
    const darkPiece = new DarkPiece({ row: 0, col: 1 })
    const lightPiece1 = new LightPiece({ row: 1, col: 2 })
    const lightPiece2 = new LightPiece({ row: 3, col: 4 })
    board[darkPiece.position.row][darkPiece.position.col] = darkPiece
    board[lightPiece1.position.row][lightPiece1.position.col] = lightPiece1
    board[lightPiece2.position.row][lightPiece2.position.col] = lightPiece2

    const movements = getValidMovements(
      board,
      darkPiece.position,
      darkPiece.player,
      darkPiece.getDirections()
    )
    const expected: ValidMovementOption[] = [
      {
        captured: [],
        position: { row: 1, col: 0 }
      },
      {
        captured: [{ row: 1, col: 2 }],
        position: { row: 2, col: 3 }
      },
      {
        captured: [
          { row: 1, col: 2 },
          { row: 3, col: 4 }
        ],
        position: { row: 4, col: 5 }
      }
    ]

    expect(movements).toHaveLength(expected.length)
    expect(movements).toContainEqual(expected[0])
    expect(movements).toContainEqual(expected[1])
    expect(movements).toContainEqual(expected[2])
  })
})
