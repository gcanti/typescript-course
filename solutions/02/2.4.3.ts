/*

  Esercizio: generalizzare la soluzione precedente (2.4.2)

*/

import { isArray } from './2.4.1'

type Refinement<A, B extends A> = (a: A) => a is B

export const createIsArrayOf = <A>(
  refinement: Refinement<unknown, A>
) => (x: unknown): x is Array<A> => {
  return isArray(x) && x.every(refinement)
}
