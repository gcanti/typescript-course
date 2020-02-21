// ------------------------------------------------------
// source
// ------------------------------------------------------

const isArray: (u: unknown) => u is Array<unknown> = Array.isArray

function isNumber(u: unknown): u is number {
  return typeof u === 'number'
}

export function isArrayOfNumbers(u: unknown): boolean {
  return isArray(u) && u.every(isNumber)
}

// ------------------------------------------------------
// tests
// ------------------------------------------------------

import * as assert from 'assert'

assert.strictEqual(isArrayOfNumbers(1), false)
assert.strictEqual(isArrayOfNumbers([]), true)
assert.strictEqual(isArrayOfNumbers(['a', 'b']), false)
assert.strictEqual(isArrayOfNumbers(['a', 1]), false)
assert.strictEqual(isArrayOfNumbers([1, 2]), true)
