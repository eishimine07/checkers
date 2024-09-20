import type { Position } from '@/models/Position'
import Piece from '@/models/piece/Piece'
import Player from '@/models/Player'
import type { Direction } from '@/models/Direction'

export default class LightPiece extends Piece {
  constructor(initPosition: Position) {
    super(Player.LIGHT, initPosition, false)
  }

  getDirections(): Direction[] {
    return [
      [1, -1],
      [-1, -1]
    ]
  }
}
