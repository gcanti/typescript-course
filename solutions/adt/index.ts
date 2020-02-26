// ------------------------------------------------------
// source
// ------------------------------------------------------

import { Option, none, some } from 'fp-ts/lib/Option'

export function index<A>(i: number, as: Array<A>): Option<A> {
  return i >= 0 && i < as.length ? some(as[i]) : none
}
