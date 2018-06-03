/*

  Esercizio: estrarre il tipo di una componente di una tupla

*/

type Tuple = [number, string, boolean]

// estrarre la prima componente
type Num = never
// estrarre la seconda componente
type Str = never

// tests

import { AssertEquals } from '../equals'

type S1 = AssertEquals<Num, number, 'T'>
type S2 = AssertEquals<Str, string, 'T'>
