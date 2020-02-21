/*

  Esercizio: aggiungere degli alias a delle proprietà di una classe.

  - aggiungere gli alias `unwrap` e `to` per `get`
  - aggiungere gli alias `wrap` e `from` per `reverseGet`

*/

/**
 * Rappresenta un isomorfismo tra gli insiemi S e A
 */
export class Iso<S, A> {
  constructor(
    readonly get: (s: S) => A,
    readonly reverseGet: (a: A) => S
  ) {}
}

// tests

import * as assert from 'assert'

const meter2Km = new Iso<number, number>(
  s => s / 1000,
  a => a * 1000
)

assert.strictEqual(meter2Km.get(1200), 1.2)
assert.strictEqual(meter2Km.to(1200), 1.2)
assert.strictEqual(meter2Km.unwrap(1200), 1.2)

assert.strictEqual(meter2Km.reverseGet(1.2), 1200)
assert.strictEqual(meter2Km.from(1.2), 1200)
assert.strictEqual(meter2Km.wrap(1.2), 1200)
