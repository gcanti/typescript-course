/*

  Esercizio: Definire una custom type guard che raffina un valore qualsiasi in un `Array<number>`

*/

const isNumber = (x: any): x is number => {
  return typeof x === 'number'
}

const isArrayOfNumbers = (x: any): x is Array<number> => {
  return Array.isArray(x) && x.every(isNumber)
}

// tests

import * as assert from 'assert'

assert.strictEqual(isArrayOfNumbers(1), false)
assert.strictEqual(isArrayOfNumbers([]), true)
assert.strictEqual(isArrayOfNumbers(['a', 'b']), false)
assert.strictEqual(isArrayOfNumbers(['a', 1]), false)
assert.strictEqual(isArrayOfNumbers([1, 2]), true)
