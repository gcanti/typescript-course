/*

  Esercizio: tipizzare la funzione `compose`

*/

declare function compose(...f: Array<never>): never

// tests

import { AssertEquals } from '../equals'

declare function len(s: string): number
declare function double(n: number): number
declare function gt2(n: number): boolean

const s1 = compose(double, len)
type S1 = AssertEquals<typeof s1, (s: string) => number, 'T'>
const s2 = compose(gt2, double, len)
type S2 = AssertEquals<typeof s2, (s: string) => boolean, 'T'>
