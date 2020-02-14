/*

  Esercizio: tipizzare la funzione `pick`

*/

export declare function pick<O, KS extends Array<keyof O>>(
  ks: KS,
  o: O
): Pick<O, KS[number]>

// tests

import { AssertEquals } from '../equals'

declare const x: { a: string; b: number; c: boolean }

// $ExpectError .
pick(1, x)
// $ExpectError .
pick('d', x)
// $ExpectError .
pick(['d'], x)
const s1 = pick(['a'], x)
type S1 = AssertEquals<typeof s1, { a: string }, 'T'>
const s2 = pick(['a', 'b'], x)
type S2 = AssertEquals<
  typeof s2,
  { a: string; b: number },
  'T'
>
