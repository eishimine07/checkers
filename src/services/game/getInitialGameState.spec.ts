import { describe, it, expect, vi, beforeAll } from 'vitest'
import getInitialGameState from './getInitialGameState'
import generateUID from '@/helpers/generateUID'

vi.mock('@/helpers/generateUID')

describe('getInitialGameState', () => {
  beforeAll(() => {
    vi.mocked(generateUID).mockReturnValue(1)
  })

  it('should return the initial board state', () => {
    const expected =
      '[[null,{"id":1,"player":"Player 1","position":{"row":0,"col":1},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":0,"col":3},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":0,"col":5},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":0,"col":7},"isKing":false}],[{"id":1,"player":"Player 1","position":{"row":1,"col":0},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":1,"col":2},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":1,"col":4},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":1,"col":6},"isKing":false},null],[null,{"id":1,"player":"Player 1","position":{"row":2,"col":1},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":2,"col":3},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":2,"col":5},"isKing":false},null,{"id":1,"player":"Player 1","position":{"row":2,"col":7},"isKing":false}],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[{"id":1,"player":"Player 2","position":{"row":5,"col":0},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":5,"col":2},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":5,"col":4},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":5,"col":6},"isKing":false},null],[null,{"id":1,"player":"Player 2","position":{"row":6,"col":1},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":6,"col":3},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":6,"col":5},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":6,"col":7},"isKing":false}],[{"id":1,"player":"Player 2","position":{"row":7,"col":0},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":7,"col":2},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":7,"col":4},"isKing":false},null,{"id":1,"player":"Player 2","position":{"row":7,"col":6},"isKing":false},null]]'

    expect(JSON.stringify(getInitialGameState())).toBe(expected)
  })
})
