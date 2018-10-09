/*

  Esercizio: ricavare le chiavi di `X` che hanno valori di tipo `string`

*/

interface X {
  a: string
  b: number
  c: string
}

// tests

import { AssertEquals } from '../equals'

type Keys = { [K in keyof X]: X[K] extends string ? K : never }[keyof X]

type S1 = AssertEquals<Keys, 'a' | 'c', 'T'>
