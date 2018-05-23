export class Door {}

// tests

import * as assert from 'assert'

const x: Door<'Closed'> = Door.start()
  .ring()
  .open()
  .close()
  .ring()
assert.strictEqual(x.count, 2)
