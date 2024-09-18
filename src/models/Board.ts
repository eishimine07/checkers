import Piece from '@/models/piece/Piece'

export const BOARD_SIZE = 8

export type Board = (Piece | null)[][]
