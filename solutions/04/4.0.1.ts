export declare function sequence<T>(
  promises: Array<Promise<T>>
): Promise<Array<T>>

// step 1

const TODO: any = null

function sequence1<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const f: (acc: Promise<Array<T>>, x: Promise<T>) => Promise<Array<T>> = TODO
  const init: Promise<Array<T>> = TODO
  return promises.reduce(f, init)
}

// step 2

function sequence2<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const f: (acc: Promise<Array<T>>, x: Promise<T>) => Promise<Array<T>> = TODO
  const init: Promise<Array<T>> = Promise.resolve([])
  return promises.reduce(f, init)
}

// step 3

// declare function push<A>(as: Array<A>, a: A): Array<A>

// declare function liftA2<A, B, C>(
//   f: (a: A, b: B) => C
// ): (fa: Promise<A>, fb: Promise<B>) => Promise<C>

function sequence3<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const f = liftA2<Array<T>, T, Array<T>>(push)
  const init: Promise<Array<T>> = Promise.resolve([])
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

function sequence4<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const f = liftA2<Array<T>, T, Array<T>>(push)
  const init: Promise<Array<T>> = Promise.resolve([])
  return promises.reduce(f, init)
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

sequence4(promises).then(x => console.log(x)) // [1, 2, 3]
