// ------------------------------------------------------
// source
// ------------------------------------------------------

export function isArrayOfNumbers(_u: unknown): boolean {
  return false
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
