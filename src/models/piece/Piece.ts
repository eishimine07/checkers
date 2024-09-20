import type { Board } from '@/models/Board'
import type { Position } from '@/models/Position'
import type Player from '@/models/Player'
import generateUID from '@/helpers/generateUID'
import type { Direction } from '@/models/Direction'
import getValidMoves from '@/services/game/getValidMovements'
import type { ValidMovementOption } from '@/models/ValidMovementOption'

export default abstract class Piece {
  public readonly id = generateUID()

  constructor(
    public readonly player: Player,
    public position: Position,
    public readonly isKing: boolean
  ) {}

  protected get col(): number {
    return this.position.col
  }

  protected get row(): number {
    return this.position.row
  }

  abstract getDirections(): Direction[]

  validMovementOptions(board: Board): ValidMovementOption[] {
    return getValidMoves(board, this.position, this.player, this.getDirections())
  }
}
