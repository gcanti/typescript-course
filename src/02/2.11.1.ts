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

type Keys = never

type S1 = AssertEquals<Keys, 'a' | 'c', 'T'>
