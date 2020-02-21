/*

  Esercizio: tipizzare la funzione `omit`

*/

export declare function omit(o: never, keys: never): never

// tests

import { AssertEquals } from '../equals'

declare const x: { a: string; b: number; c: boolean }

// $ExpectError .
omit(x, 1)
// $ExpectError .
omit(x, ['a', 'unknown'])
const s1 = omit(x, ['a', 'b'])
type S1 = AssertEquals<typeof s1, { c: boolean }, 'T'>
