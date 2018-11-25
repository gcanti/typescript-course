/*

  Esercizio: definire una laternativa a `Object.keys` che non resituisca `Array<string>`.
  Cosa possiamo dire di questa alternativa dal punto di vista della type safety?

*/

export const unsafeKeys = <O>(o: O): Array<keyof O> =>
  Object.keys(o) as any

export const keys = <O>(
  o: O,
  is: (s: string) => s is keyof O & string
): Array<keyof O> => Object.keys(o).filter(is)

// tests

import * as assert from 'assert'

interface Person {
  name: string
  age: number
}

const p: Person = {
  name: 'name',
  age: 0,
  additional: true
} as any

assert.deepEqual(
  keys(
    p,
    (s): s is keyof Person => s === 'name' || s === 'age'
  ).sort(),
  ['age', 'name']
)
