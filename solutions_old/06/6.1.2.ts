/*

  Esercizio: Definire la funzione `updateAt` che, dato un array, un indice e una funzione, restituisce un nuovo array
  con la funzione applicata all'`i`-esimo suo elemento

*/

import { index } from './6.1.1'
import { Option } from 'fp-ts/lib/Option'

export const copy = <A>(as: Array<A>): Array<A> => {
  return as.slice()
}

const unsafeUpdateAt = <A>(
  i: number,
  a: A,
  as: Array<A>
): Array<A> => {
  const r = copy(as)
  r[i] = a
  return r
}

export const modifyAt = <A>(
  as: Array<A>,
  i: number,
  f: (a: A) => A
): Option<Array<A>> => {
  return index(i, as).map(a => unsafeUpdateAt(i, f(a), as))
}
