// ------------------------------------------------------
// source
// ------------------------------------------------------

const isArray: (u: unknown) => u is Array<unknown> = Array.isArray

export const isArrayOf = <A>(items: (u: unknown) => u is A) => (
  u: unknown
): u is Array<A> => isArray(u) && u.every(items)

// ------------------------------------------------------
// tests
// ------------------------------------------------------

import * as assert from 'assert'

function isNumber(u: unknown): u is number {
  return typeof u === 'number'
}

const isArrayOfNumbers = isArrayOf(isNumber)

assert.strictEqual(isArrayOfNumbers(1), false)
assert.strictEqual(isArrayOfNumbers([]), true)
assert.strictEqual(isArrayOfNumbers(['a', 'b']), false)
assert.strictEqual(isArrayOfNumbers(['a', 1]), false)
assert.strictEqual(isArrayOfNumbers([1, 2]), true)
