import type { Board } from '@/models/Board'
import type { Position } from '@/models/Position'
import Piece from '@/models/piece/Piece'
import Player from '@/models/Player'

export default class KingPiece extends Piece {
  constructor(player: Player, initPosition: Position) {
    super(player, initPosition, true)
  }

  previewMoveOptions(board: Board): Position[] {
    throw new Error('Method not implemented.')
  }
}
