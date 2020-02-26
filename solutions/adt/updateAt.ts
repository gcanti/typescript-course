// ------------------------------------------------------
// source
// ------------------------------------------------------

import { Option, none, some } from 'fp-ts/lib/Option'

export function updateAt<A>(i: number, a: A, as: Array<A>): Option<Array<A>> {
  if (i >= 0 && i < as.length) {
    const copy = as.slice()
    copy[i] = a
    return some(copy)
  }
  return none
}
