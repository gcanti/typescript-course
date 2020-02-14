/*

  Esercizio: Tipizzare la seguente funzione `all` in modo che preservi le tuple

*/

function tuple<T extends Array<any>>(...t: T): T {
  return t
}

type Awaited<T> = T extends Promise<infer U> ? U : T

export declare function all<T extends Array<Promise<any>>>(
  ps: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>

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
