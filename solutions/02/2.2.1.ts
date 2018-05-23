/*

  Esercizio: tipizzare la funzione `compose`

*/

declare function compose<A, B, C, D>(
  h: (c: C) => D,
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => D
declare function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C
declare function compose<A>(...f: Array<Function>): Function

// tests

import { AssertEquals } from '../equals'

declare function len(s: string): number
declare function double(n: number): number
declare function gt2(n: number): boolean

const s1 = compose(double, len)
type S1 = AssertEquals<
  typeof s1,
  (s: string) => number,
  'T'
>
const s2 = compose(gt2, double, len)
type S2 = AssertEquals<
  typeof s2,
  (s: string) => boolean,
  'T'
>
