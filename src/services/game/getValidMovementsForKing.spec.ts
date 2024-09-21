import { describe, it, expect } from 'vitest'
import { BOARD_SIZE, type Board } from '@/models/Board'
import DarkPiece from '@/models/piece/DarkPiece'
import LightPiece from '@/models/piece/LightPiece'
import getValidMovementsForKing from './getValidMovementsForKing'
import KingPiece from '@/models/piece/KingPiece'
import Player from '@/models/Player'

describe('getValidMovementsForKing', () => {
  function getEmptyBoard(): Board {
    const board: Board = new Array(BOARD_SIZE)

    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(BOARD_SIZE).fill(null)
    }

    return board
  }

  it('should return valid moves', () => {
    const board = getEmptyBoard()
    const row = 2
    const col = 3
    const position = { row, col }
    const darkKingPiece = new KingPiece(Player.DARK, position)
    board[row][col] = darkKingPiece

    const movements = getValidMovementsForKing(
      board,
      position,
      darkKingPiece.player,
      darkKingPiece.getDirections()
    )

    expect(movements).toHaveLength(11)
  })

  it('should not allow moves when blocked by another piece', () => {
    const board = getEmptyBoard()
    const darkKingPiece = new KingPiece(Player.DARK, { row: 2, col: 3 })
    const darkPiece = new DarkPiece({ row: 4, col: 5 })
    board[darkKingPiece.position.row][darkKingPiece.position.col] = darkKingPiece
    board[darkPiece.position.row][darkPiece.position.col] = darkPiece

    const movements = getValidMovementsForKing(
      board,
      darkKingPiece.position,
      darkKingPiece.player,
      darkKingPiece.getDirections()
    )

    expect(movements).toHaveLength(8)
  })

  it('should return valid moves when a single jump is available', () => {
    const board = getEmptyBoard()
    const darkKingPiece = new KingPiece(Player.DARK, { row: 2, col: 3 })
    const lightPiece = new LightPiece({ row: 4, col: 5 })
    board[darkKingPiece.position.row][darkKingPiece.position.col] = darkKingPiece
    board[lightPiece.position.row][lightPiece.position.col] = lightPiece

    const movements = getValidMovementsForKing(
      board,
      darkKingPiece.position,
      darkKingPiece.player,
      darkKingPiece.getDirections()
    )

    expect(movements).toHaveLength(10)
  })

  it('should return valid moves when multiple jumps are available', () => {
    const board = getEmptyBoard()
    const darkKingPiece = new KingPiece(Player.DARK, { row: 2, col: 3 })
    const lightPiece1 = new LightPiece({ row: 3, col: 4 })
    const lightPiece2 = new LightPiece({ row: 6, col: 5 })
    board[darkKingPiece.position.row][darkKingPiece.position.col] = darkKingPiece
    board[lightPiece1.position.row][lightPiece1.position.col] = lightPiece1
    board[lightPiece2.position.row][lightPiece2.position.col] = lightPiece2

    const movements = getValidMovementsForKing(
      board,
      darkKingPiece.position,
      darkKingPiece.player,
      darkKingPiece.getDirections()
    )

    expect(movements).toHaveLength(11)
  })
})
