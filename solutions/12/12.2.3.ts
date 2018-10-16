/*

  Esercizio: definire delle funzioni di conversione tra `number` e il raffinamento `Positive`

*/

import { Option, some, none } from 'fp-ts/lib/Option'
import { Positive } from './12.2.1'

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
