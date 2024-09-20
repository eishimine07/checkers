import type { Board } from '@/models/Board'
import type { Position } from '@/models/Position'
import Piece from '@/models/piece/Piece'
import Player from '@/models/Player'
import type { Direction } from '@/models/Direction'
import getValidMovementsForKing from '@/services/game/getValidMovementsForKing'
import type { ValidMovementOption } from '@/models/ValidMovementOption'

export default class KingPiece extends Piece {
  constructor(player: Player, initPosition: Position) {
    super(player, initPosition, true)
  }

  getDirections(): Direction[] {
    return [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]
    ]
  }

  validMovementOptions(board: Board): ValidMovementOption[] {
    return getValidMovementsForKing(board, this.position, this.player, this.getDirections())
  }
}
