/*

  Esercizio: Tennis Kata, modellare il punteggio di un game

*/

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

const warmUp = (A: Score, B: Score): Game => ({
  type: 'WarmUp',
  A,
  B
})

const forty = (player: Player, other: Score): Game => ({
  type: 'Forty',
  player,
  other
})

const deuce: Game = { type: 'Deuce' }

const advantage = (player: Player): Game => ({
  type: 'Advantage',
  player
})

const winner = (player: Player): Game => ({
  type: 'Winner',
  player
})

const succ = (score: 'Love' | 'Fifteen'): Score =>
  score === 'Love' ? 'Fifteen' : 'Thirty'

export function score(player: Player, game: Game): Game {
  switch (game.type) {
    case 'WarmUp':
      const { A, B } = game
      if (player === 'A') {
        if (A === 'Thirty') {
          return forty(player, B)
        } else {
          return warmUp(succ(A), B)
        }
      } else {
        if (B === 'Thirty') {
          return forty(player, A)
        } else {
          return warmUp(succ(B), A)
        }
      }
    case 'Forty':
      if (player === game.player) {
        return winner(player)
      } else if (game.other === 'Thirty') {
        return deuce
      } else {
        return forty(game.player, succ(game.other))
      }
    case 'Deuce':
      return advantage(player)
    case 'Advantage':
      if (player === game.player) {
        return winner(player)
      } else {
        return deuce
      }
    case 'Winner':
      return game
  }
}
