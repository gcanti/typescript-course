/*

  Esercizio: definire la funzione `index` che, dato un array e un indice, restituisce l'elemento a quell'indice (se esiste)

*/

import { Option, some, none } from 'fp-ts/lib/Option'

export const isOutOfBound = <A>(
  i: number,
  as: Array<A>
): boolean => {
  return i < 0 || i >= as.length
}

export const index = <A>(
  i: number,
  as: Array<A>
): Option<A> => {
  return isOutOfBound(i, as) ? none : some(as[i])
}
