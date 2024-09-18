import type { Board } from '@/models/Board'
import type { Position } from '@/models/Position'
import Piece from '@/models/piece/Piece'
import Player from '@/models/Player'
import type { Direction } from '@/models/Direction'
import getValidMoves from '@/helpers/getValidMoves'

export default class LightPiece extends Piece {
  constructor(initPosition: Position) {
    super(Player.LIGHT, initPosition, false)
  }

  previewMoveOptions(board: Board): Position[] {
    const directions: Direction[] = [
      [1, -1],
      [-1, -1]
    ]

    return getValidMoves(board, this.position, this.player, directions)
  }
}
