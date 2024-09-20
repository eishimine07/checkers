import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBoardStore } from '@/stores/board'
import { useScoreStore } from '@/stores/score'
import getInitialGameState from '@/services/game/getInitialGameState'
import Player from '@/models/Player'
import type { Position } from '@/models/Position'
import type Piece from '@/models/piece/Piece'
import generateUID from '@/helpers/generateUID'

vi.mock('@/helpers/generateUID')

describe('useBoardStore', () => {
  let boardStore: ReturnType<typeof useBoardStore>
  let scoreStore: ReturnType<typeof useScoreStore>

  beforeAll(() => {
    vi.mocked(generateUID).mockReturnValue(1)
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    boardStore = useBoardStore()
    scoreStore = useScoreStore()
    boardStore.reset()
  })

  it('should initialize with the correct initial state', () => {
    expect(boardStore.state).toEqual(getInitialGameState())
    expect(boardStore.currentPlayer).toBe(Player.DARK)
    expect(boardStore.selectedPiece).toBeNull()
    expect(scoreStore.dark).toBe(0)
    expect(scoreStore.light).toBe(0)
  })

  it('should select a piece on piece click if it belongs to the current player', () => {
    const initialState = getInitialGameState()
    const piece = initialState[2][1]

    boardStore.handlePieceClick(piece as Piece)

    expect(boardStore.selectedPiece).toEqual(piece)
  })

  it('should not select a piece if it belongs to the opposite player', () => {
    const initialState = getInitialGameState()
    const piece = initialState[5][0]

    boardStore.handlePieceClick(piece as Piece)

    expect(boardStore.selectedPiece).toBeNull()
  })

  it('should move a piece to a valid empty square and update state', () => {
    const initialState = getInitialGameState()
    const piece = initialState[2][1] as Piece
    const targetPosition: Position = { row: 3, col: 2 }

    boardStore.handlePieceClick(piece)
    boardStore.handleEmptySquareClick(targetPosition)

    expect(boardStore.state[2][1]).toBeNull()
    expect(boardStore.state[3][2]).toEqual(piece)
    expect(boardStore.currentPlayer).toBe(Player.LIGHT)
  })

  it('should not move a piece to an invalid square', () => {
    const initialState = getInitialGameState()
    const piece = initialState[2][1] as Piece
    const invalidPosition: Position = { row: 5, col: 5 }

    boardStore.handlePieceClick(piece)
    boardStore.handleEmptySquareClick(invalidPosition)

    expect(boardStore.state[2][1]).toEqual(piece)
    expect(boardStore.state[5][5]).toBeNull()
    expect(boardStore.currentPlayer).toBe(Player.DARK)
  })

  it('should reset the board and score correctly', () => {
    boardStore.reset()

    expect(boardStore.state).toEqual(getInitialGameState())
    expect(boardStore.currentPlayer).toBe(Player.DARK)
    expect(scoreStore.dark).toBe(0)
    expect(scoreStore.light).toBe(0)
  })
})
