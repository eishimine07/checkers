import Piece from '@/models/piece/Piece'
import type { Position } from '@/models/Position'
import Player from '@/models/Player'
import type { Direction } from '@/models/Direction'

export default class DarkPiece extends Piece {
  constructor(initPosition: Position) {
    super(Player.DARK, initPosition, false)
  }

  getDirections(): Direction[] {
    return [
      [1, 1],
      [-1, 1]
    ]
  }
}
