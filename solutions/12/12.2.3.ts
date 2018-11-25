/*

  Esercizio: definire delle funzioni di conversione tra `number` e il raffinamento `Positive`

*/

import { Option, some, none } from 'fp-ts/lib/Option'

export interface Newtype<M, A> {
  readonly M: M
  readonly A: A
}

interface Positive
  extends Newtype<
      {
        readonly Positive: unique symbol
      },
      number
    > {}

class Prism<S, A> {
  constructor(
    readonly getOption: (s: S) => Option<A>,
    readonly reverseGet: (a: A) => S
  ) {}
}

export const prismPositive = new Prism<number, Positive>(
  s => (s > 0 ? some(s as any) : none),
  a => a as any
)
