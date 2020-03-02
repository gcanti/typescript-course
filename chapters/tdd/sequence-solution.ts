// chapters/tdd/sequence.ts

export declare function sequence<A>(
  promises: Array<Promise<A>>
): Promise<Array<A>>

// ------------------------------------------------------
// step 1
// ------------------------------------------------------

// simulazione dei type hole
declare function _<A>(): A

export function sequence1<A>(promises: Array<Promise<A>>): Promise<Array<A>> {
  return promises.reduce<Promise<Array<A>>>(_(), _())
}

// ------------------------------------------------------
// step 2
// ------------------------------------------------------

export function sequence2<A>(promises: Array<Promise<A>>): Promise<Array<A>> {
  const init: Promise<A[]> = _()
  const f: (acc: Promise<A[]>, x: Promise<A>) => Promise<A[]> = _()
  return promises.reduce<Promise<Array<A>>>(f, init)
}

// ------------------------------------------------------
// step 3
// ------------------------------------------------------

export function sequence3<A>(promises: Array<Promise<A>>): Promise<Array<A>> {
  const init: Promise<A[]> = Promise.resolve([])
  const f: (acc: Promise<A[]>, x: Promise<A>) => Promise<A[]> = _()
  return promises.reduce<Promise<Array<A>>>(f, init)
}

// ------------------------------------------------------
// step 4
// ------------------------------------------------------

// declare function snoc<A>(as: Array<A>, a: A): Array<A>

// declare function lift<A, B, C>(
//   f: (a: A, b: B) => C
// ): (fa: Promise<A>, fb: Promise<B>) => Promise<C>

export function sequence4<A>(promises: Array<Promise<A>>): Promise<Array<A>> {
  const init: Promise<A[]> = Promise.resolve([])
  const f: (acc: Promise<A[]>, x: Promise<A>) => Promise<A[]> = lift(snoc)
  return promises.reduce<Promise<Array<A>>>(f, init)
}

// ------------------------------------------------------
// step 5
// ------------------------------------------------------

function snoc<A>(as: Array<A>, a: A): Array<A> {
  return as.concat([a])
}

function lift<A, B, C>(
  f: (a: A, b: B) => C
): (fa: Promise<A>, fb: Promise<B>) => Promise<C> {
  return (fa, fb) => fa.then(a => fb.then(b => f(a, b)))
}

export function sequence5<A>(promises: Array<Promise<A>>): Promise<Array<A>> {
  const init: Promise<A[]> = Promise.resolve([])
  const f: (acc: Promise<A[]>, x: Promise<A>) => Promise<A[]> = lift(snoc)
  return promises.reduce<Promise<Array<A>>>(f, init)
}

// ------------------------------------------------------
// tests
// ------------------------------------------------------

import * as assert from 'assert'

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

sequence5(promises).then(x => {
  assert.deepEqual(x, [1, 2, 3])
})
