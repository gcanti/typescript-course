/*

  Esercizio: tipizzare la funzione `remove`

*/

export declare function remove<O, K extends keyof O>(
  k: K,
  o: O
): Pick<O, Exclude<keyof O, K>>

// tests

import { AssertEquals } from '../equals'

declare const x: { a: string; b: number; c: boolean }

// $ExpectError .
const e1 = remove('d', x)
const s1 = remove('a', x)
type S1 = AssertEquals<
  typeof s1,
  { b: number; c: boolean },
  'T'
>
