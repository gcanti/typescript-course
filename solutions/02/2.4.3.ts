/*

  Esercizio: generalizzare la soluzione precedente (2.4.2)

*/

import { isArray } from './2.4.1'

type Refinement<A, B extends A> = (a: A) => a is B

export const createIsArrayOf = <A>(
  refinement: Refinement<unknown, A>
): Refinement<unknown, Array<A>> => {
  return (x): x is Array<A> =>
    isArray(x) && x.every(refinement)
}
