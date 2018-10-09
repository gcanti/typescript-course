/*

  Esercizio: tipizzare la funzione `omit`

*/

export declare function omit<O extends object, KS extends Array<keyof O>>(
  o: O,
  keys: KS
): Pick<O, Exclude<keyof O, KS[number]>>

// tests

import { AssertEquals } from '../equals'

declare const x: { a: string; b: number; c: boolean }

// $ExpectError .
omit(x, 1)
// $ExpectError .
omit(x, ['a', 'unknown'])
const s1 = omit(x, ['a', 'b'])
type S1 = AssertEquals<typeof s1, { c: boolean }, 'T'>
