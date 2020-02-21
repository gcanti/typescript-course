/*

  Esercizio: Tipizzare la seguente funzione `all` in modo che preservi le tuple

*/

function tuple<T extends Array<unknown>>(...t: T): T {
  return t
}

export declare function all(
  ps: Array<Promise<unknown>>
): Promise<unknown>

// tests

import { AssertEquals } from '../equals'

const s1 = all(
  tuple(Promise.resolve(1), Promise.resolve('foo'))
)
type S1 = AssertEquals<
  typeof s1,
  Promise<[number, string]>,
  'T'
>
