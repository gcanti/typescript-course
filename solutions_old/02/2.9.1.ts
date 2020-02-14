/*

  Esercizio: generalizzare `getName` in modo che lavori con qualsiasi tipo
  che abbia una proprietà `name`, indipendentemente dal suo tipo

*/

declare function getName<T extends { name: any }>(
  t: T
): T['name']

// tests

import { AssertEquals } from '../equals'

const s1 = getName({ name: 'Giulio' })
type S1 = AssertEquals<typeof s1, string, 'T'>
const s2 = getName({ name: ['Giulio', 'Canti'] })
type S2 = AssertEquals<typeof s2, Array<string>, 'T'>
