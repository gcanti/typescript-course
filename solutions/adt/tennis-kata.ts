export type Player = 'A' | 'B'

export type Score = 'Love' | 'Fifteen' | 'Thirty'

export type Game =
  | {
      type: 'WarmUp'
      A: Score
      B: Score
    }
  | {
      type: 'Forty'
      player: Player
      other: Score
    }
  | { type: 'Deuce' }
  | {
      type: 'Advantage'
      player: Player
    }
  | {
      type: 'Winner'
      player: Player
    }
