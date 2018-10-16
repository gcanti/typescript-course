/*

  Esercizio: definire una funzione `match` che simuli il pattern matching per `These`

*/

import { These } from './5.0.3'

export const match = <L, A, R>(
  fa: These<L, A>,
  whenThis: (l: L) => R,
  whenThat: (a: A) => R,
  whenBoth: (a: A, l: L) => R
): R => {
  switch (fa.type) {
    case 'This':
      return whenThis(fa.error)
    case 'That':
      return whenThat(fa.success)
    case 'Both':
      return whenBoth(fa.success, fa.error)
  }
}
