/*

  Esercizio: definire una laternativa a `Object.keys` che non resituisca `Array<string>`.
  Cosa possiamo dire di questa alternativa dal punto di vista della type safety?

*/

export declare function keys<O>(o: O): Array<keyof O>

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

assert.deepEqual(keys(p).sort(), ['age', 'name'])
