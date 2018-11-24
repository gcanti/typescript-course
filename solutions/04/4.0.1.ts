export declare function sequence<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>>

// step 1

declare const TODO: any

function sequence1<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>> {
  const f: (
    acc: Promise<Array<A>>,
    x: Promise<A>
  ) => Promise<Array<A>> = TODO
  const init: Promise<Array<A>> = TODO
  return promises.reduce(f, init)
}

// step 2

function sequence2<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>> {
  const f: (
    acc: Promise<Array<A>>,
    x: Promise<A>
  ) => Promise<Array<A>> = TODO
  const init: Promise<Array<A>> = Promise.resolve([])
  return promises.reduce(f, init)
}

// step 3

// declare function push<A>(as: Array<A>, a: A): Array<A>

// declare function liftA2<A, B, C>(
//   f: (a: A, b: B) => C
// ): (fa: Promise<A>, fb: Promise<B>) => Promise<C>

function sequence3<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>> {
  const f = liftA2<Array<A>, A, Array<A>>(push)
  const init: Promise<Array<A>> = Promise.resolve([])
  return promises.reduce(f, init)
}

// step 4

function push<A>(as: Array<A>, a: A): Array<A> {
  return as.concat([a])
}

function liftA2<A, B, C>(
  f: (a: A, b: B) => C
): (fa: Promise<A>, fb: Promise<B>) => Promise<C> {
  return (fa, fb) => fa.then(a => fb.then(b => f(a, b)))
}

import * as assert from 'assert'

const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]

sequence3(promises).then(x => {
  assert.deepEqual(x, [1, 2, 3])
})
