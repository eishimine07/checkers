import Piece from '@/models/piece/Piece'
import type { Board } from '@/models/Board'
import type { Position } from '@/models/Position'
import Player from '@/models/Player'
import getValidMoves from '@/helpers/getValidMoves'
import type { Direction } from '@/models/Direction'

export default class DarkPiece extends Piece {
  constructor(initPosition: Position) {
    super(Player.DARK, initPosition, false)
  }

  previewMoveOptions(board: Board): Position[] {
    const directions: Direction[] = [
      [1, 1],
      [-1, 1]
    ]

    return getValidMoves(board, this.position, this.player, directions)
  }
}
