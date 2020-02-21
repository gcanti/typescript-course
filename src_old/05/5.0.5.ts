/*

  Esercizio: Tennis Kata, modellare il punteggio di un game

*/

export type Player = 'A' | 'B'

export type Score = 'Love' | 'Fifteen' | 'Thirty' | 'Forty'

export type Game = never

export declare function score(player: Player, game: Game): Game
