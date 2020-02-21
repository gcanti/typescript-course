/*

  Esercizio: `getName` è una funzione che lavora su un campo specifico (`name`), definire
  una funzione `getter` che, dato il nome di un campo, restituisce il getter corrispondente

*/

declare function getter(k: never): Function

// tests

import { AssertEquals } from '../equals'

const s1 = getter('name')({ name: 'Giulio' })
type S1 = AssertEquals<typeof s1, string, 'T'>
const s2 = getter('age')({ age: 44 })
type S2 = AssertEquals<typeof s2, number, 'T'>
