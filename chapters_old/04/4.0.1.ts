export declare function sequence<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>>

import * as assert from 'assert'

const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]

sequence(promises).then(x => {
  assert.deepEqual(x, [1, 2, 3])
})
